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
          <div className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl ring-1 ring-slate-800">
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Contact details</p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">ข้อมูลติดต่อ</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                ติดต่อทีมงานของเราเพื่อสอบถามเรื่องงานออกแบบ ก่อสร้าง หรือขอใบเสนอราคาได้โดยตรง
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <a href="tel:0858145434" className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 text-slate-950 shadow-lg">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h1.2a1 1 0 01.97.757l.7 2.8a1 1 0 01-.29.98l-1.2 1.2a16.88 16.88 0 006.6 6.6l1.2-1.2a1 1 0 01.98-.29l2.8.7a1 1 0 01.757.97V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">โทรศัพท์</p>
                      <p className="text-lg font-semibold text-white group-hover:text-amber-300">085-814-5434</p>
                      <p className="text-sm text-slate-400">คุณสอง</p>
                    </div>
                  </div>
                </a>

                <a href="mailto:ktc@hotmail.com" className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/10">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a3 3 0 003.22 0L22 8m-10 13a10 10 0 100-20 10 10 0 000 20z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">อีเมล</p>
                      <p className="mt-1 break-words text-sm font-semibold leading-6 text-white group-hover:text-amber-300 sm:text-base">
                        kitticonstruction1624@gmail.com
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400 text-slate-950 shadow-lg">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414A4 4 0 1116 10a4 4 0 01-1.343 3.657l4.243 4.243a1 1 0 01-1.414 1.414z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">ที่อยู่</p>
                    <p className="mt-1 text-sm leading-7 text-slate-200">
                      2/2 พหลโยธิน 54/1 แยก 8-4 แขวงคลองถนน เขตสายไหม กรุงเทพฯ 10220
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-slate-200">
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-6 py-6 sm:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Send message</p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">ส่งข้อความหาเรา</h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                กรอกรายละเอียดโครงการของคุณ แล้วทีมงานจะติดต่อกลับโดยเร็วที่สุด
              </p>
            </div>

            <div className="px-6 py-8 sm:px-8">
              <input
                type="text"
                name="honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <div className="grid gap-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">ชื่อ-นามสกุล</label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">อีเมล</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">เบอร์ติดต่อ</label>
                    <input
                      id="phone"
                      name="phone"
                      required
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">รายละเอียด</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'กำลังส่ง...' : 'ส่งข้อความ'}
                </button>

                {formSubmitted && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                    <p className="text-sm font-medium text-emerald-700">ส่งข้อความสำเร็จ ขอบคุณที่ติดต่อเรา</p>
                  </div>
                )}

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-700">{error}</p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}
