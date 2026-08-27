import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Seo from '../../components/Seo'
import HazardStripe from '../../components/HazardStripe'
import { getPortfolioList } from '../../lib/portfoliosData'
import { buildBreadcrumbSchema } from '../../lib/breadcrumbSchema'

function PortfolioCard({ project, index }) {
  return (
    <Link
      href={`/portfolios/${project.name}`}
      data-aos="fade-up"
      data-aos-delay={index * 80}
      className="group overflow-hidden rounded-[1.75rem] bg-white shadow-lg ring-1 ring-slate-200 transition duration-500 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`หน้าปกโครงการ ${project.name} โดย Kitti Construction`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            loading="lazy"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">No cover image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow">
            Portfolio
          </span>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">{project.name}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          คลิกเพื่อดูภาพผลงานและรายละเอียดของโครงการนี้
        </p>
      </div>
    </Link>
  )
}

export default function Portfolios({ projects }) {
  return (
    <>
      <Seo
        title="ผลงานของเรา"
        canonicalPathname="/portfolios"
        description="รวมผลงานและโครงการก่อสร้างที่ Kitti Construction เคยดูแล พร้อมตัวอย่างภาพและรายละเอียดของแต่ละโครงการ"
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'ผลงานของเรา - Kitti Construction',
            url:
              (process.env.NEXT_PUBLIC_SITE_URL || 'https://kitticonstruction.com') +
              '/portfolios',
            publisher: {
              '@type': 'Organization',
              name: 'Kitti Construction',
              logo: '/images/logo.png',
            },
          },
          buildBreadcrumbSchema([
            { name: 'หน้าแรก', pathname: '/' },
            { name: 'ผลงานของเรา', pathname: '/portfolios' },
          ]),
        ]}
      />
      <Navbar />
      <main className="overflow-x-hidden bg-slate-50 pt-24 text-slate-900">
        <section className="bg-slate-950 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Portfolio</p>
            <h1 className="mt-3 text-3xl font-bold sm:text-5xl">ผลงานของเรา</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              รวมผลงานและโครงการที่เราเคยดูแล เพื่อให้คุณเห็นมาตรฐานงานและสไตล์การก่อสร้างของเรา
            </p>
          </div>
        </section>

        <HazardStripe />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Selected works</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">โครงการล่าสุดของเรา</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <PortfolioCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      projects: getPortfolioList(),
    },
    revalidate: 300,
  }
}