import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: String,
  photoURL: String,
  isFirstLogin: {
    type: Boolean,
    default: true,
  },
  studyStreak: {
    type: Number,
    default: 0,
  },
  lastActivityDate: Date,
  totalMCQsAttempted: {
    type: Number,
    default: 0,
  },
  totalTestsTaken: {
    type: Number,
    default: 0,
  },
  avgAccuracy: {
    type: Number,
    default: 0,
  },
  preferences: {
    darkMode: { type: Boolean, default: false },
    notificationsEnabled: { type: Boolean, default: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('User', userSchema)
