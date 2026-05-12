import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { initializeFirebase, onAuthStateChanged } from '../lib/firebase'
import { useAuthStore } from '../lib/store'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true)
  const setUser = useAuthStore(state => state.setUser)

  useEffect(() => {
    initializeFirebase()
    
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [setUser])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-secondary"></div>
      </div>
    )
  }

  return <Component {...pageProps} />
}
