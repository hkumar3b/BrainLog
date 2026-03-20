import type { Link } from '../types';
import LinkCard from './LinkCard';

export default function LinkGrid({ links, loading, error, onToggle, onDelete }: Props) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="h-36 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="
        rounded-xl p-6 text-center
        bg-red-50 dark:bg-red-900/10
        border border-red-200 dark:border-red-900/30
      ">
                <p className="text-red-500 dark:text-red-400 text-sm font-medium mb-1">
                    {error}
                </p>
                <p className="text-red-400 dark:text-red-500 text-xs">
                    Make sure your backend is running on port 3000
                </p>
            </div>
        );
    }

    if (links.length === 0) {
        return (
            <div className="
        rounded-xl p-12 text-center
        border-2 border-dashed
        border-gray-200 dark:border-gray-800
      ">
                <p className="text-4xl mb-3">🔗</p>
                <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">
                    No links found
                </p>
                <p className="text-gray-400 dark:text-gray-600 text-sm">
                    Save some links using the extension, or adjust your filters
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {links.map(link => (
                <LinkCard
                    key={link.id}
                    link={link}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

interface Props {
    links: Link[];
    loading: boolean;
    error: string | null;
    onToggle: (id: string, revisited: boolean) => void;
    onDelete: (id: string) => void;
}