import '../styles/globals.css'
import 'aos/dist/aos.css'
import Router from 'next/router'
import AOS from 'aos'
import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import PageLoader from '../components/PageLoader'

const MIN_LOADER_MS = 500
const FALLBACK_LOADER_MS = 1200

function MyApp({ Component, pageProps }) {
  const [pageKey, setPageKey] = useState('')
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    const start = Date.now()
    let settled = false

    const hideLoader = () => {
      if (settled) return
      settled = true
      const elapsed = Date.now() - start
      setTimeout(() => setInitialLoading(false), Math.max(0, MIN_LOADER_MS - elapsed))
    }

    if (document.readyState === 'complete') {
      hideLoader()
    } else {
      window.addEventListener('load', hideLoader)
    }
    const fallback = setTimeout(hideLoader, FALLBACK_LOADER_MS)

    return () => {
      window.removeEventListener('load', hideLoader)
      clearTimeout(fallback)
    }
  }, [])

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
      <PageLoader visible={initialLoading} />
      <div key={pageKey} className="flex min-h-screen flex-col animate-fade-in">
        <Component {...pageProps} />
      </div>
      <Analytics />
    </>
  )
}

export default MyApp
