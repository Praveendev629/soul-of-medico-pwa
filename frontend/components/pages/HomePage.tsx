import { FiTrendingUp, FiTarget, FiBook, FiPlay } from 'react-icons/fi'

interface HomePageProps {
  user: any
}

export default function HomePage({ user }: HomePageProps) {
  const mockLectures = [
    {
      _id: '1',
      title: 'Cell Structure & Functions',
      subject: 'Biology',
      thumbnail: '/icons/biology.png',
      uploadedAt: new Date().toISOString(),
    },
    {
      _id: '2',
      title: 'Photosynthesis Process',
      subject: 'Biology',
      thumbnail: '/icons/biology.png',
      uploadedAt: new Date().toISOString(),
    },
    {
      _id: '3',
      title: 'Atomic Structure',
      subject: 'Chemistry',
      thumbnail: '/icons/chemistry.png',
      uploadedAt: new Date().toISOString(),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
        <p className="opacity-90">Your NEET Rank Starts Here - Let's study smart today</p>
      </div>

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

      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <FiBook className="w-5 h-5" /> Recent Lectures
        </h3>
        
        <div className="space-y-3">
          {mockLectures.map(lecture => (
            <div key={lecture._id} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition">
              <div className="flex gap-3">
                <div className="w-24 h-24 bg-gray-300 flex-shrink-0 flex items-center justify-center text-3xl">
                  📚
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
