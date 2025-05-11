import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const slides = [
  {
    image: '/images/slide1.jpg',
    title: 'สร้างสรรค์โครงการคุณภาพ',
    description: 'เรามุ่งมั่นพัฒนาโครงการเพื่ออนาคตที่ยั่งยืน'
  },
  {
    image: '/images/slide2.jpg',
    title: 'ความเชี่ยวชาญและประสบการณ์',
    description: 'เราคือผู้นำในด้านวิศวกรรมและการก่อสร้าง'
  },
  {
    image: '/images/slide3.jpg',
    title: 'พันธมิตรที่คุณวางใจได้',
    description: 'ร่วมเดินทางกับเราเพื่อความสำเร็จในทุกโครงการ'
  }
]

export default function Home() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const slide = slides[current]

  return (
    <>
      <Navbar />
      {/* Slide Show */}
      <div className="relative w-full h-[75vh] overflow-hidden">
        {slides.map((s, index) => (
          <img
            key={index}
            src={s.image}
            alt={s.title}
            className={`
              absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out 
              transform ${index === current ? 'opacity-100 scale-110 z-10' : 'opacity-0 scale-100 z-0'}
            `}
          />
        ))}

        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4 z-20">
          <h1 className="text-4xl font-bold mb-4">{slides[current].title}</h1>
          <p className="text-lg">{slides[current].description}</p>
        </div>
      </div>


      {/* Main Content */}
      <main className="text-center p-10 bg-white min-h-screen">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Kitti Construction</h1>
        <p className="text-gray-600">One Stop Service House Builder</p>
      </main>

      <Footer />
    </>
  )
}

