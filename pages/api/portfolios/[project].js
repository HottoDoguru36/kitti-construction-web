import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const { project } = req.query

  try {
    const dir = path.join(
      process.cwd(),
      'public',
      'images',
      'portfolios',
      project
    )

    if (!fs.existsSync(dir)) {
      return res.status(404).json([])
    }

    const files = fs.readdirSync(dir)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

    res.status(200).json(files)
  } catch (err) {
    res.status(500).json([])
  }
}
