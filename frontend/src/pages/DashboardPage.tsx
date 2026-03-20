import { useAuth } from '../context/AuthContext';
import { useLinks } from '../hooks/useLinks';
import Navbar from '../components/Navbar';
import StatsBar from '../components/StatsBar';
import FilterBar from '../components/FilterBar';
import LinkGrid from '../components/LinkGrid';

export default function DashboardPage() {
    const { token } = useAuth();

    const {
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
    } = useLinks(token);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-8">

                {/* Page title */}
                <div className="mb-6">
                    <h2 className="
            text-2xl font-bold
            text-gray-900 dark:text-white
            tracking-tight
          ">
                        Your links
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Track and revisit your weekly saved resources
                    </p>
                </div>

                {/* Stats */}
                <StatsBar stats={stats} loading={loading} />

                {/* Filters */}
                <FilterBar
                    filters={filters}
                    weeks={weeks}
                    onFilterChange={updateFilter}
                    onReset={resetFilters}
                    totalResults={links.length}
                />

                {/* Links */}
                <LinkGrid
                    links={links}
                    loading={loading}
                    error={error}
                    onToggle={toggleRevisited}
                    onDelete={deleteLink}
                />

            </main>
        </div>
    );
}