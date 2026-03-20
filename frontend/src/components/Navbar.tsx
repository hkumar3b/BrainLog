import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="
      sticky top-0 z-50
      border-b border-gray-200 dark:border-gray-800
      bg-white/80 dark:bg-gray-950/80
      backdrop-blur-sm
    ">
            <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <div className="
            w-8 h-8 rounded-lg
            bg-gradient-to-br from-violet-500 to-violet-700
            flex items-center justify-center
            text-white font-bold text-sm
          ">
                        W
                    </div>
                    <span className="
            font-semibold text-gray-900 dark:text-white
            tracking-tight
          ">
                        Revision Tracker
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <span className="
            text-sm text-gray-500 dark:text-gray-400
            hidden sm:block
          ">
                        {user?.email}
                    </span>

                    <button
                        onClick={toggleTheme}
                        className="
              w-8 h-8 rounded-lg
              flex items-center justify-center
              text-gray-500 dark:text-gray-400
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition-colors
            "
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>

                    <button
                        onClick={logout}
                        className="
              px-3 py-1.5 rounded-lg text-sm font-medium
              border border-gray-200 dark:border-gray-700
              text-gray-600 dark:text-gray-400
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition-colors
            "
                    >
                        Logout
                    </button>
                </div>

            </div>
        </nav>
    );
}