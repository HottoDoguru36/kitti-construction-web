
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-blue-800 text-white p-4 flex justify-between">
      <div className="font-bold text-lg">Kitti Construction</div>
      <div className="space-x-4">
        <Link href="/">หน้าแรก</Link>
        <Link href="/about">เกี่ยวกับเรา</Link>
        <Link href="/projects">โครงการ</Link>
        <Link href="/gallery">แกลเลอรี่</Link>
        <Link href="/contact">ติดต่อเรา</Link>
      </div>
    </nav>
  )
}
