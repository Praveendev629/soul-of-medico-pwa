import { FiLogOut, FiSettings } from 'react-icons/fi'

interface ProfileMenuProps {
  user: any
  onClose: () => void
}

export default function ProfileMenu({ user, onClose }: ProfileMenuProps) {
  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('isFirstLogin')
    window.location.reload()
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50">
      <div className="bg-primary text-white p-4">
        <p className="font-semibold">{user?.displayName || 'User'}</p>
        <p className="text-sm opacity-90">{user?.email || 'user@example.com'}</p>
      </div>

      <div className="py-2">
        <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition">
          <FiSettings className="w-5 h-5" />
          Settings
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
