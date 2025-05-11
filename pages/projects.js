
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Projects() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto p-10 bg-white min-h-screen">
        <h1 className="text-3xl font-semibold text-blue-800 mb-6">โครงการของเรา</h1>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded shadow">โครงการสะพานข้ามแม่น้ำ</div>
          <div className="p-4 bg-gray-100 rounded shadow">โครงการโรงงานพลังงานแสงอาทิตย์</div>
        </div>
      </main>
      <Footer />
    </>
  )
}
