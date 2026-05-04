import nodemailer from 'nodemailer'

const submissionTimes = new Map()
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const MAX_SUBMISSIONS_PER_WINDOW = 3

function getClientKey(req) {
  const forwarded = req.headers['x-forwarded-for']
  const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]
  return ip || req.socket.remoteAddress || 'unknown'
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { name, email, phone, message, honeypot } = req.body

  if (honeypot) {
    return res.status(200).json({ message: 'ส่งอีเมลเรียบร้อย' })
  }

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' })
  }

  if (String(message).trim().length < 10) {
    return res.status(400).json({ message: 'กรุณาระบุรายละเอียดเพิ่มเติม' })
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phonePattern = /^[0-9+\-\s()]{8,20}$/

  if (!emailPattern.test(String(email))) {
    return res.status(400).json({ message: 'รูปแบบอีเมลไม่ถูกต้อง' })
  }

  if (!phonePattern.test(String(phone))) {
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
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER,
    replyTo: email,
    subject: `KTC-Construction ลูกค้าติดต่อจากเว็บไซต์ - ${name}`,
    text: `
ชื่อลูกค้า: ${name}
อีเมลติดต่อกลับ: ${email}
เบอร์ติดต่อกลับ: ${phone}
ข้อความ: ${message}
    `.trim(),
  }

  try {
    await transporter.sendMail(mailOptions)
    return res.status(200).json({ message: 'ส่งอีเมลเรียบร้อย' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการส่งอีเมล' })
  }
}
