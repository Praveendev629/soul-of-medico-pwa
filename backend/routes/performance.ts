import express from 'express'
import Performance from '../models/Performance'
import User from '../models/User'

const router = express.Router()

// Get performance dashboard
router.get('/:userId', async (req, res) => {
  try {
    let performance = await Performance.findOne({ userId: req.params.userId })

    if (!performance) {
      performance = new Performance({ userId: req.params.userId })
      await performance.save()
    }

    const stats = {
      totalMCQsAttempted: performance.mcqAttempts.length,
      totalTestsTaken: performance.testResults.length,
      overallAccuracy: performance.overallAccuracy,
      studyStreak: performance.studyStreak,
      weakTopics: performance.weakTopics,
      strongTopics: performance.strongTopics,
      recentActivity: {
        mcqs: performance.mcqAttempts.slice(-10),
        tests: performance.testResults.slice(-5),
      },
    }

    res.json(stats)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch performance' })
  }
})

// Update study streak
router.post('/streak/:userId', async (req, res) => {
  try {
    let performance = await Performance.findOne({ userId: req.params.userId })

    if (!performance) {
      performance = new Performance({ userId: req.params.userId, studyStreak: 1 })
    } else {
      const lastActive = performance.lastActive
      const today = new Date()
      const lastActiveDate = lastActive ? new Date(lastActive) : null

      if (
        !lastActiveDate ||
        lastActiveDate.toDateString() !== today.toDateString()
      ) {
        // Check if last activity was yesterday
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        if (
          lastActiveDate &&
          lastActiveDate.toDateString() === yesterday.toDateString()
        ) {
          performance.studyStreak++
        } else {
          performance.studyStreak = 1
        }
      }
    }

    performance.lastActive = new Date()
    await performance.save()

    res.json({ studyStreak: performance.studyStreak })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update streak' })
  }
})

// Get weak topics
router.get('/weak-topics/:userId', async (req, res) => {
  try {
    const performance = await Performance.findOne({ userId: req.params.userId })

    // Analyze weak topics based on MCQ attempts
    if (!performance) {
      return res.json({ weakTopics: [] })
    }

    const topicAccuracy: Record<string, { correct: number; total: number }> = {}

    performance.mcqAttempts.forEach((attempt: any) => {
      const topic = attempt.topic || 'Unknown'
      if (!topicAccuracy[topic]) {
        topicAccuracy[topic] = { correct: 0, total: 0 }
      }

      topicAccuracy[topic].total++
      if (attempt.correct) {
        topicAccuracy[topic].correct++
      }
    })

    const weakTopics = Object.entries(topicAccuracy)
      .map(([topic, scores]) => ({
        topic,
        accuracy: (scores.correct / scores.total) * 100,
      }))
      .filter(t => t.accuracy < 50)
      .sort((a, b) => a.accuracy - b.accuracy)

    res.json(weakTopics)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weak topics' })
  }
})

export default router
