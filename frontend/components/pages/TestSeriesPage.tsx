import { useEffect, useState } from 'react'
import { getTestSeries } from '@/lib/api'
import { FiBarChart3, FiClock } from 'react-icons/fi'

interface Test {
  _id: string
  title: string
  description: string
  duration: number
  totalQuestions: number
  difficulty: 'easy' | 'medium' | 'hard'
}

export default function TestSeriesPage() {
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await getTestSeries()
        setTests(response.data)
      } catch (error) {
        console.error('Failed to fetch tests:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTests()
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700'
      case 'hard':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Test Series</h1>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-200 h-32 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {tests.length === 0 ? (
            <div className="text-center py-12">
              <FiBarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No tests available yet</p>
            </div>
          ) : (
            tests.map(test => (
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

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <FiClock className="w-4 h-4" />
                    {test.duration} mins
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <FiBarChart3 className="w-4 h-4" />
                    {test.totalQuestions} questions
                  </div>
                </div>

                <button className="w-full mt-4 bg-primary text-white py-2 rounded font-medium hover:opacity-90 transition">
                  Start Test
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
