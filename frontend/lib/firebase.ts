import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app = null

export const initializeFirebase = () => {
  if (!app && firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig)
  }
  return app
}

export const getFirebaseAuth = () => {
  const app = initializeFirebase()
  if (!app) throw new Error('Firebase not initialized')
  return getAuth(app)
}

export const loginWithGoogle = async () => {
  try {
    const auth = getFirebaseAuth()
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (error) {
    console.error('Firebase login error:', error)
    throw error
  }
}

export const signOut = async () => {
  try {
    const auth = getFirebaseAuth()
    return firebaseSignOut(auth)
  } catch (error) {
    console.error('Firebase signout error:', error)
    throw error
  }
}

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  try {
    const auth = getFirebaseAuth()
    return firebaseOnAuthStateChanged(auth, callback)
  } catch (error) {
    console.error('Auth state change error:', error)
    return () => {}
  }
}
