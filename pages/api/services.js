import path from 'path'
import fs from 'fs'

const servicesRootDir = path.join(process.cwd(), 'public', 'images', 'services')

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

let cached = null
let cachedAtMs = 0
const CACHE_TTL_MS = 60 * 1000

function isImageFile(fileName) {
  const ext = path.extname(fileName).toLowerCase()
  return IMAGE_EXTENSIONS.has(ext)
}

function toPublicUrlFromParts(parts) {
  // parts should be path segments (not starting with /)
  return '/' + parts.map((p) => encodeURIComponent(p)).join('/')
}

function getPublicUrlForRelativeToPublic(relToPublicParts) {
  // Example: ['images', 'services', 'Cozy Living (บ้านขนาดเล็ก)', 'cover.jpg']
  return toPublicUrlFromParts(relToPublicParts)
}

function normalizeSortedFileNames(names) {
  return names.slice().sort((a, b) => a.localeCompare(b, 'th'))
}

function safeDirentName(dirent) {
  return dirent?.name
}

async function buildServicesData() {
  // Root categories
  const rootEntries = await fs.promises.readdir(servicesRootDir, { withFileTypes: true })

  const categoryDirs = rootEntries.filter((d) => d.isDirectory()).map(safeDirentName)

  const categories = await Promise.all(
    categoryDirs.map(async (categoryFolderName) => {
      const categoryDirPath = path.join(servicesRootDir, categoryFolderName)

      const categoryEntries = await fs.promises.readdir(categoryDirPath, { withFileTypes: true })
      const categoryFiles = categoryEntries.filter((d) => d.isFile()).map(safeDirentName)

      const categoryCoverFile =
        categoryFiles.find((f) => f.toLowerCase() === 'cover.jpg') ||
        categoryFiles.find((f) => isImageFile(f))

      const categoryCover = categoryCoverFile
        ? getPublicUrlForRelativeToPublic(['images', 'services', categoryFolderName, categoryCoverFile])
        : null

      const projectDirs = categoryEntries.filter((d) => d.isDirectory()).map(safeDirentName)

      const items = await Promise.all(
        projectDirs.map(async (projectFolderName) => {
          const projectDirPath = path.join(categoryDirPath, projectFolderName)
          const projectEntries = await fs.promises.readdir(projectDirPath, { withFileTypes: true })

          const projectFiles = projectEntries.filter((d) => d.isFile()).map(safeDirentName)
          const projectImageFiles = normalizeSortedFileNames(projectFiles.filter((f) => isImageFile(f)))

          const coverFile =
            projectFiles.find((f) => f.toLowerCase() === 'cover.jpg') ||
            projectImageFiles.find((f) => f !== undefined)

          const cover = coverFile
            ? getPublicUrlForRelativeToPublic(['images', 'services', categoryFolderName, projectFolderName, coverFile])
            : null

          // Gallery images: include all images in this project folder (including cover.jpg)
          const images = projectImageFiles.map((fileName) =>
            getPublicUrlForRelativeToPublic([
              'images',
              'services',
              categoryFolderName,
              projectFolderName,
              fileName,
            ])
          )

          return {
            folder: projectFolderName,
            name: projectFolderName,
            cover,
            images,
          }
        })
      )

      return {
        folder: categoryFolderName,
        title: categoryFolderName,
        desc: '',
        cover: categoryCover,
        items,
      }
    })
  )

  // keep stable ordering
  categories.sort((a, b) => a.folder.localeCompare(b.folder, 'th'))

  return categories
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }

  try {
    const now = Date.now()
    if (cached && now - cachedAtMs < CACHE_TTL_MS) {
      res.status(200).json(cached)
      return
    }

    const categories = await buildServicesData()

    const payload = categories
    cached = payload
    cachedAtMs = now

    res.status(200).json(payload)
  } catch (error) {
    console.error('Failed to build services data:', error)
    res.status(500).json({ message: 'Failed to load services', error: String(error?.message || error) })
  }
}
