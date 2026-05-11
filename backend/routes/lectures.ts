import express from 'express'
import Lecture from '../models/Lecture'

const router = express.Router()

// Get all lectures
router.get('/', async (req, res) => {
  try {
    const { subject } = req.query
    const filter = subject ? { subject } : {}

    const lectures = await Lecture.find(filter).sort({ uploadedAt: -1 })
    res.json(lectures)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lectures' })
  }
})

// Get lecture by ID
router.get('/:id', async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id)
    if (!lecture) {
      return res.status(404).json({ error: 'Lecture not found' })
    }

    // Increment view count
    lecture.views = (lecture.views || 0) + 1
    await lecture.save()

    res.json(lecture)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lecture' })
  }
})

export default router
