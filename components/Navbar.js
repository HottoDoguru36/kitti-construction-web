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
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <img src="/images/logo.png" alt="Logo" className="w-16 h-16 md:w-20 md:h-20" />
          <span className="text-xl font-bold text-blue-900">Kitti Construction</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex-1 flex justify-center space-x-6 text-blue-800 font-semibold">
          <Link href="/">หน้าแรก</Link>
          <Link href="/about">เกี่ยวกับเรา</Link>
          <Link href="/portfolios">Portfolios</Link>
          <Link href="/projects">โครงการ</Link>
          <Link href="/contact">ติดต่อเรา</Link>
        </div>

        {/* Right: Facebook Logo */}
        <div className="ml-4">
          <a href="https://www.facebook.com/profile.php?id=100057677932751" target="_blank" rel="noopener noreferrer">
            <img src="/images/facebook-new.png" alt="Facebook Logo" className="w-8 h-8" />
          </a>
        </div>
      </div>
    </nav>
  )
}
