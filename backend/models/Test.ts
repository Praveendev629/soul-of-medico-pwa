import mongoose from 'mongoose'

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  totalQuestions: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
  },
  questions: [
    {
      question: String,
      subject: String,
      options: [String],
      correctAnswer: Number,
    },
  ],
  passingScore: {
    type: Number,
    default: 50,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Test', testSchema)
