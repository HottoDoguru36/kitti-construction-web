import { getServicesData } from '../../lib/servicesData'

let cached = null
let cachedAtMs = 0
const CACHE_TTL_MS = 60 * 1000

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

    const categories = await getServicesData()

    const payload = categories
    cached = payload
    cachedAtMs = now

    res.status(200).json(payload)
  } catch (error) {
    console.error('Failed to build services data:', error)
    res.status(500).json({ message: 'Failed to load services', error: String(error?.message || error) })
  }
}
