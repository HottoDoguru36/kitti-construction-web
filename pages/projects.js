
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Projects() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto p-10">
        <h1 className="text-3xl font-semibold mb-6">โครงการของเรา</h1>
        <ul className="space-y-4">
          <li className="p-4 bg-gray-100 rounded shadow">โครงการสะพานลอยฟ้า (2566)</li>
          <li className="p-4 bg-gray-100 rounded shadow">โครงการเขื่อนกันน้ำชายฝั่ง (2565)</li>
          <li className="p-4 bg-gray-100 rounded shadow">โครงการระบบระบายน้ำเมืองหลัก (2564)</li>
        </ul>
      </main>
      <Footer />
    </>
  )
}
