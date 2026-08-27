import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import Seo from '../../components/Seo'
import { getPortfolioList, getPortfolioImages } from '../../lib/portfoliosData'
import { buildBreadcrumbSchema } from '../../lib/breadcrumbSchema'

export default function PortfolioDetail({ project, images }) {
  const [index, setIndex] = useState(0)
  const [isGalleryVisible, setIsGalleryVisible] = useState(false)
  const galleryRef = useRef(null)

  useEffect(() => {
    const element = galleryRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGalleryVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const currentImage = useMemo(() => {
    if (!images.length) return null
    return images[index % images.length]
  }, [images, index])

  const next = () => {
    if (!images.length) return
    setIndex((prev) => (prev + 1) % images.length)
  }

  const prev = () => {
    if (!images.length) return
    setIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <Seo
        title={`โครงการ ${project}`}
        canonicalPathname={`/portfolios/${project}`}
        description={`แกลเลอรีผลงานสำหรับโครงการ ${project} - Kitti Construction`}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: `โครงการ ${project}`,
            url:
              (process.env.NEXT_PUBLIC_SITE_URL ||
                'https://kitticonstruction.com') +
              `/portfolios/${project}`,
            publisher: {
              '@type': 'Organization',
              name: 'Kitti Construction',
              logo: '/images/logo.png',
            },
          },
          buildBreadcrumbSchema([
            { name: 'หน้าแรก', pathname: '/' },
            { name: 'ผลงานของเรา', pathname: '/portfolios' },
            { name: `โครงการ ${project}`, pathname: `/portfolios/${project}` },
          ]),
        ]}
      />
      <Navbar />
      <main className="overflow-x-hidden bg-slate-50 pt-24 text-slate-900">
        <section className="bg-slate-950 py-14 text-white sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href="/portfolios" className="inline-flex items-center text-sm font-medium text-amber-300 transition hover:text-amber-200">
              <ChevronLeftIcon className="mr-1 h-4 w-4" />
              กลับไปหน้า Portfolios
            </Link>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              โครงการ {project}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              แกลเลอรีผลงานภายในโครงการนี้ แสดงรายละเอียดงานจริงที่เราเคยดูแล
            </p>
          </div>
        </section>

        <section ref={galleryRef} className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr] lg:items-start">
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-slate-200">
              <div className="relative aspect-[4/3] bg-slate-100 sm:aspect-[16/10]">
                {isGalleryVisible && currentImage ? (
                  <Image
                    src={`/images/portfolios/${project}/${currentImage}`}
                    alt={`ภาพที่ ${index + 1} ของโครงการ ${project}`}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">
                    {isGalleryVisible ? 'ยังไม่มีรูปภาพในโครงการนี้' : 'กำลังเตรียมรูปภาพ'}
                  </div>
                )}

                {isGalleryVisible && images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      aria-label="รูปก่อนหน้า"
                      className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg transition hover:bg-white sm:left-4 sm:h-12 sm:w-12"
                    >
                      <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                    <button
                      onClick={next}
                      aria-label="รูปถัดไป"
                      className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg transition hover:bg-white sm:right-4 sm:h-12 sm:w-12"
                    >
                      <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </>
                )}
              </div>

              {isGalleryVisible && images.length > 0 && (
                <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-6">
                  <p className="text-sm text-slate-600">
                    รูปที่ {index + 1} จาก {images.length}
                  </p>
                </div>
              )}
            </div>

            <aside className="rounded-[2rem] bg-white p-6 shadow-lg ring-1 ring-slate-200 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Project gallery</p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">รายละเอียดโครงการ</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                ดูภาพผลงานภายในโครงการนี้ได้ด้านล่าง
              </p>

              <div className="mt-6 grid gap-3">
                {images.slice(0, 5).map((image, itemIndex) => (
                  <button
                    key={image}
                    onClick={() => setIndex(itemIndex)}
                    className={`relative h-24 overflow-hidden rounded-2xl border transition sm:h-28 ${index === itemIndex ? 'border-amber-400 ring-2 ring-amber-300/40' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <Image
                      src={`/images/portfolios/${project}/${image}`}
                      alt={`ภาพที่ ${itemIndex + 1} ของโครงการ ${project}`}
                      fill
                      sizes="200px"
                      loading="lazy"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticPaths() {
  const projects = getPortfolioList()

  return {
    paths: projects.map((p) => ({ params: { project: p.name } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const images = getPortfolioImages(params.project).filter((image) => image !== 'cover.jpg')

  if (!images.length && !getPortfolioList().some((p) => p.name === params.project)) {
    return { notFound: true }
  }

  return {
    props: {
      project: params.project,
      images,
    },
    revalidate: 300,
  }
}
