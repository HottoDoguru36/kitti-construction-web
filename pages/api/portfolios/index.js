import { getPortfolioList } from '../../../lib/portfoliosData'

export default function handler(req, res) {
  try {
    res.status(200).json(getPortfolioList())
  } catch (err) {
    res.status(500).json([])
  }
}
