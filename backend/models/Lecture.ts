import mongoose from 'mongoose'

const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    enum: ['Biology', 'Chemistry', 'Physics'],
    required: true,
  },
  youtubeId: {
    type: String,
    required: true,
  },
  thumbnail: String,
  description: String,
  duration: Number,
  topic: String,
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
  downloadUrl: String,
})

export default mongoose.model('Lecture', lectureSchema)
