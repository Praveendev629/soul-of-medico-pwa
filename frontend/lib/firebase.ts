import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User
} from 'firebase/auth'
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app: ReturnType<typeof initializeApp> | null = null

export const initializeFirebase = () => {
  if (!app) {
    app = initializeApp(firebaseConfig)
  }
  return app
}

export const getFirebaseAuth = () => getAuth(initializeFirebase())

export const loginWithGoogle = async () => {
  const auth = getFirebaseAuth()
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  return result.user
}

export const signOut = async () => {
  const auth = getFirebaseAuth()
  return firebaseSignOut(auth)
}

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  const auth = getFirebaseAuth()
  return firebaseOnAuthStateChanged(auth, callback)
}

export const getNotificationToken = async () => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    return null
  }

  try {
    const messaging = getMessaging(initializeFirebase())
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
    })
    return token
  } catch (error) {
    console.error('Failed to get notification token:', error)
    return null
  }
}
