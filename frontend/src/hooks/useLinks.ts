import { useState, useEffect, useCallback } from 'react';
import type { Link, Stats, FilterState } from '../types';
import {
    getLinksApi,
    getWeeksApi,
    getStatsApi,
    toggleRevisitedApi,
    deleteLinkApi,
} from '../api/link';

export function useLinks(token: string | null) {
    const [links, setLinks] = useState<Link[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [weeks, setWeeks] = useState<{ weekNumber: number; year: number }[]>([]);
    const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchLinks = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getLinksApi(token, filters);
            setLinks(data);
        } catch {
            setError('Failed to load links. Is the backend running?');
        } finally {
            setLoading(false);
        }
    }, [token, filters]);

    const fetchStats = useCallback(async () => {
        if (!token) return;
        try {
            const data = await getStatsApi(token, filters.week, filters.year);
            setStats(data);
        } catch {
            setError('Failed to load stats');
        }
    }, [token, filters.week, filters.year]);

    const fetchWeeks = useCallback(async () => {
        if (!token) return;
        try {
            const data = await getWeeksApi(token);
            setWeeks(data);
        } catch { }
    }, [token]);

    useEffect(() => {
        fetchLinks();
        fetchStats();
    }, [fetchLinks, fetchStats]);

    useEffect(() => {
        fetchWeeks();
    }, [fetchWeeks]);

    const updateFilter = (key: keyof FilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => setFilters(DEFAULT_FILTERS);

    const toggleRevisited = async (id: string, revisited: boolean) => {
        if (!token) return;
        try {
            const updated = await toggleRevisitedApi(token, id, revisited);
            setLinks(prev =>
                prev.map(l => l.id === id ? updated : l)
            );
            fetchStats();
        } catch {
            setError('Failed to update link');
        }
    };

    const deleteLink = async (id: string) => {
        if (!token) return;
        try {
            await deleteLinkApi(token, id);
            setLinks(prev => prev.filter(l => l.id !== id));
            fetchStats();
        } catch {
            setError('Failed to delete link');
        }
    };

    return {
        links,
        stats,
        weeks,
        filters,
        loading,
        error,
        updateFilter,
        resetFilters,
        toggleRevisited,
        deleteLink,
        refetch: fetchLinks,
    };
}

const DEFAULT_FILTERS: FilterState = {
    week: 'all',
    year: 'all',
    category: 'all',
    revisited: 'all',
};
