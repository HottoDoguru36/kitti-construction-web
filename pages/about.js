
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto p-10">
        <h1 className="text-3xl font-semibold mb-4">เกี่ยวกับเรา</h1>
        <p className="text-gray-700">
          บริษัทของเราก่อตั้งขึ้นในปี 2000 โดยมุ่งเน้นให้บริการด้านวิศวกรรมและโครงสร้างพื้นฐาน
          โดยมีทีมงานผู้เชี่ยวชาญพร้อมให้บริการในทุกโครงการ
        </p>
      </main>
      <Footer />
    </>
  )
}
