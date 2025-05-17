import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { name, email, phone, message } = req.body
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' })
  }

  // transporter nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER, // Customer Email
    subject: `KTC-Construction ลูกค้าติดต่อจากเว็บไซต์ - ${name}`,
    text: `
      ชื่อลูกค้า: ${name}
      อีเมลติดต่อกลับ: ${email}
      เบอร์ติดต่อกลับ: ${phone}
      ข้อความ: ${message}
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return res.status(200).json({ message: 'ส่งอีเมลเรียบร้อย' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดในการส่งอีเมล' })
  }
}
