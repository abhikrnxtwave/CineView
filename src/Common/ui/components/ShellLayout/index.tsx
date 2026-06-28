import { observer } from 'mobx-react-lite'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../Auth/data/hooks/useAuth'
import { useCollection } from '../../../../Collection'
import { Navbar } from '../Navbar'

export const ShellLayout = observer(() => {
  const navigate = useNavigate()
  const { username, logout } = useAuth()
  const { totalCount } = useCollection()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 text-slate-900 dark:bg-[#0a0a0a] dark:text-white">
      <Navbar
        userDisplayName={username ?? 'User'}
        onLogout={handleLogout}
        watchlistCount={totalCount}
      />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  )
})