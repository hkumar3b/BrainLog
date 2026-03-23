import { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import SaveForm from './SaveForm'
import { User } from '../types'

export default function Popup() {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        chrome.storage.local.get(['token', 'user'], (result: Record<string, any>) => {
            if (result['token']) {
                setToken(result['token'] as string)
                setUser(result['user'] as User)
            }
            setLoading(false)
        })
    }, [])

    const handleLoginSuccess = (newToken: string, newUser: User) => {
        chrome.storage.local.set({ token: newToken, user: newUser })
        setToken(newToken)
        setUser(newUser)
    }

    const handleLogout = () => {
        chrome.storage.local.remove(['token', 'user'])
        setToken(null)
        setUser(null)
    }

    if (loading) {
        return (
            <div style={s.centered}>
                <div style={s.spinner} />
            </div>
        )
    }

    return (
        <div style={s.root}>
            {token && user
                ? <SaveForm token={token} user={user} onLogout={handleLogout} />
                : <LoginForm onSuccess={handleLoginSuccess} />
            }
        </div>
    )
}

const s: Record<string, React.CSSProperties> = {
    root: {
        width: '360px',
        minHeight: '480px',
        background: '#0f0f13',
        color: '#e8e6f0',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        fontSize: '14px',
    },
    centered: {
        width: '360px',
        height: '480px',
        background: '#0f0f13',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    spinner: {
        width: '24px',
        height: '24px',
        border: '2px solid #2a2a40',
        borderTop: '2px solid #7c6af7',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
    },
}