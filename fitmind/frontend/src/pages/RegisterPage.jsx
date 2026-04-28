import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const goals = ['WEIGHT_LOSS', 'MUSCLE_GAIN', 'ENDURANCE', 'MAINTENANCE']

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', age: '', height: '', weight: '', goal: 'MAINTENANCE' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await authAPI.register(form)
      login(data)
      toast.success('Account created!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally { setLoading(false) }
  }

  const field = (key, label, type = 'text', placeholder = '') => (
    <div>
      <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>{label}</label>
      <input type={type} value={form[key]} placeholder={placeholder}
        onChange={e => setForm({...form, [key]: e.target.value})} required={['name','email','password'].includes(key)} />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: 24 }}>
      <div style={{ width: 440, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '40px 36px' }}>
        <h1 style={{ fontSize: 28, marginBottom: 4, color: 'var(--accent)' }}>Get Started</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 28, fontSize: 14 }}>Create your FitMind account</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {field('name', 'Full Name', 'text', 'John Doe')}
          {field('email', 'Email', 'email', 'you@example.com')}
          {field('password', 'Password', 'password', '••••••••')}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Age</label>
              <input type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} placeholder="25" />
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Height (cm)</label>
              <input type="number" value={form.height} onChange={e => setForm({...form, height: e.target.value})} placeholder="175" />
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Weight (kg)</label>
              <input type="number" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} placeholder="70" />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Fitness Goal</label>
            <select value={form.goal} onChange={e => setForm({...form, goal: e.target.value})}>
              {goals.map(g => <option key={g} value={g}>{g.replace('_', ' ')}</option>)}
            </select>
          </div>
          <button type="submit" disabled={loading} style={{
            padding: '12px', background: 'var(--accent)', color: '#0a0a0f', fontSize: 15, marginTop: 4, opacity: loading ? 0.7 : 1
          }}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'var(--muted)' }}>
          Have an account? <Link to="/login" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
