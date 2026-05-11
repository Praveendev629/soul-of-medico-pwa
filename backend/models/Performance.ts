import mongoose from 'mongoose'

const performanceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  mcqAttempts: [
    {
      mcqId: mongoose.Schema.Types.ObjectId,
      selected: Number,
      correct: Boolean,
      subject: String,
      topic: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  testResults: [
    {
      testId: mongoose.Schema.Types.ObjectId,
      score: Number,
      totalQuestions: Number,
      accuracy: Number,
      timeTaken: Number,
      subjectWiseScore: Object,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  weakTopics: [String],
  strongTopics: [String],
  studyStreak: {
    type: Number,
    default: 0,
  },
  lastActive: Date,
  overallAccuracy: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Performance', performanceSchema)
