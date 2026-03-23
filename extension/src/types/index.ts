export type Category = 'DSA' | 'AI' | 'BLOG' | 'GENERAL';

export interface User {
    id: string;
    email: string;
    name?: string;
}

export interface AuthResponse {
    access_token: string;
    user: User;
}

export interface SaveLinkPayload {
    url: string;
    title: string;
    category: Category;
    customLabel?: string;
}