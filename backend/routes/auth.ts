import express from 'express'
import User from '../models/User'

const router = express.Router()

// Save user
router.post('/save-user', async (req, res) => {
  try {
    const { uid, email, displayName, photoURL } = req.body

    let user = await User.findOne({ uid })

    if (!user) {
      user = new User({
        uid,
        email,
        displayName,
        photoURL,
        isFirstLogin: false,
      })
      await user.save()
    } else {
      user.isFirstLogin = false
      user.updatedAt = new Date()
      await user.save()
    }

    res.json({ success: true, user })
  } catch (error) {
    console.error('Error saving user:', error)
    res.status(500).json({ error: 'Failed to save user' })
  }
})

// Get user
router.get('/user/:uid', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

export default router
