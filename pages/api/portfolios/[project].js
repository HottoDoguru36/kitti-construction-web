import { getPortfolioImages } from '../../../lib/portfoliosData'

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 200

const requestTimesByIp = new Map()

function getClientKey(req) {
  const forwarded = req.headers['x-forwarded-for']
  const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]
  return ip || req.socket?.remoteAddress || 'unknown'
}

function isRateLimited(key) {
  const now = Date.now()
  const recent = requestTimesByIp.get(key) || []
  const filtered = recent.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)

  if (filtered.length >= MAX_REQUESTS_PER_WINDOW) {
    requestTimesByIp.set(key, filtered)
    return true
  }

  filtered.push(now)
  requestTimesByIp.set(key, filtered)
  return false
}

function normalizeProjectParam(value) {
  if (typeof value !== 'string') return ''
  // Disallow path separators & null bytes (prevents traversal payloads)
  const cleaned = value.replace(/\0/g, '')
  if (!cleaned || cleaned.length > 140) return ''
  if (cleaned.includes('/') || cleaned.includes('\\')) return ''
  return cleaned
}

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const project = normalizeProjectParam(req.query?.project)
  if (!project) {
    return res.status(400).json([])
  }

  const clientKey = getClientKey(req)
  if (isRateLimited(clientKey)) {
    return res.status(429).json({ message: 'Too many requests' })
  }

  try {
    const files = getPortfolioImages(project)
    if (!files.length) {
      return res.status(404).json([])
    }

    return res.status(200).json(files)
  } catch (err) {
    // Avoid leaking filesystem paths
    console.error('Failed to load portfolio images:', err)
    return res.status(500).json([])
  }
}
