import { useState } from 'react'
import { useAuthStore } from '@/lib/store'
import BottomNav from './BottomNav'
import HomePage from './pages/HomePage'
import TestSeriesPage from './pages/TestSeriesPage'
import NotesPage from './pages/NotesPage'
import AIMentorPage from './pages/AIMentorPage'
import SupportPage from './pages/SupportPage'
import ProfileMenu from './ProfileMenu'

type TabType = 'test' | 'notes' | 'home' | 'ai' | 'support'

export default function MainApp() {
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const [showProfile, setShowProfile] = useState(false)
  const user = useAuthStore(state => state.user)

  const renderPage = () => {
    switch (activeTab) {
      case 'test':
        return <TestSeriesPage />
      case 'notes':
        return <NotesPage />
      case 'home':
        return <HomePage />
      case 'ai':
        return <AIMentorPage />
      case 'support':
        return <SupportPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Soul of Medico</h1>
          
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition"
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.displayName?.charAt(0) || 'U'}
                </div>
              )}
            </button>

            {showProfile && (
              <ProfileMenu
                onClose={() => setShowProfile(false)}
                user={user}
              />
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-4">
        {renderPage()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
