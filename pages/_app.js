// pages/_app.js
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
