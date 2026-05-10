import Link from 'next/link'

const footerLinks = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
  { href: '/projects', label: 'บริการ' },
  { href: '/portfolios', label: 'ผลงาน' },
  { href: '/contact', label: 'ติดต่อเรา' },
]

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="Kitti Construction" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <div className="text-sm font-semibold tracking-[0.22em] text-amber-300">KITTI CONSTRUCTION</div>
                <div className="text-sm text-slate-300">รับเหมาก่อสร้างครบวงจร</div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
              ทีมงานมืออาชีพสำหรับงานก่อสร้าง ออกแบบ และควบคุมงานอย่างเป็นระบบ เพื่อผลงานที่สวยงามและส่งมอบตรงเวลา
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">ติดต่อเรา</h4>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <p>โทรศัพท์: 085-814-5434 (คุณสอง)</p>
              <p>อีเมล: kitticonstruction1624@gmail.com</p>
              <p>ที่อยู่: 2/2 พหลโยธิน 54/1 แยก 8-4</p>
              <p>แขวงคลองถนน เขตสายไหม กรุงเทพฯ 10220</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold">เมนูเว็บไซต์</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-amber-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Kitti Construction. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
