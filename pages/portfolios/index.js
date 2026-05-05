import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

function PortfolioCard({ project, index }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Link
      ref={ref}
      href={`/portfolios/${project.name}`}
      className={`group overflow-hidden rounded-[1.75rem] bg-white shadow-lg ring-1 ring-slate-200 transition duration-500 hover:-translate-y-1 hover:shadow-2xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {project.cover ? (
          <img
            src={project.cover}
            alt={project.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
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

export default function Portfolios() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/portfolios')
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : [])
      })
      .finally(() => setLoading(false))
  }, [])

  const skeletons = useMemo(() => Array.from({ length: 6 }), [])

  return (
    <>
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

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Selected works</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">โครงการล่าสุดของเรา</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading &&
              skeletons.map((_, i) => (
                <div key={i} className="animate-pulse overflow-hidden rounded-[1.75rem] bg-white shadow-lg ring-1 ring-slate-200">
                  <div className="aspect-[4/3] bg-slate-200" />
                  <div className="p-5">
                    <div className="h-4 w-2/3 rounded bg-slate-200" />
                    <div className="mt-3 h-3 w-full rounded bg-slate-200" />
                  </div>
                </div>
              ))}

            {!loading &&
              projects.map((project, index) => (
                <PortfolioCard key={project.name} project={project} index={index} />
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
