// pages/_app.js
import '../styles/globals.css'
import '../styles/nprogress-custom.css'
import 'aos/dist/aos.css' // ✅ นำเข้า AOS CSS
import NProgress from 'nprogress'
import Router from 'next/router'
import AOS from 'aos'
import { useEffect } from 'react'

// ตั้งค่า NProgress
NProgress.configure({ showSpinner: false, speed: 400 })

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done()
})
Router.events.on('routeChangeError', () => {
  NProgress.done()
})

function MyApp({ Component, pageProps }) {
  // ✅ เรียก AOS เมื่อโหลด component
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
