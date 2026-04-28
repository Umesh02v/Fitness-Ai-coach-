import { useEffect, useState } from 'react'
import { metricsAPI } from '../services/api'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'

const MOODS = ['GREAT', 'GOOD', 'OKAY', 'TIRED', 'STRESSED']
const moodEmoji = { GREAT: '😄', GOOD: '🙂', OKAY: '😐', TIRED: '😴', STRESSED: '😰' }

export default function MetricsPage() {
  const [metrics, setMetrics] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ weight: '', heartRate: '', sleepHours: '', waterIntakeMl: '', stepsCount: '', caloriesConsumed: '', mood: 'GOOD', recordDate: new Date().toISOString().slice(0,10) })

  const load = () => metricsAPI.getAll().then(r => setMetrics(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await metricsAPI.save(form)
      toast.success('Metrics saved!')
      setShowForm(false)
      load()
    } catch { toast.error('Failed to save') }
  }

  const numField = (key, label, placeholder) => (
    <div>
      <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>{label}</label>
      <input type="number" value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})} placeholder={placeholder} />
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 4 }}>Health Metrics</h1>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>Daily tracking for better insights</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
          background: 'var(--accent)', color: '#0a0a0f', fontSize: 14
        }}>
          <Plus size={16} /> Log Today
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 28, marginBottom: 28 }}>
          <h3 style={{ marginBottom: 20, fontSize: 17 }}>Today's Metrics</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 14 }}>
              {numField('weight', 'Weight (kg)', '70.5')}
              {numField('heartRate', 'Resting HR (bpm)', '65')}
              {numField('sleepHours', 'Sleep (hours)', '8')}
              {numField('waterIntakeMl', 'Water (ml)', '2000')}
              {numField('stepsCount', 'Steps', '8000')}
              {numField('caloriesConsumed', 'Calories eaten', '2000')}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
              <div>
                <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Mood</label>
                <select value={form.mood} onChange={e => setForm({...form, mood: e.target.value})}>
                  {MOODS.map(m => <option key={m} value={m}>{moodEmoji[m]} {m}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Date</label>
                <input type="date" value={form.recordDate} onChange={e => setForm({...form, recordDate: e.target.value})} />
              </div>
            </div>
            <button type="submit" style={{ padding: '10px 24px', background: 'var(--accent)', color: '#0a0a0f', fontSize: 14 }}>
              Save Metrics
            </button>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {metrics.map(m => (
          <div key={m.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{m.recordDate}</span>
              <span style={{ fontSize: 18 }}>{moodEmoji[m.mood] || '—'}</span>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[['Weight', m.weight, 'kg'], ['HR', m.heartRate, 'bpm'], ['Sleep', m.sleepHours, 'h'],
                ['Water', m.waterIntakeMl, 'ml'], ['Steps', m.stepsCount, ''], ['Calories', m.caloriesConsumed, 'kcal']
              ].filter(([,v]) => v).map(([label, val, unit]) => (
                <div key={label}>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{label}</span>
                  <p style={{ fontWeight: 600, fontSize: 15 }}>{val}<span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 2 }}>{unit}</span></p>
                </div>
              ))}
            </div>
          </div>
        ))}
        {metrics.length === 0 && <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '48px 0' }}>No metrics logged yet. Start with today!</p>}
      </div>
    </div>
  )
}
