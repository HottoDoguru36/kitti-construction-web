import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Seo from '../../components/Seo'
import HazardStripe from '../../components/HazardStripe'
import { getServicesData } from '../../lib/servicesData'
import { buildBreadcrumbSchema } from '../../lib/breadcrumbSchema'

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9ก-๙]+/gi, '-')
    .replace(/^-+|-+$/g, '')
}

function useScrollToSection() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (!element) return

    const y = window.scrollY + element.getBoundingClientRect().top - 88
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return { scrollToSection }
}

function CategoryCard({ category, onOpenProject }) {
  return (
    <section
      className="relative scroll-mt-24 border-t border-slate-200 bg-white py-10 sm:py-14"
      id={slugify(category.folder)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              {category.title}
            </p>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              {category.folder}
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {category.items.map((item, index) => (
            <button
              key={`${category.folder}-${item.folder}`}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              onClick={() =>
                onOpenProject({
                  title: `${category.folder} · ${item.folder}`,
                  images: item.images ?? [],
                  initialIndex: 0,
                })
              }
              className="group overflow-hidden rounded-3xl bg-white text-left shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={
                    item.cover ||
                    category.cover ||
                    '/images/our-service/fullservice.jpg'
                  }
                  alt={`${category.folder} · ${item.folder} - Kitti Construction`}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold">
                  {item.name || item.folder}
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  คลิกเพื่อดูภาพภายในชุดนี้
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectGalleryModal({
  title,
  images,
  initialIndex = 0,
  onClose,
}) {
  const [index, setIndex] = useState(initialIndex)

  const imageCount = images?.length ?? 0

  const safeIndex =
    imageCount > 0
      ? Math.min(Math.max(index, 0), imageCount - 1)
      : 0

  const currentImage =
    imageCount > 0 ? images[safeIndex] : null

  useEffect(() => {
    const normalized = Math.min(
      Math.max(initialIndex, 0),
      imageCount - 1
    )

    setIndex(normalized)
  }, [initialIndex, imageCount])

  // lock body scroll
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  // keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }

      if (imageCount <= 1) return

      if (event.key === 'ArrowRight') {
        setIndex((prev) => (prev + 1) % imageCount)
      }

      if (event.key === 'ArrowLeft') {
        setIndex((prev) => (prev - 1 + imageCount) % imageCount)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      )
    }
  }, [imageCount, onClose])

  if (!imageCount) return null

  const next = () =>
    setIndex((prev) => (prev + 1) % imageCount)

  const prev = () =>
    setIndex((prev) => (prev - 1 + imageCount) % imageCount)

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh] overflow-auto rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-700">
              Project Gallery
            </p>

            <h3 className="mt-1 text-xl font-bold">
              {title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200"
          >
            ✕
          </button>
        </div>

        <div className="relative aspect-[16/10] w-full">
          {currentImage && (
            <Image
              src={currentImage}
              alt={title}
              fill
              sizes="(min-width: 1024px) 72rem, 100vw"
              className="object-cover"
              priority
            />
          )}

          {imageCount > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-lg"
              >
                ‹
              </button>

              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white shadow-lg"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Counter */}
        <div className="border-t bg-slate-50 px-6 py-3">
          <p className="text-sm text-slate-600">
            รูปที่ {safeIndex + 1} จาก {imageCount}
          </p>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-3 gap-3 p-6 sm:grid-cols-6">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setIndex(i)}
              className={`relative h-20 overflow-hidden rounded-xl border ${
                i === safeIndex
                  ? 'border-amber-400 ring-2 ring-amber-300/40'
                  : 'border-slate-200'
              }`}
            >
              <Image src={src} alt={`${title}-${i}`} fill sizes="150px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default function Services({ categories }) {
  const [activeProject, setActiveProject] = useState(null)

  const { scrollToSection } = useScrollToSection()

  const categoryLinks = useMemo(
    () =>
      categories.map((category) => ({
        id: slugify(category.folder),
        title: category.folder,
      })),
    [categories]
  )

  return (
    <>
      <Seo
        title="บริการรับเหมาก่อสร้าง"
        canonicalPathname="/services"
        description="บริการรับเหมาก่อสร้างครบวงจร จัดหมวดหมู่บริการบ้านขนาดเล็ก กลาง และใหญ่ พร้อมงานออกแบบและควบคุมคุณภาพ"
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'ServicePage',
            name: 'บริการรับเหมาก่อสร้าง - Kitti Construction',
            url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://kitticonstruction.com') + '/services',
            publisher: {
              '@type': 'Organization',
              name: 'Kitti Construction',
              logo: '/images/logo.png',
            },
          },
          buildBreadcrumbSchema([
            { name: 'หน้าแรก', pathname: '/' },
            { name: 'บริการรับเหมาก่อสร้าง', pathname: '/services' },
          ]),
        ]}
      />
      <Navbar />

      <main className="overflow-x-hidden bg-slate-50 pt-24">
        <section className="bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
              Services
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              หมวดหมู่บ้านของเรา
            </h1>

            <div className="mt-10 flex flex-wrap gap-3">
              {categoryLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() =>
                    scrollToSection(link.id)
                  }
                  className="rounded-full bg-white/10 px-4 py-2 text-sm"
                >
                  {link.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        <HazardStripe />

        <section className="pb-10">
          {categories.map((category) => (
            <CategoryCard
              key={category.folder}
              category={category}
              onOpenProject={setActiveProject}
            />
          ))}
        </section>
      </main>

      <Footer />

      {activeProject && (
        <ProjectGalleryModal
          title={activeProject.title}
          images={activeProject.images}
          initialIndex={activeProject.initialIndex}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      categories: await getServicesData(),
    },
    revalidate: 300,
  }
}
