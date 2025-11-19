import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import BookCard from './components/BookCard'
import BookModal from './components/BookModal'

function App() {
  const [books, setBooks] = useState([])
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(null)
  const [filters, setFilters] = useState({ tag: '', category: '', genre: '' })

  const load = async (q = query, f = filters) => {
    const base = import.meta.env.VITE_BACKEND_URL
    const url = new URL(`${base}/api/books`)
    if (q) url.searchParams.set('q', q)
    if (f.tag) url.searchParams.set('tag', f.tag)
    if (f.category) url.searchParams.set('category', f.category)
    if (f.genre) url.searchParams.set('genre', f.genre)
    const res = await fetch(url.toString())
    const data = await res.json()
    setBooks(data)
  }

  useEffect(() => { load() }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <Hero onSearch={(q)=>{ setQuery(q); load(q) }} />

        <div className="flex flex-wrap gap-3">
          <input placeholder="Tag" value={filters.tag} onChange={(e)=>setFilters({...filters, tag: e.target.value})} className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" />
          <input placeholder="Category" value={filters.category} onChange={(e)=>setFilters({...filters, category: e.target.value})} className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" />
          <input placeholder="Genre" value={filters.genre} onChange={(e)=>setFilters({...filters, genre: e.target.value})} className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2" />
          <button onClick={()=>load(query, filters)} className="rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white px-4">Apply</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((b)=> (
            <BookCard key={b._id} book={b} onOpen={setActive} />
          ))}
          {books.length === 0 && (
            <div className="col-span-full text-center text-slate-400">No books found. Add some via the API.</div>
          )}
        </div>
      </div>

      <BookModal open={!!active} onClose={()=>setActive(null)} book={active} />
    </div>
  )
}

export default App
