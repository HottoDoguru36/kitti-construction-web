import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="th">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+Thai:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="font-noto">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
