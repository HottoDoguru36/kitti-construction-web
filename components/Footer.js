export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-6">
        
        {/* โลโก้ ซ้ายสุด */}
        <div className="flex items-center space-x-4">
          <img src="/images/logo.png" alt="KTC Logo" className="h-40 w-auto" />
        </div>

        {/* Contact ตรงกลาง */}
        <div className="flex flex-col items-start space-y-1">
          <h4 className="font-semibold text-lg">Contact Us</h4>
          <p><span className="font-semibold">โทรศัพท์:</span> 085-814-5434 (คุณสอง)</p>
          <p><span className="font-semibold">อีเมล:</span> ktc@hotmail.com</p>
          <p><span className="font-semibold">ที่อยู่:</span> 2/2 พหลโยธิน 54/1 เเยก 8-4</p>
          <p>เเขวง คลองถนน เขต สายไหม กรุงเทพ 10220 </p>
        </div>

        {/* Sitemap ขวาสุด */}
        <div className="text-right">
          <h4 className="font-semibold text-lg mb-2">Sitemap</h4>
          <ul>
            <li><a href="/" className="hover:underline">หน้าแรก</a></li>
            <li><a href="/services" className="hover:underline">บริการของเรา</a></li>
            <li><a href="/contact" className="hover:underline">ติดต่อเรา</a></li>
            <li><a href="/sitemap" className="hover:underline">แผนผังเว็บไซต์</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} KTC Construction. All Rights Reserved.
      </div>
    </footer>
  )
}
