import Head from 'next/head'

const DEFAULT_SITE_NAME = 'Kitti Construction'
const DEFAULT_SITE_DESCRIPTION =
  'บริษัทรับเหมาก่อสร้างครบวงจร บริการออกแบบ ก่อสร้าง ควบคุมงาน และส่งมอบงานคุณภาพสำหรับบ้านและอาคาร'

function getSiteUrl() {
  const env =
    typeof process !== 'undefined' &&
    process?.env &&
    process.env.NEXT_PUBLIC_SITE_URL
      ? process.env.NEXT_PUBLIC_SITE_URL
      : undefined

  return env || 'https://kitticonstruction.com'
}

function buildAbsoluteUrl(pathname) {
  if (!pathname) return null
  const base = getSiteUrl().replace(/\/+$/, '')
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${base}${normalizedPath}`
}

export default function Seo({
  title,
  description = DEFAULT_SITE_DESCRIPTION,
  canonicalPathname,
  ogImage = '/images/logo.png',
  ogImageWidth = 1200,
  ogImageHeight = 630,
  schema = null,
  robots = 'index,follow',
  type = 'website',
}) {
  const siteName = DEFAULT_SITE_NAME
  const canonicalUrl = buildAbsoluteUrl(canonicalPathname || '/')
  const absoluteOgImage = buildAbsoluteUrl(ogImage) || ogImage
  const schemaList = Array.isArray(schema) ? schema.filter(Boolean) : schema ? [schema] : []

  const fullTitle = title ? `${title} | ${siteName}` : siteName

  return (
    <Head>
      <title key="title">{fullTitle}</title>

      <meta key="description" name="description" content={description} />
      <meta key="robots" name="robots" content={robots} />
      <meta key="theme-color" name="theme-color" content="#0f172a" />

      {canonicalUrl && (
        <link key="canonical" rel="canonical" href={canonicalUrl} />
      )}

      <meta key="og:site_name" property="og:site_name" content={siteName} />
      <meta key="og:type" property="og:type" content={type} />
      <meta key="og:locale" property="og:locale" content="th_TH" />
      <meta key="og:title" property="og:title" content={fullTitle} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      {canonicalUrl && <meta key="og:url" property="og:url" content={canonicalUrl} />}

      <meta key="og:image" property="og:image" content={absoluteOgImage} />
      <meta key="og:image:width" property="og:image:width" content={String(ogImageWidth)} />
      <meta key="og:image:height" property="og:image:height" content={String(ogImageHeight)} />
      <meta key="og:image:alt" property="og:image:alt" content={fullTitle} />

      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:title" name="twitter:title" content={fullTitle} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={description}
      />
      <meta key="twitter:image" name="twitter:image" content={absoluteOgImage} />

      {schemaList.map((item, i) => (
        <script
          key={`jsonld-${i}`}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}
    </Head>
  )
}
