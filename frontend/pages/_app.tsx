import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useAuthStore } from '@/lib/store'
import { initializeFirebase, onAuthStateChanged } from '@/lib/firebase'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
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
    })

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err))
    }

    return () => unsubscribe()
  }, [setUser])

  return <Component {...pageProps} />
}

export default MyApp
