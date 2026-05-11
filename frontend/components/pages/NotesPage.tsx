import { useState } from 'react'
import { FiBook } from 'react-icons/fi'

interface SubjectCard {
  id: string
  name: string
  color: string
  icon: string
}

export default function NotesPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const subjects: SubjectCard[] = [
    { id: 'biology', name: 'Biology', color: 'bg-green-100', icon: '🦠' },
    { id: 'chemistry', name: 'Chemistry', color: 'bg-blue-100', icon: '⚗️' },
    { id: 'physics', name: 'Physics', color: 'bg-purple-100', icon: '⚛️' },
  ]

  const lessons: Record<string, { title: string; sections: number }[]> = {
    biology: [
      { title: 'Cell Structure', sections: 5 },
      { title: 'Photosynthesis', sections: 4 },
      { title: 'Respiration', sections: 4 },
    ],
    chemistry: [
      { title: 'Atomic Structure', sections: 6 },
      { title: 'Bonding', sections: 5 },
      { title: 'Reactions', sections: 5 },
    ],
    physics: [
      { title: 'Mechanics', sections: 7 },
      { title: 'Thermodynamics', sections: 5 },
      { title: 'Waves', sections: 5 },
    ],
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Study Notes</h1>

      {!selectedSubject ? (
        <div className="grid grid-cols-1 gap-4">
          {subjects.map(subject => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
              className={`${subject.color} p-6 rounded-lg text-center hover:shadow-lg transition transform hover:scale-105`}
            >
              <div className="text-4xl mb-2">{subject.icon}</div>
              <h3 className="text-xl font-bold">{subject.name}</h3>
              <p className="text-sm opacity-75 mt-1">Comprehensive notes & papers</p>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedSubject(null)}
            className="mb-4 text-primary font-semibold hover:underline flex items-center gap-1"
          >
            <span>←</span> Back
          </button>

          <h2 className="text-xl font-bold mb-4">
            {subjects.find(s => s.id === selectedSubject)?.name} Lessons
          </h2>

          <div className="space-y-3">
            {lessons[selectedSubject]?.map((lesson, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-lg transition">
                <h3 className="font-bold text-lg mb-2">{lesson.title}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    <FiBook className="inline mr-1" /> {lesson.sections} sections
                  </p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-50 text-primary rounded text-sm font-medium hover:bg-blue-100 transition">
                      Notes
                    </button>
                    <button className="px-3 py-1 bg-green-50 text-green-600 rounded text-sm font-medium hover:bg-green-100 transition">
                      Papers
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
