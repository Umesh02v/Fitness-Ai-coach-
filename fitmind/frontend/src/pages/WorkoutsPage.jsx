import { useEffect, useState } from 'react'
import { workoutAPI } from '../services/api'
import toast from 'react-hot-toast'
import { Plus, Trash2, X } from 'lucide-react'

const TYPES = ['CARDIO', 'STRENGTH', 'YOGA', 'HIIT', 'SPORTS']
const INTENSITIES = ['LOW', 'MEDIUM', 'HIGH']

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ type: 'CARDIO', name: '', durationMins: '', caloriesBurned: '', intensity: 'MEDIUM', notes: '', workoutDate: new Date().toISOString().slice(0,10) })

  const load = () => workoutAPI.getAll().then(r => setWorkouts(r.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await workoutAPI.log(form)
      toast.success('Workout logged!')
      setShowForm(false)
      setForm({ type: 'CARDIO', name: '', durationMins: '', caloriesBurned: '', intensity: 'MEDIUM', notes: '', workoutDate: new Date().toISOString().slice(0,10) })
      load()
    } catch { toast.error('Failed to log workout') }
  }

  const handleDelete = async (id) => {
    try { await workoutAPI.delete(id); toast.success('Deleted'); load() }
    catch { toast.error('Failed to delete') }
  }

  const typeColors = { CARDIO: '#f97316', STRENGTH: '#818cf8', YOGA: '#6ee7b7', HIIT: '#f87171', SPORTS: '#fbbf24' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 4 }}>Workouts</h1>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>{workouts.length} sessions logged</p>
        </div>
        <button onClick={() => setShowForm(true)} style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
          background: 'var(--accent)', color: '#0a0a0f', fontSize: 14
        }}>
          <Plus size={16} /> Log Workout
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, width: 480 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 20 }}>Log Workout</h2>
              <button onClick={() => setShowForm(false)} style={{ background: 'transparent', color: 'var(--muted)', padding: 4 }}><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Type</label>
                  <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Intensity</label>
                  <select value={form.intensity} onChange={e => setForm({...form, intensity: e.target.value})}>
                    {INTENSITIES.map(i => <option key={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Workout Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Morning Run" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Duration (min)</label>
                  <input type="number" value={form.durationMins} onChange={e => setForm({...form, durationMins: e.target.value})} placeholder="30" />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Calories</label>
                  <input type="number" value={form.caloriesBurned} onChange={e => setForm({...form, caloriesBurned: e.target.value})} placeholder="250" />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Date</label>
                  <input type="date" value={form.workoutDate} onChange={e => setForm({...form, workoutDate: e.target.value})} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Notes</label>
                <textarea rows={2} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="How did it feel?" style={{ resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ padding: '11px', background: 'var(--accent)', color: '#0a0a0f', fontSize: 14, marginTop: 4 }}>
                Save Workout
              </button>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {workouts.map(w => (
          <div key={w.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: `${typeColors[w.type]}22`, color: typeColors[w.type] }}>{w.type}</span>
              <div>
                <p style={{ fontWeight: 600, fontSize: 15 }}>{w.name || w.type}</p>
                <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{w.workoutDate} · {w.durationMins} min · {w.caloriesBurned} kcal · {w.intensity}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(w.id)} style={{ background: 'transparent', color: 'var(--muted)', padding: 8, borderRadius: 6 }}>
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {workouts.length === 0 && <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '48px 0' }}>No workouts logged yet. Start tracking!</p>}
      </div>
    </div>
  )
}
