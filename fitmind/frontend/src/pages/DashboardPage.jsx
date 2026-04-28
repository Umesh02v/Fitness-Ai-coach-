import { useEffect, useState } from 'react'
import { workoutAPI, metricsAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Dumbbell, Flame, Moon, Heart } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const [workouts, setWorkouts] = useState([])
  const [metrics, setMetrics] = useState([])

  useEffect(() => {
    workoutAPI.getAll().then(r => setWorkouts(r.data)).catch(() => {})
    metricsAPI.getAll().then(r => setMetrics(r.data)).catch(() => {})
  }, [])

  const totalCalories = workouts.slice(0, 7).reduce((s, w) => s + (w.caloriesBurned || 0), 0)
  const avgSleep = metrics.length ? (metrics.slice(0, 7).reduce((s, m) => s + (m.sleepHours || 0), 0) / Math.min(7, metrics.length)).toFixed(1) : 0
  const latestWeight = metrics[0]?.weight || '—'
  const latestHR = metrics[0]?.heartRate || '—'

  const chartData = metrics.slice(0, 14).reverse().map(m => ({
    date: m.recordDate?.slice(5) || '',
    weight: m.weight,
    sleep: m.sleepHours,
    hr: m.heartRate
  }))

  const cards = [
    { icon: Flame, label: 'Calories Burned', value: totalCalories, unit: 'kcal / 7d', color: '#f97316' },
    { icon: Dumbbell, label: 'Workouts', value: workouts.slice(0, 7).length, unit: 'this week', color: 'var(--accent2)' },
    { icon: Moon, label: 'Avg Sleep', value: avgSleep, unit: 'hours / night', color: 'var(--accent)' },
    { icon: Heart, label: 'Resting HR', value: latestHR, unit: 'bpm', color: '#f87171' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 30, marginBottom: 4 }}>Good {getGreeting()}, {user?.name?.split(' ')[0]} 👋</h1>
        <p style={{ color: 'var(--muted)' }}>Here's your health overview</p>
      </div>

      {/* Stats cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
        {cards.map(({ icon: Icon, label, value, unit, color }) => (
          <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Icon size={16} color={color} />
              <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{label}</span>
            </div>
            <div style={{ fontSize: 28, fontFamily: 'var(--font-head)', fontWeight: 700 }}>{value}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{unit}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      {chartData.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <ChartCard title="Weight Trend" color="#6ee7b7" dataKey="weight" data={chartData} unit="kg" />
          <ChartCard title="Sleep Hours" color="#818cf8" dataKey="sleep" data={chartData} unit="hrs" />
        </div>
      )}

      {workouts.length === 0 && metrics.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
          <p style={{ fontSize: 18, marginBottom: 8 }}>No data yet</p>
          <p style={{ fontSize: 14 }}>Log a workout or today's health metrics to get started</p>
        </div>
      )}
    </div>
  )
}

function ChartCard({ title, color, dataKey, data, unit }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px 24px' }}>
      <h3 style={{ fontSize: 15, marginBottom: 20, fontWeight: 600 }}>{title}</h3>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data} margin={{ left: -20, right: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip contentStyle={{ background: '#1a1a26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 }}
            formatter={v => [`${v} ${unit}`, '']} />
          <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}
