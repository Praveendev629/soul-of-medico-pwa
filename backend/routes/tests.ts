import express from 'express'
import Test from '../models/Test'
import Performance from '../models/Performance'

const router = express.Router()

// Get all tests
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find().select('-questions')
    res.json(tests)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tests' })
  }
})

// Get test by ID
router.get('/:id', async (req, res) => {
  try {
    const test = await Test.findById(req.params.id)
    if (!test) {
      return res.status(404).json({ error: 'Test not found' })
    }
    res.json(test)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch test' })
  }
})

// Submit test
router.post('/submit', async (req, res) => {
  try {
    const { userId, testId, answers, timeTaken } = req.body

    const test = await Test.findById(testId)
    if (!test) {
      return res.status(404).json({ error: 'Test not found' })
    }

    let correctCount = 0
    const subjectWiseScore: Record<string, { correct: number; total: number }> = {}

    answers.forEach((answer: any) => {
      const question = test.questions[answer.questionIndex]
      const isCorrect = question.correctAnswer === answer.selected

      if (isCorrect) correctCount++

      const subject = question.subject || 'Unknown'
      if (!subjectWiseScore[subject]) {
        subjectWiseScore[subject] = { correct: 0, total: 0 }
      }

      subjectWiseScore[subject].total++
      if (isCorrect) {
        subjectWiseScore[subject].correct++
      }
    })

    const accuracy = (correctCount / test.totalQuestions) * 100
    const score = (correctCount / test.totalQuestions) * 100

    // Save to performance
    let performance = await Performance.findOne({ userId })
    if (!performance) {
      performance = new Performance({ userId })
    }

    performance.testResults.push({
      testId: test._id,
      score,
      totalQuestions: test.totalQuestions,
      accuracy,
      timeTaken,
      subjectWiseScore,
    } as any)

    await performance.save()

    res.json({
      score,
      accuracy,
      correctCount,
      totalQuestions: test.totalQuestions,
      subjectWiseScore,
    })
  } catch (error) {
    console.error('Error submitting test:', error)
    res.status(500).json({ error: 'Failed to submit test' })
  }
})

// Get test results
router.get('/results/:userId', async (req, res) => {
  try {
    const performance = await Performance.findOne({ userId: req.params.userId })
    res.json(performance?.testResults || [])
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch results' })
  }
})

export default router
