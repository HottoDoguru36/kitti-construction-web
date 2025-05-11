
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto p-10 bg-white min-h-screen">
        <h1 className="text-3xl font-semibold text-blue-800 mb-4">เกี่ยวกับเรา</h1>
        <p className="text-gray-700">
          รับเหมาออกเเบบบ้านเเบบมืออาชีพอย่างครบวงจร
        </p>
      </main>
      <Footer />
    </>
  )
}
