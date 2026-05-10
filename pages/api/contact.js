import nodemailer from 'nodemailer'

const submissionTimes = new Map()
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const MAX_SUBMISSIONS_PER_WINDOW = 3

const MAX_NAME_LEN = 80
const MAX_EMAIL_LEN = 254
const MAX_PHONE_LEN = 40
const MAX_MESSAGE_LEN = 2000
const MIN_MESSAGE_LEN = 10

function getClientKey(req) {
  const forwarded = req.headers['x-forwarded-for']
  const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]
  return ip || req.socket?.remoteAddress || 'unknown'
}

function isRateLimited(key) {
  const now = Date.now()
  const recent = submissionTimes.get(key) || []
  const filtered = recent.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)

  if (filtered.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    submissionTimes.set(key, filtered)
    return true
  }

  filtered.push(now)
  submissionTimes.set(key, filtered)
  return false
}

function coerceString(value) {
  if (typeof value !== 'string') return ''
  return value
}

function sanitizeHeaderValue(value) {
  // Prevent email header injection by removing CR/LF
  return value.replace(/[\r\n]+/g, ' ').trim()
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { name, email, phone, message, honeypot } = req.body || {}

  if (honeypot) {
    return res.status(200).json({ message: 'ส่งอีเมลเรียบร้อย' })
  }

  const nameStr = sanitizeHeaderValue(coerceString(name)).slice(0, MAX_NAME_LEN)
  const emailStr = coerceString(email).trim().slice(0, MAX_EMAIL_LEN)
  const phoneStr = sanitizeHeaderValue(coerceString(phone)).slice(0, MAX_PHONE_LEN)
  const messageStr = coerceString(message).trim().slice(0, MAX_MESSAGE_LEN)

  if (!nameStr || !emailStr || !phoneStr || !messageStr) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' })
  }

  if (messageStr.length < MIN_MESSAGE_LEN) {
    return res.status(400).json({ message: 'กรุณาระบุรายละเอียดเพิ่มเติม' })
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phonePattern = /^[0-9+\-\s()]{8,20}$/

  if (!emailPattern.test(emailStr)) {
    return res.status(400).json({ message: 'รูปแบบอีเมลไม่ถูกต้อง' })
  }

  if (!phonePattern.test(phoneStr)) {
    return res.status(400).json({ message: 'รูปแบบเบอร์ติดต่อไม่ถูกต้อง' })
  }

  const clientKey = getClientKey(req)
  if (isRateLimited(clientKey)) {
    return res.status(429).json({ message: 'ส่งข้อความบ่อยเกินไป กรุณาลองใหม่อีกครั้งในภายหลัง' })
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: `"${nameStr}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER,
    replyTo: emailStr,
    subject: `KTC-Construction ลูกค้าติดต่อจากเว็บไซต์ - ${nameStr}`,
    text: [
      'ชื่อลูกค้า: ' + nameStr,
      'อีเมลติดต่อกลับ: ' + emailStr,
      'เบอร์ติดต่อกลับ: ' + phoneStr,
      'ข้อความ: ' + messageStr,
    ].join('\n'),
  }

  try {
    await transporter.sendMail(mailOptions)
    return res.status(200).json({ message: 'ส่งอีเมลเรียบร้อย' })
  } catch (error) {
    // Avoid leaking internals
    console.error('Failed to send contact email:', error)
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการส่งอีเมล' })
  }
}
