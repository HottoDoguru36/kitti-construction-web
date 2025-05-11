
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="text-center p-10">
        <h1 className="text-4xl font-bold mb-4 text-blue-800">Kitti Construction</h1>
        <p className="text-gray-600 mb-6">
          One Stop Service House Builder
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <Image src="/images/project1.jpg" alt="Project 1" width={400} height={300} />
          <Image src="/images/project2.jpg" alt="Project 2" width={400} height={300} />
          <Image src="/images/project3.jpg" alt="Project 3" width={400} height={300} />
        </div>
      </main>
      <Footer />
    </>
  )
}
