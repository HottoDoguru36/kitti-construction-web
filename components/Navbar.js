
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <div className="font-bold text-blue-700">TCC Engineering</div>
      <div className="space-x-4">
        <Link href="/">หน้าแรก</Link>
        <Link href="/about">เกี่ยวกับเรา</Link>
        <Link href="/projects">โครงการ</Link>
      </div>
    </nav>
  )
}
