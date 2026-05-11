import express from 'express'

const router = express.Router()

// Mock notes data
const notesData: Record<string, any[]> = {
  biology: [
    { id: 1, title: 'Cell Structure', sections: 5, pdfUrl: 'https://example.com' },
    { id: 2, title: 'Photosynthesis', sections: 4, pdfUrl: 'https://example.com' },
  ],
  chemistry: [
    { id: 1, title: 'Atomic Structure', sections: 6, pdfUrl: 'https://example.com' },
  ],
  physics: [
    { id: 1, title: 'Mechanics', sections: 7, pdfUrl: 'https://example.com' },
  ],
}

// Get notes by subject
router.get('/:subject', (req, res) => {
  const { subject } = req.params
  const notes = notesData[subject.toLowerCase()] || []
  res.json(notes)
})

// Get lesson notes
router.get('/:subject/:lesson', (req, res) => {
  const { subject, lesson } = req.params
  res.json({
    subject,
    lesson,
    lectureNotes: { url: 'https://example.com/notes.pdf' },
    questionPapers: { url: 'https://example.com/papers.pdf' },
  })
})

export default router
