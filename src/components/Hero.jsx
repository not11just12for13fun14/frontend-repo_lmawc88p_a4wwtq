import { Search } from "lucide-react";

export default function Hero({ onSearch }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-xl">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_30%,white,transparent_40%)]" />
      <div className="relative">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Discover and share your stories</h1>
        <p className="mt-3 text-white/80 max-w-2xl">
          Publish chapter by chapter, build your library, and find books by tags, categories and genre.
        </p>
        <div className="mt-6 flex gap-3 max-w-xl">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={18} />
            <input
              onKeyDown={(e) => e.key === 'Enter' && onSearch?.(e.target.value)}
              placeholder="Search books, tags, authors..."
              className="w-full rounded-lg border border-white/20 bg-white/10 px-9 py-2 placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>
          <button
            onClick={() => {
              const val = document.querySelector('#global-search')?.value
              onSearch?.(val || '')
            }}
            className="rounded-lg bg-white text-indigo-700 px-4 py-2 font-medium hover:bg-white/90"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
