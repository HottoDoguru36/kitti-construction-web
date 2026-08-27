import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Image from 'next/image'
import Seo from '../../components/Seo'
import HazardStripe from '../../components/HazardStripe'
import ProcessTimeline from '../../components/ProcessTimeline'
import { buildBreadcrumbSchema } from '../../lib/breadcrumbSchema'

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

const workflowSteps = [
  'สำรวจหน้างานและรับความต้องการ',
  'ออกแบบและประเมินงบประมาณ',
  'วางแผนงานก่อสร้างและควบคุมคุณภาพ',
  'ส่งมอบงานพร้อมดูแลหลังการขาย',
]

export default function Projects() {
  return (
    <>
      <Seo
        title="บริการและโครงการ"
        canonicalPathname="/projects"
        description="รวมบริการและประเภทงานก่อสร้างที่ Kitti Construction ดูแล ตั้งแต่สำรวจ ออกแบบ ประเมินงบ วางแผนควบคุมคุณภาพ ไปจนถึงส่งมอบงาน"
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'บริการและโครงการ - Kitti Construction',
            url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://kitticonstruction.com') + '/projects',
            publisher: {
              '@type': 'Organization',
              name: 'Kitti Construction',
              logo: '/images/logo.png',
            },
          },
          buildBreadcrumbSchema([
            { name: 'หน้าแรก', pathname: '/' },
            { name: 'บริการและโครงการ', pathname: '/projects' },
          ]),
        ]}
      />
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

        <HazardStripe />

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <article
                key={project.title}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200"
              >
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p className="mt-3 text-slate-600">{project.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl lg:aspect-auto lg:h-full">
              <Image src="/images/our-service/fullservice.jpg" alt="โครงการก่อสร้างของ Kitti Construction" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Process</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">ขั้นตอนการทำงาน</h2>
              <div className="mt-8">
                <ProcessTimeline steps={workflowSteps} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
