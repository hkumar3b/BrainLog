import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginApi, registerApi } from '../api/auth';

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [tab, setTab] = useState<Tab>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = tab === 'login'
                ? await loginApi(email, password)
                : await registerApi(email, password, name);

            login(data.access_token, data.user);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="
      min-h-screen
      bg-gray-50 dark:bg-gray-950
      flex items-center justify-center
      p-4
    ">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="
            w-14 h-14 rounded-2xl mx-auto mb-4
            bg-gradient-to-br from-violet-500 to-violet-700
            flex items-center justify-center
            text-white font-bold text-2xl
            shadow-lg shadow-violet-500/25
          ">
                        B
                    </div>
                    <h1 className="
            text-2xl font-bold
            text-gray-900 dark:text-white
            tracking-tight
          ">
                        BrainLog
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Your weekly learning companion
                    </p>
                </div>

                {/* Card */}
                <div className="
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-800
          rounded-2xl p-8
          shadow-xl shadow-gray-200/50 dark:shadow-none
        ">

                    {/* Tabs */}
                    <div className="
            flex rounded-lg overflow-hidden
            bg-gray-100 dark:bg-gray-800
            p-1 mb-6
          ">
                        {(['login', 'register'] as Tab[]).map(t => (
                            <button
                                key={t}
                                onClick={() => { setTab(t); setError(''); }}
                                className={`
                  flex-1 py-2 text-sm font-medium rounded-md
                  transition-all duration-150 capitalize
                  ${tab === t
                                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }
                `}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* Fields */}
                    <div className="space-y-4">
                        {tab === 'register' && (
                            <div>
                                <label className="
                  block text-xs font-semibold uppercase
                  tracking-widest text-gray-400 dark:text-gray-500
                  mb-1.5
                ">
                                    Name (optional)
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Your name"
                                    className="
                    w-full px-4 py-2.5 rounded-lg text-sm
                    bg-gray-50 dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700
                    text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-600
                    outline-none
                    focus:border-violet-400 dark:focus:border-violet-600
                    transition-colors
                  "
                                />
                            </div>
                        )}

                        <div>
                            <label className="
                block text-xs font-semibold uppercase
                tracking-widest text-gray-400 dark:text-gray-500
                mb-1.5
              ">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="
                  w-full px-4 py-2.5 rounded-lg text-sm
                  bg-gray-50 dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700
                  text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-600
                  outline-none
                  focus:border-violet-400 dark:focus:border-violet-600
                  transition-colors
                "
                            />
                        </div>

                        <div>
                            <label className="
                block text-xs font-semibold uppercase
                tracking-widest text-gray-400 dark:text-gray-500
                mb-1.5
              ">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                                className="
                  w-full px-4 py-2.5 rounded-lg text-sm
                  bg-gray-50 dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700
                  text-gray-900 dark:text-white
                  placeholder-gray-400 dark:placeholder-gray-600
                  outline-none
                  focus:border-violet-400 dark:focus:border-violet-600
                  transition-colors
                "
                            />
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="
              mt-4 px-4 py-3 rounded-lg text-sm
              bg-red-50 dark:bg-red-900/20
              border border-red-200 dark:border-red-900/50
              text-red-600 dark:text-red-400
            ">
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="
              w-full mt-6 py-2.5 rounded-lg
              bg-violet-600 hover:bg-violet-700
              disabled:opacity-60 disabled:cursor-not-allowed
              text-white text-sm font-semibold
              transition-colors duration-150
              shadow-md shadow-violet-500/25
            "
                    >
                        {loading
                            ? 'Please wait...'
                            : tab === 'login' ? 'Sign In' : 'Create Account'
                        }
                    </button>

                </div>
            </div>
        </div>
    );
}

type Tab = 'login' | 'register';