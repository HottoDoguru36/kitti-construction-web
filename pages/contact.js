
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="max-w-xl mx-auto p-10 bg-white min-h-screen">
        <h1 className="text-3xl font-semibold text-blue-800 mb-4">ติดต่อเรา</h1>
        <form className="space-y-4">
          <input type="text" placeholder="ชื่อของคุณ" className="w-full p-2 border rounded" />
          <input type="email" placeholder="อีเมล" className="w-full p-2 border rounded" />
          <textarea placeholder="ข้อความ" className="w-full p-2 border rounded" rows="4" />
          <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded">ส่งข้อความ</button>
        </form>
      </main>
      <Footer />
    </>
  )
}
