import { useEffect, useState } from 'react'
import Link from 'next/link'

const navItems = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
  { href: '/projects', label: 'บริการ' },
  { href: '/portfolios', label: 'ผลงาน' },
  { href: '/contact', label: 'ติดต่อเรา' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled ? 'border-slate-200 bg-white/95 shadow-lg backdrop-blur-md' : 'border-transparent bg-slate-950/80 backdrop-blur-md'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="relative flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-white/10 p-1 shadow-lg ring-2 ring-amber-400/70 sm:h-16 sm:w-16">
              <img src="/images/logo.png" alt="Kitti Construction" className="h-full w-full rounded-xl object-contain" />
            </div>
            <div className="min-w-0 leading-tight">
              <div className={`truncate text-sm font-semibold tracking-[0.18em] sm:text-base sm:tracking-[0.22em] ${scrolled ? 'text-slate-900' : 'text-white'}`}>KITTI CONSTRUCTION</div>
              <div className={`truncate text-xs sm:text-sm ${scrolled ? 'text-slate-600' : 'text-slate-200'}`}>รับเหมาก่อสร้างครบวงจร</div>
            </div>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${scrolled ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-950' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=100057677932751"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:scale-105 hover:bg-white/20"
              aria-label="Facebook"
            >
              <img src="/images/facebook-new.png" alt="" className="h-5 w-5" />
            </a>
            <Link href="/contact" className="hidden rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 sm:inline-flex">
              ขอใบเสนอราคา
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border md:hidden ${scrolled ? 'border-slate-200 bg-white text-slate-900' : 'border-white/15 bg-white/10 text-white'}`}
              aria-label="เปิดเมนู"
              aria-expanded={menuOpen}
            >
              <span className="flex flex-col gap-1">
                <span className="h-0.5 w-5 rounded bg-current" />
                <span className="h-0.5 w-5 rounded bg-current" />
                <span className="h-0.5 w-5 rounded bg-current" />
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="pb-4 md:hidden">
            <div className={`rounded-3xl border p-3 shadow-lg ${scrolled ? 'border-slate-200 bg-white' : 'border-white/10 bg-slate-950/95'}`}>
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${scrolled ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-950' : 'text-white hover:bg-white/10'}`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-1 inline-flex items-center justify-center rounded-2xl bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  ขอใบเสนอราคา
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
