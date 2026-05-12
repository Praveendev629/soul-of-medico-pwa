import { useEffect, useState } from 'react'
import { getTestSeries, getTestById } from '../../lib/api'
import { FiAward } from 'react-icons/fi'

interface TestSeriesPageProps {
  userId: string
}

export default function TestSeriesPage({ userId }: TestSeriesPageProps) {
  const [tests, setTests] = useState([])
  const [selectedTest, setSelectedTest] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    fetchTests()
  }, [])

  const fetchTests = async () => {
    try {
      setLoading(true)
      const response = await getTestSeries().catch(() => ({ data: [] }))
      setTests(response.data || [])
    } catch (error) {
      console.error('Failed to fetch tests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectTest = async (testId: string) => {
    try {
      const response = await getTestById(testId).catch(() => ({ data: null }))
      setSelectedTest(response.data)
      setAnswers({})
    } catch (error) {
      console.error('Failed to fetch test:', error)
    }
  }

  const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
    setAnswers({
      ...answers,
      [questionIndex]: optionIndex
    })
  }

  const handleSubmitTest = async () => {
    if (!selectedTest) return
    
    setSubmitting(true)
    try {
      // Submit test logic here
      console.log('Submitting test with answers:', answers)
      alert('Test submitted successfully!')
      setSelectedTest(null)
    } catch (error) {
      console.error('Failed to submit test:', error)
      alert('Failed to submit test')
    } finally {
      setSubmitting(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700'
      case 'Medium': return 'bg-yellow-100 text-yellow-700'
      case 'Hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (selectedTest) {
    return (
      <div className="space-y-6">
        <div>
          <button
            onClick={() => setSelectedTest(null)}
            className="mb-4 text-primary font-semibold hover:underline"
          >
            ← Back to Tests
          </button>

          <h2 className="text-2xl font-bold mb-4">{selectedTest.title}</h2>
          <p className="text-gray-600 mb-6">{selectedTest.description}</p>

          <div className="space-y-6">
            {selectedTest.questions?.map((question, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="font-bold mb-4">Q{index + 1}. {question.question}</p>
                
                <div className="space-y-2">
                  {question.options?.map((option, optionIndex) => (
                    <label key={optionIndex} className="flex items-center p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={optionIndex}
                        checked={answers[index] === optionIndex}
                        onChange={() => handleAnswerChange(index, optionIndex)}
                        className="mr-3"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmitTest}
            disabled={submitting || Object.keys(answers).length === 0}
            className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Test'}
          </button>
        </div>
      </div>
    )
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
      ) : tests.length > 0 ? (
        <div className="space-y-3">
          {tests.map(test => (
            <div
              key={test._id}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-lg transition cursor-pointer"
              onClick={() => handleSelectTest(test._id)}
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
      ) : (
        <div className="text-center py-12">
          <FiAward className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No tests available yet</p>
        </div>
      )}
    </div>
  )
}
