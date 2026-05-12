import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  uid: string
  email: string
  displayName: string
  photoURL: string
}

interface AuthStore {
  user: User | null | undefined
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-store',
    }
  )
)

interface PerformanceData {
  userId: string
  totalMCQsAttempted: number
  totalTestsTaken: number
  overallAccuracy: number
  studyStreak: number
  weakTopics: string[]
}

interface PerformanceStore {
  performance: PerformanceData | null
  setPerformance: (data: PerformanceData) => void
  updateStreak: () => void
}

export const usePerformanceStore = create<PerformanceStore>()(
  persist(
    (set) => ({
      performance: null,
      setPerformance: (data) => set({ performance: data }),
      updateStreak: () => set((state) => {
        if (!state.performance) return state
        return {
          performance: {
            ...state.performance,
            studyStreak: state.performance.studyStreak + 1,
          }
        }
      }),
    }),
    {
      name: 'performance-store',
    }
  )
)
