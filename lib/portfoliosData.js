import fs from 'fs'
import path from 'path'

const basePath = path.join(process.cwd(), 'public', 'images', 'portfolios')

export function getPortfolioList() {
  if (!fs.existsSync(basePath)) return []

  return fs
    .readdirSync(basePath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const folder = entry.name
      const coverPath = path.join(basePath, folder, 'cover.jpg')
      return {
        name: folder,
        cover: fs.existsSync(coverPath) ? `/images/portfolios/${folder}/cover.jpg` : null,
      }
    })
}

export function getPortfolioImages(project) {
  const resolvedDir = path.resolve(basePath, project)

  // Path traversal guard: resolvedDir must stay within basePath
  const baseWithSep = basePath.endsWith(path.sep) ? basePath : basePath + path.sep
  if (!resolvedDir.startsWith(baseWithSep)) return []

  if (!fs.existsSync(resolvedDir) || !fs.statSync(resolvedDir).isDirectory()) return []

  return fs
    .readdirSync(resolvedDir)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
}
