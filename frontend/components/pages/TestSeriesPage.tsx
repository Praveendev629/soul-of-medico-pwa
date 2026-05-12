import { FiBarChart3 } from 'react-icons/fi'

const mockTests = [
  {
    _id: '1',
    title: 'Full Length Test 1',
    description: 'Complete NEET mock test',
    duration: 180,
    totalQuestions: 180,
    difficulty: 'medium',
  },
  {
    _id: '2',
    title: 'Biology Chapter Test',
    description: 'Focus on biology concepts',
    duration: 60,
    totalQuestions: 60,
    difficulty: 'easy',
  },
  {
    _id: '3',
    title: 'Advanced Test Series',
    description: 'Challenging questions',
    duration: 120,
    totalQuestions: 120,
    difficulty: 'hard',
  },
]

export default function TestSeriesPage() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Test Series</h1>

      <div className="space-y-3">
        {mockTests.map(test => (
          <div
            key={test._id}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-lg">{test.title}</h3>
                <p className="text-sm text-gray-600">{test.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(test.difficulty)}`}>
                {test.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
              <span>⏱️ {test.duration} mins</span>
              <span>📝 {test.totalQuestions} questions</span>
            </div>

            <button className="w-full mt-4 bg-primary text-white py-2 rounded font-medium hover:opacity-90 transition">
              Start Test
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
