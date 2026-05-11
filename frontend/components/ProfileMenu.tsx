import { useRouter } from 'next/router'
import { signOut } from '@/lib/firebase'
import { useAuthStore } from '@/lib/store'
import { FiLogOut, FiDownload, FiSettings } from 'react-icons/fi'
import { User } from '@/lib/store'

interface ProfileMenuProps {
  user: User | null
  onClose: () => void
}

export default function ProfileMenu({ user, onClose }: ProfileMenuProps) {
  const router = useRouter()
  const logout = useAuthStore(state => state.logout)

  const handleLogout = async () => {
    try {
      await signOut()
      logout()
      router.push('/')
      onClose()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50">
      {/* User Info */}
      <div className="bg-primary text-white p-4">
        <p className="font-semibold">{user?.displayName}</p>
        <p className="text-sm opacity-90">{user?.email}</p>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition">
          <FiSettings className="w-5 h-5" />
          Settings
        </button>
        
        <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition">
          <FiDownload className="w-5 h-5" />
          Downloads
        </button>

        <hr className="my-2" />

        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 text-red-600 transition"
        >
          <FiLogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  )
}
