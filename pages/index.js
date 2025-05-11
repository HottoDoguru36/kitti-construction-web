
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="text-center p-10 bg-white min-h-screen">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Kitti Construction</h1>
        <p className="text-gray-600">One Stop Service House Builder</p>
      </main>
      <Footer />
    </>
  )
}
