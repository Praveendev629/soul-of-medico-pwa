import express from 'express'
import MCQ from '../models/MCQ'
import Performance from '../models/Performance'

const router = express.Router()

// Get daily MCQ
router.get('/daily', async (req, res) => {
  try {
    const randomMCQs = await MCQ.aggregate([
      { $sample: { size: 5 } },
    ])

    res.json(randomMCQs)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch MCQs' })
  }
})

// Submit MCQ answers
router.post('/submit', async (req, res) => {
  try {
    const { userId, answers } = req.body

    let correctCount = 0
    const results = []

    for (const answer of answers) {
      const mcq = await MCQ.findById(answer.mcqId)
      const isCorrect = mcq?.correctAnswer === answer.selected

      if (isCorrect) correctCount++

      results.push({
        mcqId: answer.mcqId,
        selected: answer.selected,
        correct: isCorrect,
        subject: mcq?.subject,
        topic: mcq?.topic,
      })
    }

    const accuracy = (correctCount / answers.length) * 100

    // Save to performance
    let performance = await Performance.findOne({ userId })
    if (!performance) {
      performance = new Performance({ userId })
    }

    performance.mcqAttempts.push(...results)
    performance.overallAccuracy = accuracy
    await performance.save()

    res.json({
      correctCount,
      totalQuestions: answers.length,
      accuracy,
      results,
    })
  } catch (error) {
    console.error('Error submitting MCQ:', error)
    res.status(500).json({ error: 'Failed to submit MCQ' })
  }
})

// Get MCQ history
router.get('/history/:userId', async (req, res) => {
  try {
    const performance = await Performance.findOne({ userId: req.params.userId })
    res.json(performance?.mcqAttempts || [])
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' })
  }
})

export default router
