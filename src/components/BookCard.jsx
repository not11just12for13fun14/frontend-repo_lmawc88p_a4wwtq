export default function BookCard({ book, onOpen }) {
  return (
    <div onClick={() => onOpen?.(book)} className="rounded-xl bg-slate-800/60 border border-slate-700 hover:border-indigo-500/50 transition p-4 cursor-pointer">
      <div className="aspect-[3/4] w-full rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 mb-3 overflow-hidden">
        {book.cover_url ? (
          <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-slate-300 text-sm">No Cover</div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-white font-semibold line-clamp-1">{book.title}</h3>
        <p className="text-slate-400 text-sm line-clamp-2">{book.description || 'No description'}</p>
        <div className="flex flex-wrap gap-1 pt-1">
          {(book.tags || []).slice(0, 3).map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-200">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
