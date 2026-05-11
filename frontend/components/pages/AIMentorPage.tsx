import { useEffect, useState } from 'react'
import { FiZap } from 'react-icons/fi'

export default function AIMentorPage() {
  const [iframeReady, setIframeReady] = useState(false)

  useEffect(() => {
    // Check if iframe loads
    const timer = setTimeout(() => setIframeReady(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <FiZap className="w-6 h-6 text-primary" /> AI Mentor
      </h1>

      <div className="bg-blue-50 border border-primary rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-700">
          Your personalized AI mentor is available 24/7 to help you with concepts, doubts, and practice questions.
        </p>
      </div>

      {/* Embedded AI Chat Interface */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-96">
        {!iframeReady && (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mx-auto mb-3"></div>
              <p className="text-gray-600">Loading AI Mentor...</p>
            </div>
          </div>
        )}
        <iframe
          src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/ai-chat`}
          className="w-full h-full border-0"
          onLoad={() => setIframeReady(true)}
        ></iframe>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>Ask me anything about NEET preparation!</p>
      </div>
    </div>
  )
}
