import { useEffect, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Script from 'next/script'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const slideTexts = [
  {
    title: 'สร้างสรรค์โครงการคุณภาพ',
    description: 'เรามุ่งมั่นพัฒนาโครงการเพื่ออนาคตที่ยั่งยืน'
  },
  {
    title: 'ความเชี่ยวชาญและประสบการณ์',
    description: 'เราคือผู้นำในด้านวิศวกรรมและการก่อสร้าง'
  },
  {
    title: 'พันธมิตรที่คุณวางใจได้',
    description: 'ร่วมเดินทางกับเราเพื่อความสำเร็จในทุกโครงการ'
  },
  {
    title: 'มาตรฐานงานก่อสร้างระดับมืออาชีพ',
    description: 'เราควบคุมคุณภาพทุกขั้นตอน เพื่อผลลัพธ์ที่คุณเชื่อมั่นและไว้ใจได้'
  }
];

const slideImages = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
  '/images/slide4.jpg',
  '/images/slide5.jpg'
];

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
const shuffledImages = shuffle(slideImages);

const slides = slideTexts.map((text, index) => ({
  ...text,
  image: shuffledImages[index]
}));

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

  useEffect(() => {
    if (typeof window !== 'undefined' && window.FB) {
      window.FB.XFBML.parse()
    }
  }, [])

  const slide = slides[current]

  // Email Nodemailer
  const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  message: ''
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

    const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('กำลังส่ง...')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      setStatus('ส่งอีเมล์แล้ว ทางเราจะรีบติดต่อกลับอย่างเร็วที่สุดครับ 😊')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } else {
      setStatus('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    }
  }


  return (
    <>
      <Navbar />
      {/* Slide Show with Logo and Motto 1/4 */}
      <div className="relative w-full h-[75vh] flex">
        {/* Left Side - Logo and Motto */}
        <div className="w-1/4 flex justify-center items-center bg-gradient-to-b from-white to-gray-200 text-black p-8">
          <div className="text-center">
            {/* Logo and its animation */}
            <img id="logo" src="/images/logo.png" alt="Company Logo" className="w-400 h-400 mb-4" />
            {/* Company Name */}
            <h2 className="font-roboto text-5xl font-bold mb-4">Kitti Construction</h2>
            {/* Motto (English) */}
            <p className="font-roboto text-2xl italic mb-2">One Stop Service House Builder</p>
            {/* Motto (Thai) */}
            <p className="font-noto text-xl italic">รับเหมาออกเเบบบ้านเเบบมืออาชีพอย่างครบวงจร</p>
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
      <main className="text-center p-10 bg-gradient-to-b from-blue-50 to-white">
      {/* Service Header */}
      <div className="w-full bg-blue-950 text-white py-6 flex justify-between items-center px-10">
        <div className="flex flex-col text-left">
          <h1 className="font-roboto text-3xl font-bold">Our Service</h1>
          <h2 className="font-noto text-lg">บริการของเรา</h2>
        </div>
        <div className="text-right">
          <p className="font-noto text-2xl">เราให้บริการรับเหมาเต็มระบบ ครบวงจร ใส่ใจทุกขั้นตอน ด้วยคุณภาพและความปลอดภัยที่คุณไว้วางใจได้</p>
        </div>
      </div>

      {/* Services Section */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 px-4 md:px-6 lg:px-8">
        <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-2xl hover:scale-110 transform transition duration-500 ease-in-out">
          {/* Service Label */}
          <div className="absolute top-4 left-4 bg-blue-800 text-white text-lg font-semibold px-4 py-2 rounded-full">
            บ้านเดี่ยว ราคาประหยัด
          </div>
          <img src="/images/our-service/service1.jpg" alt="บ้านราคา 2-4 ล้าน" className="w-full h-96 object-cover" />
          <div className="p-4 bg-gray-100">
            <h3 className="font-roboto text-xl font-bold text-gray-800 mb-2">บ้านราคา 2 - 4 ล้านบาท</h3>
            <p className="text-gray-600">ออกแบบทันสมัย เน้นฟังก์ชันและประหยัดพื้นที่</p>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-2xl hover:scale-110 transform transition duration-500 ease-in-out">
          {/* Service Label */}
          <div className="absolute top-4 left-4 bg-blue-800 text-white text-lg font-semibold px-4 py-2 rounded-full">
            บ้านเดี่ยว ราคาจับต้องได้
          </div>
          <img src="/images/our-service/service2.jpg" alt="บ้านราคา 5-10 ล้าน" className="w-full h-96 object-cover" />
          <div className="p-4 bg-gray-100">
            <h3 className="font-roboto text-xl font-bold text-gray-800 mb-2">บ้านราคา 5 - 10 ล้านบาท</h3>
            <p className="text-gray-600">หรูหรา ครบทุกฟังก์ชัน เหมาะกับครอบครัวขนาดกลาง</p>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-2xl hover:scale-110 transform transition duration-500 ease-in-out">
          {/* Service Label */}
          <div className="absolute top-4 left-4 bg-blue-800 text-white text-lg font-semibold px-4 py-2 rounded-full">
            บ้านเดี่ยว ราคาสุดหรู
          </div>
          <img src="/images/our-service/service3.jpg" alt="บ้าน 20 ล้านขึ้นไป" className="w-full h-96 object-cover" />
          <div className="p-4 bg-gray-100">
            <h3 className="font-roboto text-xl font-bold text-gray-800 mb-2">บ้าน 20 ล้านบาทขึ้นไป</h3>
            <p className="text-gray-600">สถาปัตยกรรมพรีเมียม พร้อมวัสดุคุณภาพระดับสูงสุด</p>
          </div>
        </div>
      </section>

    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 items-start max-w-[100vw]">

        {/* รูปฝั่งซ้าย */}
        <div className="w-full h-full">
          <img
            src="/images/our-service/fullservice.jpg"
            alt="จุดเด่นของบริการ"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ข้อความฝั่งขวา */}
        <div className="w-full px-10 md:px-16 py-16 flex flex-col justify-start items-start text-gray-800">
          <h3 className="text-4xl md:text-5xl font-bold mb-10">ทำไมต้องเลือกเรา?</h3>
          <ul className="space-y-6 w-full text-xl md:text-2xl leading-relaxed">
            {[
              "ทีมงานมืออาชีพ ดูแลตั้งแต่เริ่มต้นจนส่งมอบ",
              "ประสบการณ์มากกว่า 10 ปีในวงการก่อสร้าง",
              "บริการครบวงจร ทั้งออกแบบ ก่อสร้าง ขออนุญาต",
              "โปร่งใส ตรงเวลา พร้อมผลงานคุณภาพ"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

        {/* Facebook SDK Script */}
        <Script
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v18.0"
        />

        {/* Facebook Section */}
        <section className="bg-gray-100 py-16 px-4">
          <div className="w-full text-center mb-8">
            <h2 className="text-4xl font-bold text-blue-800 flex items-center justify-center gap-3">
              <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 013.7-3.9c1.1 0 2.3.2 2.3.2v2.5H15c-1.2 0-1.6.7-1.6 1.4V12H17l-.5 3h-2.1v7A10 10 0 0022 12z" />
              </svg>
              โปรดติดตามเราใน Facebook
            </h2>
            <p className="text-gray-600 mt-2 text-xl">
              อัปเดตข่าวสาร โปรเจกต์ และผลงานล่าสุดของเราได้ที่เพจ
            </p>
          </div>

          <div className="flex justify-center px-2">
            <div className="w-full max-w-[1400px] bg-white rounded-xl shadow-xl p-4">
              <div
                className="fb-page w-full"
                data-href="https://www.facebook.com/profile.php?id=100057677932751"
                data-tabs="timeline"
                data-width="1200"
                data-height=""
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
              >
                <blockquote
                  cite="https://www.facebook.com/profile.php?id=100057677932751"
                  className="fb-xfbml-parse-ignore"
                >
                  <a href="https://www.facebook.com/profile.php?id=100057677932751">
                    KTC รับสร้างบ้าน กรุงเทพและปริมณฑล
                  </a>
                </blockquote>
              </div>
            </div>
          </div>
        </section>


        {/* Contact Form Section */}
        <section className="w-full bg-white py-10 px-6 sm:px-10 lg:px-20">
          <h2 className="text-3xl font-bold mb-8 text-center">ติดต่อเรา / สอบถามข้อมูล</h2>
          <form onSubmit={handleSubmit} className="space-y-8 max-w-full">
            <div>
              <label htmlFor="name" className="block w-full text-left font-semibold mb-2">ชื่อ-นามสกุล</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="กรอกชื่อ-นามสกุลของคุณ"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block w-full text-left font-semibold mb-2">อีเมล</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="กรอกอีเมลของคุณ"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block w-full text-left font-semibold mb-2">เบอร์ติดต่อ</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="กรอกเบอร์โทรศัพท์"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="message" className="block w-full text-left font-semibold mb-2">รายละเอียด</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="รายละเอียดเพิ่มเติม"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <div className="flex justify-start mt-4">
              <button
                type="submit"
                className="bg-blue-700 text-white font-bold py-2 px-6 rounded hover:bg-blue-800 transition"
              >
                ส่งข้อความ
              </button>
            </div>
            {status && (
              <p className="mt-4 text-green-600 font-semibold">{status}</p>
            )}
          </form>
        </section>

      </main>
      <Footer />
    </>
  )
}
