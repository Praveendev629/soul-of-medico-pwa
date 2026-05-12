import { useEffect, useState } from 'react'
import { FiTrendingUp, FiTarget, FiBook } from 'react-icons/fi'
import { getLectures, getPerformanceDashboard } from '../../lib/api'

interface HomePageProps {
  user: any
}

export default function HomePage({ user }: HomePageProps) {
  const [lectures, setLectures] = useState([])
  const [performance, setPerformance] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [user?.uid])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      const [lecturesRes, perfRes] = await Promise.all([
        getLectures().catch(() => ({ data: [] })),
        user?.uid ? getPerformanceDashboard(user.uid).catch(() => ({ data: null })) : Promise.resolve({ data: null })
      ])

      setLectures(lecturesRes.data?.slice(0, 3) || [])
      setPerformance(perfRes.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.displayName}!</h2>
        <p className="opacity-90">Your NEET Rank Starts Here - Let's study smart today</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <FiTrendingUp className="w-6 h-6 text-primary mb-2" />
          <p className="text-xs text-gray-600">Today's Accuracy</p>
          <p className="text-2xl font-bold text-primary">
            {performance?.overallAccuracy?.toFixed(1) || '--'}%
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <FiTarget className="w-6 h-6 text-secondary mb-2" />
          <p className="text-xs text-gray-600">Study Streak</p>
          <p className="text-2xl font-bold text-secondary">
            {performance?.studyStreak || 0} days
          </p>
        </div>
      </div>

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
        ) : lectures.length > 0 ? (
          <div className="space-y-3">
            {lectures.map(lecture => (
              <div key={lecture._id} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition">
                <div className="flex gap-3">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent flex-shrink-0 flex items-center justify-center text-white text-2xl">
                    🎥
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
        ) : (
          <div className="text-center py-8 text-gray-500">
            No lectures available yet
          </div>
        )}
      </div>

      <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
        <p className="font-semibold text-primary mb-2">Daily MCQ Challenge</p>
        <p className="text-sm text-gray-700 mb-3">Test your knowledge with today's questions</p>
        <button className="w-full bg-primary text-white py-2 rounded font-medium hover:opacity-90 transition">
          Start Quiz
        </button>
      </div>
    </div>
  )
}
