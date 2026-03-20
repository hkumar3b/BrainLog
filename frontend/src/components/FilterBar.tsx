import type { FilterState, Category } from '../types';


export default function FilterBar({
    filters,
    weeks,
    onFilterChange,
    onReset,
    totalResults,
}: Props) {
    const hasActiveFilters =
        filters.week !== 'all' ||
        filters.category !== 'all' ||
        filters.revisited !== 'all';

    return (
        <div className="
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-800
      rounded-xl p-4 mb-6
    ">
            <div className="flex flex-wrap gap-4 items-center">

                {/* Week filter */}
                <div className="flex items-center gap-2">
                    <span className="
            text-xs font-semibold uppercase tracking-widest
            text-gray-400 dark:text-gray-500
            whitespace-nowrap
          ">
                        Week
                    </span>
                    <select
                        value={filters.week === 'all' ? 'all' : `${filters.week}_${filters.year}`}
                        onChange={e => {
                            if (e.target.value === 'all') {
                                onFilterChange('week', 'all');
                                onFilterChange('year', 'all');
                            } else {
                                const [week, year] = e.target.value.split('_');
                                onFilterChange('week', week);
                                onFilterChange('year', year);
                            }
                        }}
                        className="
              px-3 py-1.5 rounded-lg text-sm
              bg-gray-50 dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              text-gray-700 dark:text-gray-300
              outline-none cursor-pointer
            "
                    >
                        <option value="all">All weeks</option>
                        {weeks.map(w => (
                            <option
                                key={`${w.weekNumber}_${w.year}`}
                                value={`${w.weekNumber}_${w.year}`}
                            >
                                Week {w.weekNumber}, {w.year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

                {/* Category filter */}
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="
            text-xs font-semibold uppercase tracking-widest
            text-gray-400 dark:text-gray-500
          ">
                        Category
                    </span>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.value}
                            onClick={() => onFilterChange('category', cat.value)}
                            className={`
                px-3 py-1 rounded-full text-xs font-medium
                transition-colors
                ${filters.category === cat.value
                                    ? 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-300 dark:border-violet-700'
                                    : 'border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                                }
              `}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

                {/* Status filter */}
                <div className="flex items-center gap-2">
                    <span className="
            text-xs font-semibold uppercase tracking-widest
            text-gray-400 dark:text-gray-500
          ">
                        Status
                    </span>
                    {STATUSES.map(s => (
                        <button
                            key={s.value}
                            onClick={() => onFilterChange('revisited', s.value)}
                            className={`
                px-3 py-1 rounded-full text-xs font-medium
                transition-colors
                ${filters.revisited === s.value
                                    ? 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-300 dark:border-violet-700'
                                    : 'border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                                }
              `}
                        >
                            {s.value === 'true' ? '✓ ' : s.value === 'false' ? '○ ' : ''}{s.label}
                        </button>
                    ))}
                </div>

                {/* Results count + reset */}
                <div className="ml-auto flex items-center gap-3">
                    <span className="
            text-xs text-gray-400 dark:text-gray-500
          ">
                        {totalResults} result{totalResults !== 1 ? 's' : ''}
                    </span>
                    {hasActiveFilters && (
                        <button
                            onClick={onReset}
                            className="
                text-xs text-violet-500 hover:text-violet-700
                dark:text-violet-400 dark:hover:text-violet-300
                underline underline-offset-2
                transition-colors
              "
                        >
                            Reset
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}

interface Props {
    filters: FilterState;
    weeks: { weekNumber: number; year: number }[];
    onFilterChange: (key: keyof FilterState, value: string) => void;
    onReset: () => void;
    totalResults: number;
}

const CATEGORIES: { value: Category | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'DSA', label: 'DSA' },
    { value: 'AI', label: 'AI / GPT' },
    { value: 'BLOG', label: 'Blog' },
    { value: 'GENERAL', label: 'General' },
];

const STATUSES = [
    { value: 'all', label: 'All' },
    { value: 'false', label: 'Pending' },
    { value: 'true', label: 'Revisited' },
];