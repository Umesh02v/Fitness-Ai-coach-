import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LayoutDashboard, Dumbbell, Activity, Bot, LogOut } from 'lucide-react'

const nav = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/workouts', icon: Dumbbell, label: 'Workouts' },
  { to: '/metrics', icon: Activity, label: 'Metrics' },
  { to: '/coach', icon: Bot, label: 'AI Coach' },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, background: 'var(--surface)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', padding: '24px 16px', position: 'fixed',
        height: '100vh', top: 0, left: 0
      }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 22, color: 'var(--accent)', letterSpacing: '-0.5px' }}>FitMind</h1>
          <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>AI Health Coach</p>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                borderRadius: 8, textDecoration: 'none', fontSize: 14, fontFamily: 'var(--font-head)',
                fontWeight: 600, color: isActive ? 'var(--accent)' : 'var(--muted)',
                background: isActive ? 'rgba(110,231,183,0.08)' : 'transparent',
                transition: 'all 0.2s'
              })}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{user?.name}</p>
          <p style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 12 }}>{user?.email}</p>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
            background: 'transparent', color: 'var(--muted)', fontSize: 13,
            borderRadius: 8, width: '100%'
          }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 220, flex: 1, padding: '32px 40px', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  )
}
