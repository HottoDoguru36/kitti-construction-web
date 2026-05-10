import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import Seo from '../components/Seo'

const values = [
  'ทีมงานมืออาชีพ ดูแลงานตั้งแต่เริ่มต้นจนส่งมอบ',
  'บริการครบวงจร ทั้งออกแบบ ก่อสร้าง และประสานงาน',
  'ควบคุมคุณภาพงานอย่างใกล้ชิดและโปร่งใส',
  'เน้นความคุ้มค่า ความสวยงาม และความแข็งแรงในระยะยาว',
]

const services = [
  'รับสร้างบ้านตามแบบ',
  'ออกแบบบ้านใหม่ตามความต้องการ',
  'รับสร้างอาคารและอพาร์ทเมนท์',
  'รับเหมาก่อสร้างครบวงจร',
]

export default function About() {
  return (
    <>
      <Seo
        title="เกี่ยวกับเรา"
        canonicalPathname="/about"
        description="Kitti Construction คือบริษัทรับเหมาก่อสร้างครบวงจร ตั้งแต่ออกแบบ ควบคุมงบประมาณ ไปจนถึงการก่อสร้างและส่งมอบผลงาน"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'เกี่ยวกับเรา - Kitti Construction',
          url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://kitticonstruction.com') + '/about',
          publisher: {
            '@type': 'Organization',
            name: 'Kitti Construction',
            logo: '/images/logo.png',
          },
        }}
      />
      <Navbar />
      <main className="bg-slate-50 pt-24 text-slate-900">
        <section className="bg-slate-950 py-20 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">About us</p>
              <h1 className="mt-3 text-4xl font-bold sm:text-5xl">เกี่ยวกับเรา</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Kitti Construction คือบริษัทรับเหมาก่อสร้างที่ให้บริการแบบครบวงจร ตั้งแต่ออกแบบ ควบคุมงบประมาณ ไปจนถึงการก่อสร้างและส่งมอบผลงานที่พร้อมใช้งานจริง
              </p>
            </div>
            <div className="flex justify-center">
              <div className="flex h-72 w-72 items-center justify-center rounded-[2rem] border border-amber-400/30 bg-white/5 p-8 shadow-2xl sm:h-80 sm:w-80 lg:h-96 lg:w-96">
                <img src="/images/logo.png" alt="Kitti Construction Logo" className="h-full w-full object-contain drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Our values</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">สิ่งที่เราให้ความสำคัญ</h2>
              <div className="mt-8 space-y-4">
                {values.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <CheckCircleIcon className="mt-0.5 h-6 w-6 flex-none text-emerald-500" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Services</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">บริการของเรา</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {services.map((service) => (
                  <div key={service} className="rounded-2xl bg-slate-950 p-5 text-white shadow-lg">
                    <p className="text-lg font-medium">{service}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
