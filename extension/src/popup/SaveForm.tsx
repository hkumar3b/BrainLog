import { useEffect, useState } from 'react'
import { Category, User } from '../types'

const API = 'http://localhost:3000'

interface Props {
    token: string
    user: User
    onLogout: () => void
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error'

const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
    { value: 'DSA', label: 'DSA Problem', emoji: '🧩' },
    { value: 'AI', label: 'AI / GPT', emoji: '🤖' },
    { value: 'BLOG', label: 'Blog', emoji: '📝' },
    { value: 'GENERAL', label: 'General', emoji: '✨' },
]

export default function SaveForm({ token, user, onLogout }: Props) {
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState<Category>('DSA')
    const [customLabel, setCustomLabel] = useState('')
    const [saveState, setSaveState] = useState<SaveState>('idle')
    const [error, setError] = useState('')

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0]
            if (tab?.url) setUrl(tab.url)
            if (tab?.title) setTitle(tab.title)
        })
    }, [])

    const handleSave = async () => {
        if (!url) return

        if (category === 'GENERAL' && !customLabel.trim()) {
            setError('Please enter a label for General category')
            return
        }

        setSaveState('saving')
        setError('')

        try {
            const res = await fetch(`${API}/links`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    url,
                    title,
                    category,
                    customLabel: category === 'GENERAL' ? customLabel : undefined,
                }),
            })

            if (!res.ok) throw new Error()

            setSaveState('saved')
            setTimeout(() => window.close(), 1500)
        } catch {
            setSaveState('error')
            setError('Failed to save. Try again.')
        }
    }

    if (saveState === 'saved') {
        return (
            <div style={s.centered}>
                <div style={s.successCircle}>✓</div>
                <p style={s.successText}>Saved successfully!</p>
                <p style={s.successSub}>Closing popup...</p>
            </div>
        )
    }

    return (
        <div>

            {/* Header */}
            <div style={s.header}>
                <div style={s.logo}>W</div>
                <div style={{ flex: 1 }}>
                    <div style={s.title}>Revision Tracker</div>
                    <div style={s.subtitle}>{user.email}</div>
                </div>
                <button style={s.logoutBtn} onClick={onLogout}>
                    Logout
                </button>
            </div>

            <div style={s.body}>

                {/* Current page preview */}
                <div style={s.preview}>
                    <div style={s.previewLabel}>Current page</div>
                    <div style={s.previewTitle}>{title || url}</div>
                    <div style={s.previewUrl}>{url}</div>
                </div>

                {/* Title override */}
                <div style={s.field}>
                    <label style={s.label}>Title</label>
                    <input
                        style={s.input}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Edit title if needed"
                    />
                </div>

                {/* Category picker */}
                <div style={s.field}>
                    <label style={s.label}>Category</label>
                    <div style={s.catGrid}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.value}
                                onClick={() => {
                                    setCategory(cat.value)
                                    setError('')
                                }}
                                style={{
                                    ...s.catBtn,
                                    ...(category === cat.value ? s.catBtnActive : {}),
                                }}
                            >
                                <span style={{ fontSize: '18px' }}>{cat.emoji}</span>
                                <span style={s.catLabel}>{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Custom label — only shown for GENERAL */}
                {category === 'GENERAL' && (
                    <div style={s.field}>
                        <label style={s.label}>Custom label</label>
                        <input
                            style={s.input}
                            value={customLabel}
                            onChange={e => setCustomLabel(e.target.value)}
                            placeholder="e.g. System Design, DevOps..."
                        />
                    </div>
                )}

                {/* Error */}
                {error && <div style={s.error}>{error}</div>}

                {/* Save button */}
                <button
                    style={{
                        ...s.saveBtn,
                        opacity: saveState === 'saving' ? 0.6 : 1,
                    }}
                    onClick={handleSave}
                    disabled={saveState === 'saving'}
                >
                    {saveState === 'saving' ? 'Saving...' : 'Save to Revision List'}
                </button>

            </div>
        </div>
    )
}

const s: Record<string, React.CSSProperties> = {
    header: {
        background: '#0e0e1a',
        padding: '14px 16px',
        borderBottom: '1px solid #1e1e2e',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    logo: {
        width: '32px', height: '32px',
        background: 'linear-gradient(135deg, #7c6af7, #a78bfa)',
        borderRadius: '8px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: '14px', color: 'white',
        flexShrink: 0,
    },
    title: { fontSize: '13px', fontWeight: 600, color: '#e8e6f0' },
    subtitle: { fontSize: '11px', color: '#555', marginTop: '1px' },
    logoutBtn: {
        padding: '4px 10px',
        background: 'transparent',
        border: '1px solid #2a2a40',
        borderRadius: '6px',
        color: '#555',
        fontSize: '11px',
        cursor: 'pointer',
        flexShrink: 0,
    },
    body: { padding: '16px' },
    preview: {
        background: '#0e0e1a',
        border: '1px solid #1e1e2e',
        borderRadius: '8px',
        padding: '10px 12px',
        marginBottom: '16px',
    },
    previewLabel: {
        fontSize: '10px',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.8px',
        color: '#444',
        marginBottom: '4px',
    },
    previewTitle: {
        fontSize: '12px',
        color: '#c0bedd',
        fontWeight: 500,
        whiteSpace: 'nowrap' as const,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    previewUrl: {
        fontSize: '11px',
        color: '#444',
        marginTop: '2px',
        whiteSpace: 'nowrap' as const,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    field: { marginBottom: '14px' },
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
        padding: '9px 12px',
        background: '#1a1a2e',
        border: '1px solid #2a2a40',
        borderRadius: '8px',
        color: '#e8e6f0',
        fontSize: '13px',
        outline: 'none',
        boxSizing: 'border-box' as const,
    },
    catGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
    },
    catBtn: {
        padding: '10px 8px',
        background: '#1a1a2e',
        border: '1.5px solid #2a2a40',
        borderRadius: '8px',
        color: '#666',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: '4px',
        transition: 'all 0.15s',
    },
    catBtnActive: {
        borderColor: '#7c6af7',
        background: 'rgba(124,106,247,0.15)',
        color: '#a78bfa',
    },
    catLabel: { fontSize: '11px', fontWeight: 500 },
    error: {
        background: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: '8px',
        padding: '8px 12px',
        fontSize: '12px',
        color: '#fca5a5',
        marginBottom: '12px',
    },
    saveBtn: {
        width: '100%',
        padding: '11px',
        background: 'linear-gradient(135deg, #7c6af7, #a78bfa)',
        border: 'none',
        borderRadius: '8px',
        color: 'white',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
    },
    centered: {
        width: '360px',
        height: '480px',
        background: '#0f0f13',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
    },
    successCircle: {
        width: '52px', height: '52px',
        background: 'rgba(34,197,94,0.15)',
        border: '2px solid #22c55e',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '22px', color: '#22c55e',
    },
    successText: { color: '#22c55e', fontSize: '15px', fontWeight: 600, margin: 0 },
    successSub: { color: '#444', fontSize: '12px', margin: 0 },
}