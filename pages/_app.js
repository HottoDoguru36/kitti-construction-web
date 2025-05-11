// pages/_app.js
import '../styles/globals.css' // โหลด CSS หลักของ Tailwind

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
