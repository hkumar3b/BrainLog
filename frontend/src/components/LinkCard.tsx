import type { Link, Category } from '../types';


export default function LinkCard({ link, onToggle, onDelete }: Props) {
    const cat = CATEGORY_STYLES[link.category];

    return (
        <div className={`
      relative
      bg-white dark:bg-gray-900
      border rounded-xl p-4
      transition-all duration-200
      hover:-translate-y-0.5
      hover:shadow-md dark:hover:shadow-gray-900
      ${link.revisited
                ? 'border-green-200 dark:border-green-900/50'
                : 'border-gray-200 dark:border-gray-800'
            }
    `}>

            {/* Left accent bar */}
            <div className={`
        absolute left-0 top-3 bottom-3
        w-0.5 rounded-full ${cat.accent}
      `} />

            <div className="flex items-start gap-3 pl-3">

                {/* Checkbox */}
                <button
                    onClick={() => onToggle(link.id, !link.revisited)}
                    className={`
            mt-0.5 flex-shrink-0
            w-5 h-5 rounded-md border-2
            flex items-center justify-center
            transition-all duration-150
            ${link.revisited
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                        }
          `}
                    aria-label={link.revisited ? 'Mark as pending' : 'Mark as revisited'}
                >
                    {link.revisited && (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <p className={`
              text-sm font-medium leading-snug
              ${link.revisited
                                ? 'text-gray-400 dark:text-gray-500 line-through'
                                : 'text-gray-900 dark:text-white'
                            }
            `}>
                            {link.title || link.url}
                        </p>
                        <span className={`
              flex-shrink-0 text-xs font-medium
              px-2 py-0.5 rounded-full ${cat.pill}
            `}>
                            {link.customLabel || cat.label}
                        </span>
                    </div>

                    <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            text-xs text-gray-400 dark:text-gray-500
                    hover:text-violet-500 dark:hover:text-violet-400
                    truncate block mb-3
                    transition-colors
                    "
                    >
                        {link.url}
                    </a>

                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                            {formatDate(link.savedAt)}
                        </span>
                        <div className="flex gap-2">

                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                text-xs px-2 py-1 rounded-lg
                        text-violet-500 dark:text-violet-400
                        border border-violet-200 dark:border-violet-800
                        hover:bg-violet-50 dark:hover:bg-violet-900/30
                        transition-colors
                        "
                            >
                                Visit
                            </a>
                            <button
                                onClick={() => {
                                    if (confirm('Delete this link?')) onDelete(link.id);
                                }}
                                className="
                  text-xs px-2 py-1 rounded-lg
                  text-red-400 dark:text-red-500
                  border border-red-200 dark:border-red-900
                  hover:bg-red-50 dark:hover:bg-red-900/20
                  transition-colors
                "
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

interface Props {
    link: Link;
    onToggle: (id: string, revisited: boolean) => void;
    onDelete: (id: string) => void;
}

const CATEGORY_STYLES: Record<Category, { pill: string; accent: string; label: string }> = {
    DSA: { pill: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300', accent: 'bg-violet-500', label: 'DSA' },
    AI: { pill: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300', accent: 'bg-emerald-500', label: 'AI / GPT' },
    BLOG: { pill: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300', accent: 'bg-orange-500', label: 'Blog' },
    GENERAL: { pill: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300', accent: 'bg-pink-500', label: 'General' },
};

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });
}
