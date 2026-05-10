import '../styles/globals.css'
import '../styles/nprogress-custom.css'
import 'aos/dist/aos.css'
import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'
import AOS from 'aos'
import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'

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
      <div key={pageKey} className="flex min-h-screen flex-col animate-fade-in">
        <Component {...pageProps} />
      </div>
      <Analytics />
    </>
  )
}

export default MyApp
