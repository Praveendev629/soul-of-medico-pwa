import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import GetStarted from '../components/GetStarted'
import MainApp from '../components/MainApp'

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFirstLogin, setIsFirstLogin] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const stored = localStorage.getItem('user')
        if (stored) {
          const userData = JSON.parse(stored)
          setUser(userData)
          const firstLogin = localStorage.getItem('isFirstLogin')
          setIsFirstLogin(firstLogin === 'true')
        }
      } catch (error) {
        console.log('No user found')
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-secondary"></div>
      </div>
    )
  }

  if (!user || isFirstLogin) {
    return <GetStarted onLogin={(userData) => {
      setUser(userData)
      setIsFirstLogin(false)
    }} />
  }

  return <MainApp user={user} />
}
