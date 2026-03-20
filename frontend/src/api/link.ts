import type { Link, Stats, FilterState } from '../types';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function authHeaders(token: string) {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
}

export async function getLinksApi(
    token: string,
    filters: Partial<FilterState>
): Promise<Link[]> {
    const params = new URLSearchParams();
    if (filters.week && filters.week !== 'all') params.set('week', filters.week);
    if (filters.year && filters.year !== 'all') params.set('year', filters.year);
    if (filters.category && filters.category !== 'all') params.set('category', filters.category);
    if (filters.revisited && filters.revisited !== 'all') params.set('revisited', filters.revisited);

    const res = await fetch(`${API}/links?${params}`, {
        headers: authHeaders(token),
    });

    if (!res.ok) throw new Error('Failed to fetch links');
    return res.json();
}

export async function getWeeksApi(token: string): Promise<{ weekNumber: number; year: number }[]> {
    const res = await fetch(`${API}/links/weeks`, {
        headers: authHeaders(token),
    });

    if (!res.ok) throw new Error('Failed to fetch weeks');
    return res.json();
}

export async function getStatsApi(
    token: string,
    week?: string,
    year?: string
): Promise<Stats> {
    const params = new URLSearchParams();
    if (week && week !== 'all') params.set('week', week);
    if (year && year !== 'all') params.set('year', year);

    const res = await fetch(`${API}/links/stats?${params}`, {
        headers: authHeaders(token),
    });

    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
}

export async function saveLinkApi(
    token: string,
    data: {
        url: string;
        title?: string;
        category: string;
        customLabel?: string;
    }
): Promise<Link> {
    const res = await fetch(`${API}/links`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Failed to save link');
    return res.json();
}

export async function toggleRevisitedApi(
    token: string,
    id: string,
    revisited: boolean
): Promise<Link> {
    const res = await fetch(`${API}/links/${id}`, {
        method: 'PATCH',
        headers: authHeaders(token),
        body: JSON.stringify({ revisited }),
    });

    if (!res.ok) throw new Error('Failed to update link');
    return res.json();
}

export async function deleteLinkApi(token: string, id: string): Promise<void> {
    const res = await fetch(`${API}/links/${id}`, {
        method: 'DELETE',
        headers: authHeaders(token),
    });

    if (!res.ok) throw new Error('Failed to delete link');
}