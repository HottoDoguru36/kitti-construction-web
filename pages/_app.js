import '../styles/globals.css'
import '../styles/nprogress-custom.css'
import 'aos/dist/aos.css'
import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'
import AOS from 'aos'
import { useEffect, useState } from 'react'

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

const siteName = 'Kitti Construction'
const siteDescription =
  'บริษัทรับเหมาก่อสร้างครบวงจร บริการออกแบบ ก่อสร้าง ควบคุมงาน และส่งมอบงานคุณภาพสำหรับบ้านและอาคาร'

function MyApp({ Component, pageProps }) {
  const [pageKey, setPageKey] = useState('')

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])

  useEffect(() => {
    const handleRouteDone = () => {
      setPageKey(window.location.pathname)
      setTimeout(() => AOS.refreshHard(), 50)
    }

    handleRouteDone()
    Router.events.on('routeChangeComplete', handleRouteDone)
    return () => Router.events.off('routeChangeComplete', handleRouteDone)
  }, [])

  return (
    <>
      <Head>
        <title>{siteName}</title>
        <meta name="description" content={siteDescription} />
        <meta name="robots" content="index,follow" />
        <meta name="theme-color" content="#0f172a" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div key={pageKey} className="flex min-h-screen flex-col animate-fade-in">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
