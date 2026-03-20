import type { AuthResponse } from '../types';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function registerApi(
    email: string,
    password: string,
    name?: string
): Promise<AuthResponse> {
    const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Registration failed');
    }

    return res.json();
}

export async function loginApi(
    email: string,
    password: string
): Promise<AuthResponse> {
    const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Login failed');
    }

    return res.json();
}
// ```

// `import.meta.env.VITE_API_URL` — Vite's way of reading environment variables. Create a `.env` file in the frontend folder:
// ```
// VITE_API_URL=http://localhost:3000
// ```

// And `.env.example`:
// ```
// VITE_API_URL=http://localhost:3000