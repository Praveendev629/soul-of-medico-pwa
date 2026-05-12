import { FiZap } from 'react-icons/fi'

export default function AIMentorPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <FiZap className="w-6 h-6 text-primary" /> AI Mentor
      </h1>

      <div className="bg-blue-50 border border-primary rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-700">
          Your personalized AI mentor is available 24/7 to help you with concepts and doubt clearing.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🤖</div>
          <p className="text-gray-600 font-semibold">AI Mentor Coming Soon</p>
          <p className="text-sm text-gray-500 mt-2">Ask me anything about NEET preparation!</p>
        </div>
      </div>
    </div>
  )
}
