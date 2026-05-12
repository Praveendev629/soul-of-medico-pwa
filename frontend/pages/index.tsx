import { useRouter } from 'next/router'
import { useAuthStore } from '../lib/store'
import GetStarted from '../components/GetStarted'
import MainApp from '../components/MainApp'

export default function Home() {
  const router = useRouter()
  const user = useAuthStore(state => state.user)

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-secondary"></div>
      </div>
    )
  }

  if (!user) {
    return <GetStarted />
  }

  return <MainApp user={user} />
}
