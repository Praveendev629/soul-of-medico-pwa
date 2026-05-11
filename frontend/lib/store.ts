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
  isFirstLogin: boolean
  setUser: (user: User | null) => void
  setFirstLogin: (value: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: undefined,
      isFirstLogin: true,
      setUser: (user) => set({ user, isFirstLogin: !user }),
      setFirstLogin: (value) => set({ isFirstLogin: value }),
      logout: () => set({ user: null, isFirstLogin: true }),
    }),
    {
      name: 'auth-store',
    }
  )
)

interface DownloadedContent {
  id: string
  type: 'video' | 'pdf'
  title: string
  path: string
  downloadedAt: number
}

interface DownloadStore {
  downloads: DownloadedContent[]
  addDownload: (content: DownloadedContent) => void
  removeDownload: (id: string) => void
  getDownloads: () => DownloadedContent[]
}

export const useDownloadStore = create<DownloadStore>()(
  persist(
    (set, get) => ({
      downloads: [],
      addDownload: (content) =>
        set((state) => ({
          downloads: [...state.downloads, content],
        })),
      removeDownload: (id) =>
        set((state) => ({
          downloads: state.downloads.filter((d) => d.id !== id),
        })),
      getDownloads: () => get().downloads,
    }),
    {
      name: 'download-store',
    }
  )
)
