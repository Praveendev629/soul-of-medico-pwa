import { useState } from 'react'
import { useRouter } from 'next/router'
import { FiBook, FiCheckCircle, FiZap } from 'react-icons/fi'
import { loginWithGoogle } from '../lib/firebase'
import { useAuthStore } from '../lib/store'
import { saveUser } from '../lib/api'

interface GetStartedProps {
  onLogin?: () => void
}

export default function GetStarted({ onLogin }: GetStartedProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const setUser = useAuthStore(state => state.setUser)

  const steps = [
    { icon: FiBook, title: 'Daily Lectures', description: 'Live lectures updated daily' },
    { icon: FiCheckCircle, title: 'Daily MCQs', description: 'Practice with curated questions' },
    { icon: FiZap, title: 'AI Mentor', description: 'Personalized guidance & feedback' },
  ]

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const firebaseUser = await loginWithGoogle()
      
      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        isFirstLogin: false,
        createdAt: new Date(),
      }

      try {
        await saveUser(userData)
      } catch (apiError) {
        console.warn('Could not save user to backend, continuing anyway...')
      }
      
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
      })
      
      if (onLogin) {
        onLogin()
      }
    } catch (err: any) {
      console.error('Login failed:', err)
      setError(err.message || 'Login failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary to-accent flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse"></div>

      <div className="relative z-10 text-center max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl animate-fadeIn border-4 border-secondary overflow-hidden">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-3 animate-slideUp">
          Your NEET Rank Starts Here
        </h1>
        
        <p className="text-secondary text-lg mb-12 animate-slideUp">
          Soul of Medico - Complete NEET Preparation
        </p>

        <div className="mb-12 space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className={`p-4 rounded-lg backdrop-blur-md transition-all duration-500 cursor-pointer ${
                  currentStep === index
                    ? 'bg-white bg-opacity-20 scale-105'
                    : 'bg-white bg-opacity-10 hover:bg-opacity-15'
                }`}
                onMouseEnter={() => setCurrentStep(index)}
              >
                <div className="flex items-center justify-center gap-3">
                  <Icon className="w-6 h-6 text-secondary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="text-sm text-secondary opacity-80">{step.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white text-primary font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-primary"></div>
              Signing in...
            </>
          ) : (
            <>
              <span>🔑</span>
              Continue with Google
            </>
          )}
        </button>

        <p className="text-white text-sm mt-6 opacity-70">
          Secure login with your Google account
        </p>
      </div>
    </div>
  )
}
