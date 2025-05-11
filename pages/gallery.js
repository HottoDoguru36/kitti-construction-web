
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Gallery() {
  return (
    <>
      <Navbar />
      <main className="p-10 bg-white min-h-screen">
        <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center">แกลเลอรี่</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 aspect-square rounded shadow">รูปภาพ 1</div>
          <div className="bg-gray-100 aspect-square rounded shadow">รูปภาพ 2</div>
          <div className="bg-gray-100 aspect-square rounded shadow">รูปภาพ 3</div>
        </div>
      </main>
      <Footer />
    </>
  )
}
