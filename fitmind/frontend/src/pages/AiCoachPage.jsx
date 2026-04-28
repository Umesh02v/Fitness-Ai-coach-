import { useEffect, useRef, useState } from 'react'
import { aiAPI } from '../services/api'
import { Send, Bot, User, Sparkles } from 'lucide-react'

const suggestions = [
  'Analyze my recent workouts and give feedback',
  'What should I eat before a morning run?',
  'Create a 4-week strength training plan for me',
  'Why am I feeling tired after workouts?',
]

export default function AiCoachPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(true)
  const bottomRef = useRef(null)

  useEffect(() => {
    aiAPI.getHistory().then(r => {
      setMessages(r.data.map(m => ({ role: m.role.toLowerCase(), content: m.content })))
    }).catch(() => {}).finally(() => setLoadingHistory(false))
  }, [])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)
    try {
      const { data } = await aiAPI.chat(msg)
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally { setLoading(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Sparkles size={24} color="var(--accent)" /> AI Coach
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>Personalized advice based on your data</p>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 24 }}>
        {!loadingHistory && messages.length === 0 && (
          <div style={{ padding: '32px 0' }}>
            <p style={{ color: 'var(--muted)', marginBottom: 20, fontSize: 14 }}>Try asking:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)} style={{
                  textAlign: 'left', padding: '12px 16px', background: 'var(--surface)',
                  border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)',
                  fontSize: 14, maxWidth: 480
                }}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: m.role === 'user' ? 'var(--accent2)' : 'rgba(110,231,183,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {m.role === 'user' ? <User size={15} /> : <Bot size={15} color="var(--accent)" />}
            </div>
            <div style={{
              maxWidth: '70%', padding: '12px 16px', borderRadius: 12,
              background: m.role === 'user' ? 'var(--accent2)' : 'var(--surface)',
              border: m.role === 'user' ? 'none' : '1px solid var(--border)',
              fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap'
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(110,231,183,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={15} color="var(--accent)" />
            </div>
            <div style={{ padding: '12px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', gap: 6, alignItems: 'center' }}>
              {[0,1,2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--muted)', display: 'block', animation: `bounce 1s ${i*0.2}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
            placeholder="Ask your AI coach anything..."
            style={{ flex: 1 }}
          />
          <button onClick={() => send()} disabled={loading || !input.trim()} style={{
            padding: '10px 16px', background: 'var(--accent)', color: '#0a0a0f',
            display: 'flex', alignItems: 'center', gap: 6, fontSize: 14,
            opacity: (loading || !input.trim()) ? 0.5 : 1
          }}>
            <Send size={15} /> Send
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
