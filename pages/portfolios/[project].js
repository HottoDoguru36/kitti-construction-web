import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function PortfolioDetail() {
  const router = useRouter()
  const { project } = router.query
  const [images, setImages] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!project) return
    fetch(`/api/portfolios/${project}`)
      .then(res => res.json())
      .then(data => {
        setImages(data.filter(i => i !== 'cover.jpg'))
      })
  }, [project])

  const next = () => setIndex((index + 1) % images.length)
  const prev = () => setIndex((index - 1 + images.length) % images.length)

  return (
    <>
      <Navbar />

      <main className="pt-24 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* Back */}
          <Link href="/portfolios">
            <button className="mb-6 text-blue-700 hover:underline">
              ← กลับไปหน้า Portfolios
            </button>
          </Link>

          <h1 className="text-3xl font-semibold mb-10 text-center">
            โครงการ {project}
          </h1>

          {/* SLIDESHOW */}
          <div className="relative w-full overflow-visible">

            {/* Slides wrapper */}
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(calc(50% - ${index * 80}% - 40%))`
              }}
            >
              {images.map((img, i) => (
                <div
                  key={img}
                  className={`shrink-0 w-[80%] px-4 transition-all duration-500 ${
                    i === index ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
                  }`}
                >
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={`/images/portfolios/${project}/${img}`}
                      className="w-full h-[480px] object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full w-12 h-12 flex items-center justify-center"
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full w-12 h-12 flex items-center justify-center"
            >
              ›
            </button>

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
