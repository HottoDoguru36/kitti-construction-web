import fs from 'fs'
import path from 'path'

function isImageFile(file) {
  return /\.(jpg|jpeg|png|webp)$/i.test(file)
}

function toPublicPath(...segments) {
  return `/images/services/${segments.map(encodeURIComponent).join('/')}`
}

function readImageFiles(dirPath) {
  return fs
    .readdirSync(dirPath)
    .filter(isImageFile)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
}

function readLeafFolders(basePath, categoryFolder, folderSegments = []) {
  const currentPath = path.join(basePath, categoryFolder, ...folderSegments)
  const entries = fs.readdirSync(currentPath, { withFileTypes: true })
  const subfolders = entries.filter((entry) => entry.isDirectory())
  const directImages = readImageFiles(currentPath)
  const coverPath = path.join(currentPath, 'cover.jpg')
  const relativeSegments = [categoryFolder, ...folderSegments]

  if (subfolders.length === 0) {
    if (!directImages.length && !fs.existsSync(coverPath)) return []

    return [
      {
        name: folderSegments[folderSegments.length - 1],
        folder: folderSegments.join('/'),
        path: currentPath,
        cover: fs.existsSync(coverPath) ? toPublicPath(...relativeSegments, 'cover.jpg') : null,
        images: directImages.map((image) => toPublicPath(...relativeSegments, image)),
      },
    ]
  }

  const results = []

  if (directImages.length || fs.existsSync(coverPath)) {
    results.push({
      name: folderSegments[folderSegments.length - 1],
      folder: folderSegments.join('/'),
      path: currentPath,
      cover: fs.existsSync(coverPath) ? toPublicPath(...relativeSegments, 'cover.jpg') : null,
      images: directImages.map((image) => toPublicPath(...relativeSegments, image)),
    })
  }

  subfolders.forEach((entry) => {
    results.push(...readLeafFolders(basePath, categoryFolder, [...folderSegments, entry.name]))
  })

  return results
}

function readCategory(basePath, folder) {
  const categoryPath = path.join(basePath, folder)
  const coverPath = path.join(categoryPath, 'cover.jpg')

  const items = fs
    .readdirSync(categoryPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => readLeafFolders(basePath, folder, [entry.name]))
    .sort((a, b) => a.folder.localeCompare(b.folder, 'th', { numeric: true }))

  return {
    title: folder,
    folder,
    cover: fs.existsSync(coverPath) ? toPublicPath(folder, 'cover.jpg') : null,
    items,
  }
}

export default function handler(req, res) {
  const basePath = path.join(process.cwd(), 'public', 'images', 'services')

  try {
    if (!fs.existsSync(basePath)) {
      return res.status(200).json([])
    }

    const categories = fs
      .readdirSync(basePath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => readCategory(basePath, entry.name))
      .sort((a, b) => a.title.localeCompare(b.title, 'th', { numeric: true }))

    return res.status(200).json(categories)
  } catch (error) {
    return res.status(500).json([])
  }
}
