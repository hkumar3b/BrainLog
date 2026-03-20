import type { Stats } from '../types';


function StatCard({ label, value, sub, accent, progress }: StatCardProps) {
    return (
        <div className="
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-800
      rounded-xl p-4
      relative overflow-hidden
    ">
            <div className={`
        absolute top-0 left-0 right-0 h-0.5 ${accent}
      `} />

            <p className="
        text-xs font-semibold uppercase tracking-widest
        text-gray-400 dark:text-gray-500
        mb-1
      ">
                {label}
            </p>

            <p className="
        text-3xl font-bold
        text-gray-900 dark:text-white
        leading-none mb-1
      ">
                {value}
            </p>

            {sub && (
                <p className="text-xs text-gray-400 dark:text-gray-500">
                    {sub}
                </p>
            )}

            {progress !== undefined && (
                <div className="mt-3 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-violet-500 to-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    );
}

export default function StatsBar({ stats, loading }: Props) {
    if (loading || !stats) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="
              h-28 rounded-xl
              bg-gray-100 dark:bg-gray-800
              animate-pulse
            "
                    />
                ))}
            </div>
        );
    }

    const pct = stats.total > 0
        ? Math.round((stats.done / stats.total) * 100)
        : 0;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
                label="Total saved"
                value={stats.total}
                sub="this week"
                accent="bg-violet-500"
            />
            <StatCard
                label="Revisited"
                value={stats.done}
                sub={`${pct}% complete`}
                accent="bg-green-500"
                progress={pct}
            />
            <StatCard
                label="Pending"
                value={stats.pending}
                sub="still to review"
                accent="bg-amber-500"
            />
            <StatCard
                label="Categories"
                value={[
                    stats.dsa > 0 && 'DSA',
                    stats.ai > 0 && 'AI',
                    stats.blog > 0 && 'Blog',
                    stats.general > 0 && 'General',
                ].filter(Boolean).join(', ') || '—'}
                sub="active this week"
                accent="bg-pink-500"
            />
        </div>
    );
}

interface Props {
    stats: Stats | null;
    loading: boolean;
}

interface StatCardProps {
    label: string;
    value: number | string;
    sub?: string;
    accent: string;
    progress?: number;
}