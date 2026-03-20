export type Category = 'DSA' | 'AI' | 'BLOG' | 'GENERAL';

export interface User {
    id: string;
    email: string;
    name?: string;
    createdAt: string;
}

export interface Link {
    id: string;
    url: string;
    title?: string;
    category: Category;
    customLabel?: string;
    revisited: boolean;
    weekNumber: number;
    year: number;
    savedAt: string;
    revisitedAt?: string;
    userId: string;
}

export interface AuthResponse {
    access_token: string;
    user: User;
}

export interface Stats {
    weekNumber: number;
    year: number;
    total: number;
    done: number;
    pending: number;
    dsa: number;
    ai: number;
    blog: number;
    general: number;
}

export interface FilterState {
    week: string;
    year: string;
    category: Category | 'all';
    revisited: 'all' | 'true' | 'false';
}