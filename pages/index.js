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

  // เพิ่ม useEffect สำหรับการเพิ่ม class animation ให้กับโลโก้
  useEffect(() => {
    const logo = document.getElementById('logo');
    if (logo) {
      logo.classList.add('animate-slide-up');
    }
  }, []);

  const slide = slides[current]

  return (
    <>
      <Navbar />
      {/* Slide Show with Logo and Motto 1/4 */}
      <div className="relative w-full h-[75vh] flex">
        {/* Left Side - Logo and Motto */}
        <div className="w-1/4 flex justify-center items-center bg-gray-200 text-black p-8">
          <div className="text-center">
            {/* Logo and its animation */}
            <img id="logo" src="/images/logo.png" alt="Company Logo" className="w-400 h-400 mb-4" />
            <h2 className="font-noto text-3xl font-bold mb-2">Kitti Construction</h2>
            <p className="font-noto text-lg italic">One Stop Service House Builder</p>
          </div>
        </div>

        {/* Right Side - Slideshow 3/4 */}
        <div className="relative w-3/4 h-full overflow-hidden">
          {slides.map((s, index) => (
            <img
              key={index}
              src={s.image}
              alt={s.title}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out 
                transform ${index === current ? 'opacity-100 scale-105 z-10' : 'opacity-0 scale-100 z-0'}`}
            />
          ))}

        <div
          key={current}
          className="absolute inset-0 flex items-center justify-center z-20"
        >
          <div className="relative text-white text-center w-full max-w-4xl px-4">
            {/* Transparent Box Background */}
            <div className="absolute inset-0 bg-black bg-opacity-50 animate-slide-bar z-0 rounded-lg shadow-lg"></div>

            {/* Text on slideshow */}
            <div className="relative z-10 opacity-0 animate-fade-in delay-500 py-8 px-6">
              <h1 className="text-4xl font-bold mb-4">{slides[current].title}</h1>
              <p className="text-lg">{slides[current].description}</p>
            </div>
          </div>
        </div>
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
