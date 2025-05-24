import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-50 px-6 py-12 pt-20">
        <div className="max-w-7xl mx-auto space-y-16 pt-20">

          {/* เกี่ยวกับเรา */}
          <section data-aos="fade-up" className="mb-12">
            <h1 className="text-4xl font-bold text-blue-800 mb-6">เกี่ยวกับเรา</h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl">
              บริษัทของเรามุ่งมั่นในการสร้างบ้านและอาคารที่มีคุณภาพสูง โดยทีมงานมืออาชีพที่มีประสบการณ์ยาวนาน ทั้งด้านการออกแบบและก่อสร้างอย่างครบวงจร พร้อมใส่ใจในทุกรายละเอียด เพื่อให้ลูกค้าได้รับสิ่งที่ดีที่สุด
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
            <ul className="space-y-4 text-gray-700 text-lg list-disc list-inside">
              <li><span className="font-medium text-blue-800">ระดับ 1:</span> ราคา 1.xx - 3.xx ล้านบาท</li>
              <li><span className="font-medium text-blue-800">ระดับ 2:</span> ราคา 4.xx - 6.xx ล้านบาท</li>
              <li><span className="font-medium text-blue-800">ระดับ 3:</span> ราคา 7.xx ล้านบาทขึ้นไป</li>
            </ul>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
