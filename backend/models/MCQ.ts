import mongoose from 'mongoose'

const mcqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    enum: ['Biology', 'Chemistry', 'Physics'],
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: Number,
    required: true,
  },
  explanation: String,
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
  },
  topic: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('MCQ', mcqSchema)
