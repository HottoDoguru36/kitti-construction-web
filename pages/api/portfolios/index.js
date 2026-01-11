import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const basePath = path.join(
    process.cwd(),
    'public',
    'images',
    'portfolios'
  )

  try {
    const projects = fs.readdirSync(basePath).map(folder => {
      const coverPath = path.join(basePath, folder, 'cover.jpg')

      return {
        name: folder,
        cover: fs.existsSync(coverPath)
          ? `/images/portfolios/${folder}/cover.jpg`
          : null
      }
    })

    res.status(200).json(projects)
  } catch (err) {
    res.status(500).json([])
  }
}
