import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Portfolios() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/portfolios')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />

      <main className="pt-24 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-semibold text-blue-800 mb-10 text-center">
            Portfolios
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            {/* Skeleton loading */}
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden shadow animate-pulse"
                >
                  <div className="h-64 bg-gray-200" />
                  <div className="p-4 bg-white">
                    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
                  </div>
                </div>
              ))
            }

            {/* Projects */}
            {!loading && projects.map((project, index) => (
              <Link
                key={project.name}
                href={`/portfolios/${project.name}`}
              >
                <div
                  className="group cursor-pointer rounded-xl overflow-hidden shadow
                    hover:shadow-xl transition-all duration-500
                    opacity-0 translate-y-4 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {project.cover && (
                    <img
                      src={project.cover}
                      className="w-full h-64 object-cover
                        group-hover:scale-105 transition-transform duration-500"
                      alt=""
                    />
                  )}

                  <div className="p-4 bg-white text-center font-semibold">
                    {project.name}
                  </div>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
