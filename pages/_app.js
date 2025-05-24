// pages/_app.js
import '../styles/globals.css'
import '../styles/nprogress-custom.css'
import NProgress from 'nprogress'
import Router from 'next/router'



// ตั้งค่าถ้าต้องการ (ไม่บังคับ)
NProgress.configure({ showSpinner: false, speed: 400 })

// Event สำหรับเริ่มโหลด
Router.events.on('routeChangeStart', () => {
  NProgress.start()
})

// Event เมื่อโหลดเสร็จ
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})

// ถ้าเกิด error
Router.events.on('routeChangeError', () => {
  NProgress.done()
})

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
