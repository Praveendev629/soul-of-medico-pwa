import express from 'express'
import Lecture from '../models/Lecture'
import MCQ from '../models/MCQ'
import Test from '../models/Test'

const router = express.Router()

// Middleware to verify admin (simplified)
const verifyAdmin = (req: any, res: any, next: any) => {
  // In production, use proper JWT verification
  const adminKey = req.headers['x-admin-key']
  if (adminKey === process.env.ADMIN_KEY) {
    next()
  } else {
    res.status(403).json({ error: 'Unauthorized' })
  }
}

// Create/Update lecture
router.put('/lectures/:id', verifyAdmin, async (req, res) => {
  try {
    const { title, subject, youtubeId, description, topic } = req.body

    let lecture = await Lecture.findById(req.params.id)

    if (!lecture) {
      lecture = new Lecture({ title, subject, youtubeId, description, topic })
    } else {
      if (title) lecture.title = title
      if (subject) lecture.subject = subject
      if (youtubeId) lecture.youtubeId = youtubeId
      if (description) lecture.description = description
      if (topic) lecture.topic = topic
    }

    await lecture.save()
    res.json({ success: true, lecture })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lecture' })
  }
})

// Create MCQ
router.post('/mcq', verifyAdmin, async (req, res) => {
  try {
    const { question, subject, options, correctAnswer, explanation, difficulty, topic } = req.body

    const mcq = new MCQ({
      question,
      subject,
      options,
      correctAnswer,
      explanation,
      difficulty,
      topic,
    })

    await mcq.save()
    res.json({ success: true, mcq })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create MCQ' })
  }
})

// Create test
router.post('/tests', verifyAdmin, async (req, res) => {
  try {
    const { title, description, totalQuestions, duration, difficulty, questions } = req.body

    const test = new Test({
      title,
      description,
      totalQuestions,
      duration,
      difficulty,
      questions,
    })

    await test.save()
    res.json({ success: true, test })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create test' })
  }
})

export default router
