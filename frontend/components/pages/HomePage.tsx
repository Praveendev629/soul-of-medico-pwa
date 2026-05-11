import { useEffect, useState } from 'react'
import { getLectures } from '@/lib/api'
import { useAuthStore } from '@/lib/store'
import { FiTrendingUp, FiTarget, FiBook, FiPlay } from 'react-icons/fi'

interface Lecture {
  _id: string
  title: string
  subject: string
  youtubeId: string
  thumbnail: string
  uploadedAt: string
}

export default function HomePage() {
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [loading, setLoading] = useState(true)
  const user = useAuthStore(state => state.user)

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await getLectures()
        setLectures(response.data.slice(0, 3))
      } catch (error) {
        console.error('Failed to fetch lectures:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLectures()
  }, [])

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.displayName}!</h2>
        <p className="opacity-90">Your NEET Rank Starts Here - Let's study smart today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <FiTrendingUp className="w-6 h-6 text-primary mb-2" />
          <p className="text-xs text-gray-600">Today's Accuracy</p>
          <p className="text-2xl font-bold text-primary">--</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <FiTarget className="w-6 h-6 text-secondary mb-2" />
          <p className="text-xs text-gray-600">Study Streak</p>
          <p className="text-2xl font-bold text-secondary">0 days</p>
        </div>
      </div>

      {/* Recent Lectures */}
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FiBook className="w-5 h-5" /> Recent Lectures
        </h3>
        
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {lectures.map(lecture => (
              <div key={lecture._id} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition">
                <div className="flex gap-3">
                  <div className="w-24 h-24 bg-gray-300 flex-shrink-0 relative">
                    <img
                      src={lecture.thumbnail || '/placeholder.png'}
                      alt={lecture.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center hover:bg-opacity-50 transition">
                      <FiPlay className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 p-3">
                    <p className="text-sm font-bold text-primary">{lecture.subject}</p>
                    <p className="text-sm font-semibold">{lecture.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(lecture.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Daily MCQ Reminder */}
      <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
        <p className="font-semibold text-primary mb-2">Daily MCQ Challenge</p>
        <p className="text-sm text-gray-700 mb-3">Test your knowledge with today's curated questions</p>
        <button className="w-full bg-primary text-white py-2 rounded font-medium hover:opacity-90 transition">
          Start Quiz
        </button>
      </div>
    </div>
  )
}
