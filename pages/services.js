import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9ก-๙]+/gi, '-').replace(/^-+|-+$/g, '')
}

function useScrollToSection() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (!element) return

    window.requestAnimationFrame(() => {
      const y = window.scrollY + element.getBoundingClientRect().top - 88
      window.scrollTo({ top: y, behavior: 'smooth' })
    })
  }

  return { scrollToSection }
}

function ServiceCategoryCard({ category, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(category)}
      className="group overflow-hidden rounded-[1.75rem] bg-white text-left shadow-lg ring-1 ring-slate-200 transition duration-500 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={category.cover || '/images/our-service/fullservice.jpg'}
          alt={category.folder}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
      </div>
      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">{category.folder}</h2>
        <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{category.title}</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{category.desc}</p>
        <p className="mt-4 text-sm font-semibold text-amber-700">ดูหมวดย่อยด้านล่าง</p>
      </div>
    </button>
  )
}

function ServiceGallery({ category, onOpen }) {
  return (
    <section
      id={slugify(category.folder)}
      className="scroll-mt-24 border-t border-slate-200 bg-white py-16 text-slate-900 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Category folder</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{category.folder}</h2>
            <p className="mt-2 text-sm text-slate-500">{category.title}</p>
          </div>
          <p className="max-w-2xl text-slate-600">{category.desc}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {category.items.map((item) => (
            <button
              key={`${category.folder}-${item.folder}`}
              type="button"
              onClick={() => onOpen(category, item)}
              className="group overflow-hidden rounded-[1.75rem] bg-slate-50 text-left shadow-lg ring-1 ring-slate-200 transition duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.cover || category.cover || '/images/our-service/fullservice.jpg'}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">{item.name}</h3>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{item.folder}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">คลิกเพื่อดูภาพภายในชุดนี้</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function ImageModal({ title, images, initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    setIndex(initialIndex)
  }, [initialIndex, title])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') setIndex((prev) => (prev + 1) % images.length)
      if (event.key === 'ArrowLeft') setIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length, onClose])

  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    const { body } = document
    const scrollY = window.scrollY
    const previous = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    }

    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'

    return () => {
      body.style.overflow = previous.overflow
      body.style.position = previous.position
      body.style.top = previous.top
      body.style.width = previous.width
      window.scrollTo({ top: scrollY, behavior: 'auto' })
    }
  }, [])

  const currentImage = images[index]

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center overflow-hidden bg-slate-950/90 p-2 backdrop-blur-md sm:p-4">
      <div className="relative grid w-full max-w-6xl grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-[1.25rem] bg-white shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:rounded-[2rem]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">Gallery</p>
            <h3 className="mt-1 truncate text-lg font-semibold text-slate-900 sm:text-xl">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 sm:h-11 sm:w-11"
            aria-label="ปิด"
          >
            ✕
          </button>
        </div>

        <div className="grid min-h-0 min-w-0 gap-0 overflow-hidden lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="relative min-h-[34vh] bg-black sm:min-h-[42vh] lg:min-h-0">
            <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={title}
                  className="max-h-full max-w-full object-contain"
                />
              ) : null}
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg transition hover:bg-white sm:left-4"
                  aria-label="รูปก่อนหน้า"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => setIndex((prev) => (prev + 1) % images.length)}
                  className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg transition hover:bg-white sm:right-4"
                  aria-label="รูปถัดไป"
                >
                  ›
                </button>
              </>
            )}
          </div>

          <div className="max-h-[26vh] overflow-y-auto border-t border-slate-200 bg-slate-50 p-3 sm:max-h-none sm:p-5 lg:border-l lg:border-t-0 lg:w-[300px] lg:max-h-[calc(100dvh-8rem)]">
            <p className="text-sm font-medium text-slate-600">
              รูปที่ {index + 1} จาก {images.length}
            </p>

            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5 lg:grid-cols-2">
              {images.map((image, thumbIndex) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setIndex(thumbIndex)}
                  className={`overflow-hidden rounded-xl border transition ${
                    thumbIndex === index ? 'border-amber-400 ring-2 ring-amber-300/40' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={image} alt={`${title} ${thumbIndex + 1}`} className="h-16 w-full object-cover sm:h-20 lg:h-24" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeGallery, setActiveGallery] = useState(null)
  const { scrollToSection } = useScrollToSection()

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  const categoryLinks = useMemo(
    () => categories.map((category) => ({ title: category.title, id: slugify(category.folder) })),
    [categories]
  )

  const openGallery = (category, item) => {
    setActiveGallery({
      title: `${category.folder} · ${item.folder}`,
      images: item.images,
      initialIndex: 0,
    })
  }

  const handleCategoryJump = (id) => {
    scrollToSection(id)
  }

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden bg-slate-50 pt-24 text-slate-900">
        <section className="bg-slate-950 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Services</p>
            <h1 className="mt-3 text-3xl font-bold sm:text-5xl">หมวดหมู่บ้านของเรา</h1>

            <div className="mt-8 flex flex-wrap gap-3">
              {categoryLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleCategoryJump(link.id)}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  {link.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse overflow-hidden rounded-[1.75rem] bg-white shadow-lg ring-1 ring-slate-200">
                  <div className="aspect-[4/3] bg-slate-200" />
                  <div className="p-5">
                    <div className="h-4 w-2/3 rounded bg-slate-200" />
                    <div className="mt-3 h-3 w-full rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {categories.map((item) => (
                <ServiceCategoryCard
                  key={item.folder}
                  category={item}
                  onOpen={(category) => handleCategoryJump(slugify(category.folder))}
                />
              ))}
            </div>
          )}
        </section>

        {!loading &&
          categories.map((category) => (
            <ServiceGallery
              key={category.folder}
              category={category}
              onOpen={openGallery}
            />
          ))}
      </main>

      {activeGallery && (
        <ImageModal
          title={activeGallery.title}
          images={activeGallery.images}
          initialIndex={activeGallery.initialIndex}
          onClose={() => setActiveGallery(null)}
        />
      )}

      <Footer />
    </>
  )
}
