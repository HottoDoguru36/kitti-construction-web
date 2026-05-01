import { useEffect, useState } from 'react'
import { CheckCircleIcon, ArrowRightIcon, BuildingOffice2Icon, ShieldCheckIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid'
import Script from 'next/script'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const heroSlides = [
  {
    title: 'สร้างบ้านคุณภาพ ด้วยมาตรฐานวิศวกรรม',
    description: 'ออกแบบ ก่อสร้าง และควบคุมงานโดยทีมงานมืออาชีพ ครบจบในที่เดียว',
    image: '/images/slide1.jpg',
  },
  {
    title: 'รับเหมาก่อสร้างครบวงจร สำหรับบ้านและอาคาร',
    description: 'ใส่ใจทุกขั้นตอน ส่งมอบผลงานที่สวยงาม แข็งแรง และคุ้มค่า',
    image: '/images/slide2.jpg',
  },
  {
    title: 'งานก่อสร้างที่เชื่อถือได้ พร้อมบริการหลังการขาย',
    description: 'โปร่งใส ตรงเวลา และสื่อสารชัดเจนในทุกโครงการ',
    image: '/images/slide3.jpg',
  },
]

const services = [
  {
    title: 'รับสร้างบ้าน',
    description: 'บ้านเดี่ยว บ้านพักอาศัย และบ้านตามแบบเฉพาะ',
    icon: BuildingOffice2Icon,
  },
  {
    title: 'ออกแบบและขออนุญาต',
    description: 'ดูแลตั้งแต่แบบก่อสร้างจนเอกสารยื่นขออนุญาต',
    icon: WrenchScrewdriverIcon,
  },
  {
    title: 'ควบคุมงานและส่งมอบ',
    description: 'ตรวจสอบคุณภาพงานทุกขั้นตอนจนส่งมอบจริง',
    icon: ShieldCheckIcon,
  },
]

const highlights = [
  'ประสบการณ์ทีมงานด้านก่อสร้างและควบคุมงาน',
  'ใช้วัสดุมาตรฐานและงานเก็บรายละเอียดเรียบร้อย',
  'สื่อสารชัดเจน ตรงเวลา และงบประมาณโปร่งใส',
  'บริการครบวงจร ตั้งแต่ออกแบบจนถึงส่งมอบ',
]

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [status, setStatus] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  useEffect(() => {
    const interval = setInterval(() => setCurrent((prev) => (prev + 1) % heroSlides.length), 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.FB) window.FB.XFBML.parse()
  }, [])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('กำลังส่งข้อความ...')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      setStatus('ส่งข้อความเรียบร้อย ทีมงานจะติดต่อกลับโดยเร็วที่สุด')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } else {
      setStatus('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    }
  }

  const slide = heroSlides[current]

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden bg-slate-950 text-white">
        <section className="relative isolate overflow-hidden pt-24 sm:pt-28">
          <div className="absolute inset-0">
            <img src={slide.image} alt="" className="h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-amber-950/40" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
                Kitti Construction · รับเหมาก่อสร้างครบวงจร
              </span>
              <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
                {slide.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="/contact" className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300">
                  ขอใบเสนอราคา
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </a>
                <a href="/portfolios" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                  ดูผลงานของเรา
                </a>
              </div>
            </div>

            <div className="grid gap-4 self-center">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.25em] text-amber-300">มาตรฐานงาน</p>
                <p className="mt-2 text-2xl font-semibold">ออกแบบสวย งานก่อสร้างแข็งแรง ส่งมอบตรงเวลา</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {services.map((service) => {
                  const Icon = service.icon
                  return (
                    <div key={service.title} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                      <Icon className="h-8 w-8 text-amber-300" />
                      <h3 className="mt-3 font-semibold">{service.title}</h3>
                      <p className="mt-2 text-sm text-slate-300">{service.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 text-slate-900 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">About us</p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">บริการรับเหมาก่อสร้างที่เน้นคุณภาพ ความสวยงาม และความน่าเชื่อถือ</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                  เราดูแลงานตั้งแต่แนวคิด ออกแบบ งบประมาณ ไปจนถึงงานก่อสร้างและส่งมอบจริง เพื่อให้เจ้าของบ้านมั่นใจได้ทั้งคุณภาพและความสบายใจ
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {highlights.map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <CheckCircleIcon className="mt-0.5 h-6 w-6 flex-none text-emerald-500" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <img src="/images/our-service/fullservice.jpg" alt="บริการครบวงจร" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 text-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Services</p>
                <h2 className="mt-2 text-3xl font-bold sm:text-4xl">บริการหลักของเรา</h2>
              </div>
              <p className="max-w-2xl text-slate-600">เหมาะสำหรับลูกค้าที่ต้องการผู้รับเหมาที่ดูแลครบทุกขั้นตอนอย่างเป็นระบบ</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: 'บ้านราคาเริ่มต้น', desc: 'เหมาะกับบ้านงบคุ้มค่า สวย เรียบ และใช้งานได้จริง', img: '/images/our-service/service1.jpg' },
                { title: 'บ้านระดับครอบครัว', desc: 'ออกแบบฟังก์ชันลงตัว รองรับการอยู่อาศัยระยะยาว', img: '/images/our-service/service2.jpg' },
                { title: 'บ้านพรีเมียม', desc: 'งานดีไซน์และวัสดุระดับสูง พร้อมรายละเอียดเฉพาะตัว', img: '/images/our-service/service3.jpg' },
              ].map((item) => (
                <article key={item.title} className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-2xl">
                  <div className="h-72 overflow-hidden">
                    <img src={item.img} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-slate-600">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Why choose us</p>
                <h2 className="mt-2 text-3xl font-bold sm:text-4xl">เพราะเราให้ความสำคัญกับคุณภาพและความสบายใจของลูกค้า</h2>
                <p className="mt-4 text-slate-300">ตั้งแต่งานเริ่มต้นจนถึงวันส่งมอบ เราเดินงานแบบมืออาชีพ ตรวจสอบทุกจุดเพื่อผลลัพธ์ที่ดีที่สุด</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  'ทีมงานประสบการณ์ด้านก่อสร้าง',
                  'งานมาตรฐานและควบคุมคุณภาพ',
                  'ดูแลงานครบวงจรแบบ One Stop Service',
                  'ให้คำปรึกษาและประเมินหน้างานอย่างตรงไปตรงมา',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-100">
                    <div className="flex items-start gap-3">
                      <CheckCircleIcon className="mt-1 h-5 w-5 flex-none text-emerald-400" />
                      <span>{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 text-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Facebook</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">ติดตามผลงานและอัปเดตล่าสุดของเรา</h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                ดูผลงาน ข่าวสาร และการอัปเดตโครงการจากเพจของเราได้ที่นี่
              </p>
            </div>

            <div className="mt-10 flex justify-center px-0 sm:px-2">
              <div className="w-full max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl sm:p-6 lg:p-8">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 013.7-3.9c1.1 0 2.3.2 2.3.2v2.5H15c-1.2 0-1.6.7-1.6 1.4V12H17l-.5 3h-2.1v7A10 10 0 0022 12z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-slate-900">Kitti Construction</h3>
                    <p className="text-sm text-slate-500">รับเหมาก่อสร้างครบวงจร</p>
                  </div>
                </div>

                <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-inner sm:p-3">
                  <Script
                    strategy="afterInteractive"
                    crossOrigin="anonymous"
                    src="https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v18.0"
                  />
                  <div
                    className="fb-page mx-auto flex justify-center"
                    data-href="https://www.facebook.com/profile.php?id=100057677932751"
                    data-tabs="timeline"
                    data-width="900"
                    data-height=""
                    data-small-header="false"
                    data-adapt-container-width="true"
                    data-hide-cover="false"
                    data-show-facepile="true"
                    data-lazy="true"
                  >
                    <blockquote cite="https://www.facebook.com/profile.php?id=100057677932751" className="fb-xfbml-parse-ignore">
                      <a href="https://www.facebook.com/profile.php?id=100057677932751">KTC รับสร้างบ้าน กรุงเทพและปริมณฑล</a>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-100 py-20 text-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Contact</p>
                <h2 className="mt-2 text-3xl font-bold sm:text-4xl">เริ่มต้นโครงการของคุณกับเรา</h2>
                <p className="mt-4 text-slate-600">กรอกข้อมูลเบื้องต้นเพื่อให้ทีมงานติดต่อกลับและประเมินงานได้อย่างเหมาะสม</p>
              </div>

              <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
                <div className="grid gap-5">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">ชื่อ-นามสกุล</label>
                    <input id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none ring-0 transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">อีเมล</label>
                      <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700">เบอร์ติดต่อ</label>
                      <input id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">รายละเอียดโครงการ</label>
                    <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20" />
                  </div>
                  <button type="submit" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800">
                    ส่งข้อความ
                  </button>
                  {status && <p className="text-sm text-emerald-600">{status}</p>}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
