import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

export default function About() {
  const [selectedLevel, setSelectedLevel] = useState(1)
  const [showDetails, setShowDetails] = useState(true)

  const levels = [
    {
      id: 1,
      label: 'ระดับ 1',
      price: 'ราคา 1.xx - 3.xx ล้านบาท',
      img: '/images/slide1.jpg',
      description: 'รายละเอียดเพิ่มเติมระดับ 1...'
    },
    {
      id: 2,
      label: 'ระดับ 2',
      price: 'ราคา 4.xx - 6.xx ล้านบาท',
      img: '/images/slide2.jpg',
      description: 'รายละเอียดเพิ่มเติมระดับ 2...'
    },
    {
      id: 3,
      label: 'ระดับ 3',
      price: 'ราคา 7.xx ล้านบาทขึ้นไป',
      img: '/images/slide3.jpg',
      description: 'รายละเอียดเพิ่มเติมระดับ 3...'
    },
  ]

  // ทำให้ข้อความ fade out -> เปลี่ยน -> fade in
  useEffect(() => {
    setShowDetails(false)
    const timeout = setTimeout(() => setShowDetails(true), 250)
    return () => clearTimeout(timeout)
  }, [selectedLevel])

  const roundedLevel = Math.round(selectedLevel)
  const currentLevel = levels[roundedLevel - 1] || levels[0]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 px-6 py-12 pt-20">
        <div className="max-w-7xl mx-auto space-y-16 pt-20">

          {/* เกี่ยวกับเรา */}
          <section data-aos="fade-up" className="mb-12">
            <h1 className="text-4xl font-bold text-blue-800 mb-6">เกี่ยวกับเรา</h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
              บริษัทรับเหมาก่อสร้างครบวงจร “ สร้างบ้านอย่างมีคุณภาพ ราคาไม่แพง “ ด้วยทีมงานมืออาชีพ
            </p>
          </section>

          {/* บริการของเรา */}
          <section data-aos="fade-right" className="mb-12">
            <h2 className="text-3xl font-semibold text-blue-700 mb-6">บริการของเรา</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                'บริการรับสร้างบ้านตามเเบบมาตรฐาน',
                'บริการรับสร้างบ้านพร้อมออกเเบบให้ใหม่',
                'บริการรับสร้างอาคาร อพาร์ทเม้นท์',
                'บริการรับเหมาก่อสร้างครบวงจร',
              ].map((service, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                  <p className="text-lg text-gray-800">{service}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ระดับสเกลบ้าน */}
          <section data-aos="fade-left">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">สเกลบ้านงาน 3 ระดับ</h3>

            {/* Slider */}
            <div className="w-full mb-8">
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={selectedLevel}
                onChange={e => setSelectedLevel(Number(e.target.value))}
                onMouseUp={e => setSelectedLevel(Math.round(Number(e.currentTarget.value)))}
                onTouchEnd={e => setSelectedLevel(Math.round(Number(e.currentTarget.value)))}
                className="w-full cursor-pointer accent-blue-600"
              />

              {/* Ticks */}
              <div className="relative flex justify-between mt-2 px-1 text-sm text-blue-700 font-semibold select-none">
                <span>ระดับ 1</span>
                <span>ระดับ 2</span>
                <span>ระดับ 3</span>
              </div>

              {/* จุดเล็ก ๆ บนเส้น */}
              <div className="relative mt-1 h-2 w-full">
                {[1, 2, 3].map((tick) => (
                  <div
                    key={tick}
                    className="absolute top-0 w-3 h-3 rounded-full bg-blue-600"
                    style={{ left: `${((tick - 1) / 2) * 100}%`, transform: 'translateX(-50%)' }}
                  />
                ))}
              </div>
            </div>

            {/* Image slider */}
            <div className="overflow-hidden max-w-[900px] rounded-lg shadow-md mx-auto">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${(selectedLevel - 1) * 100}%)` }}
              >
                {levels.map(level => (
                  <img
                    key={level.id}
                    src={level.img}
                    alt={`รูป ${level.label}`}
                    className="w-[900px] flex-shrink-0 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* Details */}
            <div
              className={`mt-8 max-w-md mx-auto md:mx-0 text-center md:text-left transition-opacity duration-300 ease-in-out ${
                showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
              }`}
            >
              {/* Label */}
              <h4 className="text-3xl font-extrabold text-blue-800 mb-3">{currentLevel.label}</h4>

              {/* Price */}
              <p className="text-xl font-semibold text-gray-900 mb-3">{currentLevel.price}</p>

              {/* Description */}
              <p className="text-lg text-gray-700 leading-relaxed">{currentLevel.description}</p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
