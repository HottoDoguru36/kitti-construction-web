'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'เกิดข้อผิดพลาด')
      }

      setFormSubmitted(true)
      e.target.reset()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT: Logo + Contact Info */}
          <div className="flex flex-col items-start">
            <img src="/images/logo.png" alt="KTC Logo" className="w-[600px] h-auto mb-4" />
            <div className="space-y-5 text-gray-800 text-lg">
              {/* เบอร์โทร */}
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h1.2a1 1 0 01.97.757l.7 2.8a1 1 0 01-.29.98l-1.2 1.2a16.88 16.88 0 006.6 6.6l1.2-1.2a1 1 0 01.98-.29l2.8.7a1 1 0 01.757.97V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z" />
                </svg>
                <div>
                  <p className="font-semibold">
                    โทร: <a href="tel:0858145434" className="text-blue-700 font-semibold">085-814-5434</a> (คุณสอง)
                  </p>
                  <p className="pl-6">
                    <a href="tel:0641974446" className="text-blue-700 font-semibold">064-197-4446</a> (คุณแม็ค)
                  </p>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a3 3 0 003.22 0L22 8m-10 13a10 10 0 100-20 10 10 0 000 20z" />
                </svg>
                <p>อีเมล: <a href="mailto:ktc@example.com" className="text-blue-700 font-semibold">ktc@example.com</a></p>
              </div>
              {/* ที่อยู่ */}
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414A4 4 0 1116 10a4 4 0 01-1.343 3.657l4.243 4.243a1 1 0 01-1.414 1.414z" />
                </svg>
                <p>2/2 พหลโยธิน 54/1 เเยก 8-4 แขวงคลองถนน เขตสายไหม กรุงเทพฯ 10220</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">ติดต่อเรา</h2>

            {formSubmitted && <p className="text-green-600 font-medium">ส่งข้อความสำเร็จ! ขอบคุณที่ติดต่อเรา</p>}
            {error && <p className="text-red-600 font-medium">{error}</p>}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">ชื่อของคุณ</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="กรอกชื่อของคุณ"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">อีเมล</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-600">เบอร์โทร</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="เบอร์ติดต่อของคุณ"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-600">ข้อความ</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="คุณต้องการสอบถามอะไร..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'กำลังส่ง...' : 'ส่งข้อความ'}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  )
}
