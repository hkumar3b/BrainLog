import { useState } from 'react'
import { AuthResponse, User } from '../types'

const API = 'http://localhost:3000'

interface Props {
    onSuccess: (token: string, user: User) => void
}

export default function LoginForm({ onSuccess }: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields')
            return
        }

        setLoading(true)
        setError('')

        try {
            const res = await fetch(`${API}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            if (!res.ok) {
                const data = await res.json()
                setError(data.message || 'Invalid email or password')
                return
            }

            const data: AuthResponse = await res.json()
            onSuccess(data.access_token, data.user)
        } catch {
            setError('Cannot connect. Is the backend running?')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div style={s.header}>
                <div style={s.logo}>B</div>
                <div>
                    <div style={s.title}>BrainLog</div>
                    <div style={s.subtitle}>Sign in to save links</div>
                </div>
            </div>

            <div style={s.body}>
                <div style={s.field}>
                    <label style={s.label}>Email</label>
                    <input
                        style={s.input}
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div style={s.field}>
                    <label style={s.label}>Password</label>
                    <input
                        style={s.input}
                        type="password"
                        placeholder="••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    />
                </div>

                {error && <div style={s.error}>{error}</div>}

                <button
                    style={{ ...s.btn, opacity: loading ? 0.6 : 1 }}
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>

                <p style={s.hint}>
                    Use the same account as the dashboard
                </p>
            </div>
        </div>
    )
}

const s: Record<string, React.CSSProperties> = {
    header: {
        background: '#0e0e1a',
        padding: '18px 20px',
        borderBottom: '1px solid #1e1e2e',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    logo: {
        width: '38px', height: '38px',
        background: 'linear-gradient(135deg, #7c6af7, #a78bfa)',
        borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: '16px', color: 'white',
        flexShrink: 0,
    },
    title: { fontSize: '14px', fontWeight: 600, color: '#e8e6f0' },
    subtitle: { fontSize: '11px', color: '#555', marginTop: '2px' },
    body: { padding: '20px' },
    field: { marginBottom: '16px' },
    label: {
        display: 'block',
        fontSize: '11px',
        fontWeight: 600,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.8px',
        color: '#666',
        marginBottom: '6px',
    },
    input: {
        width: '100%',
        padding: '10px 12px',
        background: '#1a1a2e',
        border: '1px solid #2a2a40',
        borderRadius: '8px',
        color: '#e8e6f0',
        fontSize: '13px',
        outline: 'none',
        boxSizing: 'border-box' as const,
    },
    error: {
        background: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: '8px',
        padding: '10px 12px',
        fontSize: '12px',
        color: '#fca5a5',
        marginBottom: '16px',
    },
    btn: {
        width: '100%',
        padding: '11px',
        background: 'linear-gradient(135deg, #7c6af7, #a78bfa)',
        border: 'none',
        borderRadius: '8px',
        color: 'white',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        marginBottom: '12px',
    },
    hint: {
        textAlign: 'center' as const,
        fontSize: '11px',
        color: '#444',
        margin: 0,
    },
}