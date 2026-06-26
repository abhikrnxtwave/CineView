import { Outlet, useNavigate } from 'react-router-dom'
import { Navbar } from '../Navbar'
import { useAuth } from '../../../../Auth/data/hooks/useAuth'

export const ShellLayout = () => {
  const navigate = useNavigate()
  const { username, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#0a0a0a] text-white">
      <Navbar userDisplayName={username ?? 'User'} onLogout={handleLogout} />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  )
}