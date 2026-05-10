import fs from 'fs'
import path from 'path'

function toISODate(date) {
  if (!(date instanceof Date)) return null
  return date.toISOString().slice(0, 10)
}

function escapeXml(value) {
  const s = String(value)
  const amp = String.fromCharCode(38)
  return s
    .replace(/&/g, `${amp}amp;`)
    .replace(/</g, `${amp}lt;`)
    .replace(/>/g, `${amp}gt;`)
    .replace(/"/g, `${amp}quot;`)
    .replace(/'/g, `${amp}apos;`)
}

function getSiteUrl() {
  const env = process.env.NEXT_PUBLIC_SITE_URL
  if (env) return String(env).replace(/\/+$/, '')
  return 'https://kitticonstruction.com'
}

function readPortfolioProjects() {
  const basePath = path.join(process.cwd(), 'public', 'images', 'portfolios')
  if (!fs.existsSync(basePath)) return []

  const items = fs
    .readdirSync(basePath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const dirPath = path.join(basePath, d.name)
      let lastMod = null
      try {
        const stat = fs.statSync(dirPath)
        lastMod = stat?.mtime ? new Date(stat.mtime) : null
      } catch {
        lastMod = null
      }

      return {
        name: d.name,
        lastMod,
      }
    })

  return items
}

export async function getServerSideProps({ res }) {
  const siteUrl = getSiteUrl()

  const staticRoutes = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/about', changefreq: 'weekly', priority: '0.7' },
    { path: '/services', changefreq: 'weekly', priority: '0.7' },
    { path: '/projects', changefreq: 'weekly', priority: '0.7' },
    { path: '/portfolios', changefreq: 'weekly', priority: '0.7' },
    { path: '/contact', changefreq: 'weekly', priority: '0.8' },
  ]

  const projects = readPortfolioProjects()

  const urlItems = [
    ...staticRoutes.map((r) => {
      const loc = `${siteUrl}${r.path}`
      return { loc, lastMod: null, changefreq: r.changefreq, priority: r.priority }
    }),
    ...projects.map((p) => {
      const loc = `${siteUrl}/portfolios/${encodeURIComponent(p.name)}`
      return { loc, lastMod: p.lastMod, changefreq: 'weekly', priority: '0.6' }
    }),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlItems
  .map((u) => {
    const lastmod = u.lastMod ? `<lastmod>${escapeXml(toISODate(u.lastMod))}</lastmod>` : ''
    return `<url><loc>${escapeXml(u.loc)}</loc>${lastmod}<changefreq>${escapeXml(
      u.changefreq
    )}</changefreq><priority>${escapeXml(u.priority)}</priority></url>`
  })
  .join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.write(xml)
  res.end()

  return { props: {} }
}

export default function Sitemap() {
  // Render nothing; response is written in getServerSideProps.
  return null
}
