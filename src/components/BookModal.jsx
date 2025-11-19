import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function BookModal({ open, onClose, book }) {
  const [chapters, setChapters] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!open || !book) return;
    const base = import.meta.env.VITE_BACKEND_URL;
    fetch(`${base}/api/books/${book._id}/chapters`).then(r=>r.json()).then(setChapters);
    fetch(`${base}/api/books/${book._id}/comments`).then(r=>r.json()).then(setComments);
  }, [open, book]);

  const postComment = async () => {
    if (!newComment.trim()) return;
    const base = import.meta.env.VITE_BACKEND_URL;
    const res = await fetch(`${base}/api/comments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ book_id: book._id, user_name: 'Guest', content: newComment }) });
    if (res.ok) {
      setNewComment("");
      const refreshed = await fetch(`${base}/api/books/${book._id}/comments`).then(r=>r.json());
      setComments(refreshed);
    }
  };

  if (!open || !book) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 grid place-items-center p-4">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-white font-semibold">{book.title}</h2>
          <button onClick={onClose} className="text-slate-300 hover:text-white"><X size={20} /></button>
        </div>
        <div className="grid md:grid-cols-3 gap-6 p-6">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-slate-200 font-medium">Chapters</h3>
            <div className="space-y-2">
              {chapters.length === 0 && <div className="text-slate-400 text-sm">No chapters yet.</div>}
              {chapters.map((c) => (
                <div key={c._id} className="rounded-lg bg-slate-800/60 border border-slate-700 p-3">
                  <div className="text-white">{c.chapter_number ? `Chapter ${c.chapter_number}: ` : ''}{c.title}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-slate-200 font-medium">Comments</h3>
            <div className="space-y-2 max-h-64 overflow-auto pr-1">
              {comments.map((cm) => (
                <div key={cm._id} className="rounded-lg bg-slate-800/60 border border-slate-700 p-3">
                  <div className="text-slate-300 text-sm"><span className="font-medium text-white">{cm.user_name}</span>: {cm.content}</div>
                </div>
              ))}
              {comments.length === 0 && <div className="text-slate-400 text-sm">Be the first to comment.</div>}
            </div>
            <div className="flex gap-2">
              <input value={newComment} onChange={(e)=>setNewComment(e.target.value)} placeholder="Write a comment" className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-slate-200" />
              <button onClick={postComment} className="rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white px-3">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
