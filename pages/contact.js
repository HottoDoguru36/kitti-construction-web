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
      if (!res.ok) throw new Error(data.message || 'เกิดข้อผิดพลาด')

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
      <main className="bg-slate-50 pt-24 text-slate-900">
        <section className="bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Contact us</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">ติดต่อเรา</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              หากคุณกำลังวางแผนสร้างบ้านหรือมองหาผู้รับเหมาที่ดูแลครบวงจร ติดต่อทีมงานของเราเพื่อรับคำปรึกษาเบื้องต้น
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold">ข้อมูลติดต่อ</h2>
            <div className="mt-6 space-y-4 text-slate-700">
              <p>โทรศัพท์: 085-814-5434 (คุณสอง)</p>
              <p>อีเมล: ktc@hotmail.com</p>
              <p>ที่อยู่: 2/2 พหลโยธิน 54/1 แยก 8-4 แขวงคลองถนน เขตสายไหม กรุงเทพฯ 10220</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold">ส่งข้อความหาเรา</h2>
            <input
              type="text"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
            />
            <div className="mt-6 grid gap-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">ชื่อ-นามสกุล</label>
                <input id="name" name="name" required className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">อีเมล</label>
                  <input id="email" type="email" name="email" required className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20" />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">เบอร์ติดต่อ</label>
                  <input id="phone" name="phone" required className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">รายละเอียด</label>
                <textarea id="message" name="message" rows="5" required className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20" />
              </div>
              <button type="submit" disabled={loading} className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? 'กำลังส่ง...' : 'ส่งข้อความ'}
              </button>
              {formSubmitted && <p className="text-sm text-emerald-600">ส่งข้อความสำเร็จ ขอบคุณที่ติดต่อเรา</p>}
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}
