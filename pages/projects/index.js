import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const projects = [
  {
    title: 'บ้านพักอาศัยและบ้านเดี่ยว',
    description: 'งานสร้างบ้านครบวงจร ตั้งแต่คอนเซ็ปต์จนถึงส่งมอบ',
  },
  {
    title: 'อาคารพาณิชย์และอาคารสำนักงาน',
    description: 'ออกแบบและก่อสร้างโครงสร้างที่รองรับการใช้งานจริง',
  },
  {
    title: 'อพาร์ทเมนท์และงานต่อเติม',
    description: 'รองรับโครงการขนาดเล็กถึงกลางด้วยทีมงานที่คล่องตัว',
  },
  {
    title: 'งานรีโนเวตและปรับปรุงอาคาร',
    description: 'เพิ่มมูลค่าและยืดอายุการใช้งานของอาคารเดิม',
  },
]

const process = [
  'สำรวจหน้างานและรับความต้องการ',
  'ออกแบบและประเมินงบประมาณ',
  'วางแผนงานก่อสร้างและควบคุมคุณภาพ',
  'ส่งมอบงานพร้อมดูแลหลังการขาย',
]

export default function Projects() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50 pt-24 text-slate-900">
        <section className="bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Services</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">บริการและโครงการ</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              เราดูแลงานก่อสร้างหลากหลายประเภท โดยยึดคุณภาพ ความโปร่งใส และความตรงเวลาเป็นหลัก
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.title} className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="mt-3 text-slate-600">{project.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img src="/images/our-service/fullservice.jpg" alt="โครงการก่อสร้าง" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Process</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">ขั้นตอนการทำงาน</h2>
              <div className="mt-8 space-y-4">
                {process.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <CheckCircleIcon className="mt-0.5 h-6 w-6 flex-none text-emerald-500" />
                    <span className="text-slate-700">{item}</span>
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
