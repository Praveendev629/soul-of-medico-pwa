import { FiBookOpen, FiBook, FiHome, FiZap, FiHelpCircle } from 'react-icons/fi'

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: any) => void
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'test', label: 'Test', icon: FiBookOpen },
    { id: 'notes', label: 'Notes', icon: FiBook },
    { id: 'home', label: 'Home', icon: FiHome },
    { id: 'ai', label: 'AI', icon: FiZap },
    { id: 'support', label: 'Support', icon: FiHelpCircle },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-4 transition-all duration-300 ${
                isActive
                  ? 'text-primary border-t-4 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
