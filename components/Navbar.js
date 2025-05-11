// components/Navbar.js
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? 'bg-white/90 shadow-lg backdrop-blur-md' : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/images/logo.png" alt="Logo" className="w-20 h-20 md:w-24 md:h-24" /> 
          <span className="text-xl font-bold text-blue-900">Kitti Construction</span>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 text-blue-800 font-semibold hidden md:flex">
          <Link href="/">หน้าแรก</Link>
          <Link href="/about">เกี่ยวกับเรา</Link>
          <Link href="/projects">โครงการ</Link>
          <Link href="/gallery">แกลเลอรี่</Link>
          <Link href="/contact">ติดต่อเรา</Link>
        </div>
      </div>
    </nav>
  )
}
