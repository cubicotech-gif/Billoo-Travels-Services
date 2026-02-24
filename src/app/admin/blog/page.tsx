"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  author: string;
  description: string;
  img: string;
  published: boolean;
  created_at: string;
}

const emptyForm = {
  title: "",
  slug: "",
  category: "Umrah",
  author: "Billoo Travels Editorial Team",
  read_time: "",
  img: "",
  description: "",
  content: "",
  published: false,
};

const statusStyle = {
  true: "bg-emerald-50 text-emerald-600",
  false: "bg-slate-100 text-slate-500",
};

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/blog");
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  function openNew() {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
    setShowEditor(true);
  }

  function openEdit(p: BlogPost) {
    setForm({
      title: p.title,
      slug: p.slug,
      category: p.category || "Umrah",
      author: p.author || "Billoo Travels Editorial Team",
      read_time: "",
      img: p.img || "",
      description: p.description || "",
      content: "",
      published: p.published,
    });
    setEditingId(p.id);
    setError(null);
    setShowEditor(true);
  }

  async function handleSave(publishStatus: boolean) {
    setSaving(true);
    setError(null);

    const body = {
      title: form.title,
      slug: form.slug || toSlug(form.title),
      category: form.category,
      author: form.author,
      read_time: form.read_time || null,
      img: form.img || null,
      description: form.description || null,
      content: form.content ? [{ type: "text", body: form.content }] : [],
      published: publishStatus,
    };

    const url = editingId ? `/api/blog/${editingId}` : "/api/blog";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setShowEditor(false);
      setEditingId(null);
      setForm(emptyForm);
      fetchPosts();
    } else {
      const d = await res.json();
      setError(d.error || "Failed to save post.");
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    fetchPosts();
  }

  async function togglePublish(p: BlogPost) {
    await fetch(`/api/blog/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !p.published }),
    });
    fetchPosts();
  }

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Blog Posts</h1>
          <p className="text-sm text-slate-400 mt-1">{posts.length} articles · {posts.filter((p) => p.published).length} published</p>
        </div>
        <button
          onClick={openNew}
          className="bg-[#4DA3E8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all flex items-center gap-2"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          ＋ New Post
        </button>
      </div>

      {/* Editor */}
      {showEditor && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>
              {editingId ? "Edit Post" : "New Blog Post"}
            </h3>
            <button onClick={() => { setShowEditor(false); setEditingId(null); }} className="text-slate-400 bg-transparent border-none cursor-pointer hover:text-slate-600 text-lg">✕</button>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Title</label>
              <input
                placeholder="Article title..."
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: f.slug || toSlug(e.target.value) }))}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 text-base bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300 font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Slug (URL)</label>
                <input
                  placeholder="url-slug"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white cursor-pointer focus:outline-none focus:border-[#4DA3E8]"
                >
                  <option>Umrah</option><option>Hajj</option><option>Travel</option><option>Guide</option><option>News</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Read Time</label>
                <input
                  placeholder="e.g. 5 min read"
                  value={form.read_time}
                  onChange={(e) => setForm((f) => ({ ...f, read_time: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Cover Image URL</label>
                <input
                  placeholder="https://..."
                  value={form.img}
                  onChange={(e) => setForm((f) => ({ ...f, img: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Author</label>
                <input
                  value={form.author}
                  onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Short Description</label>
              <input
                placeholder="Brief summary for listing cards..."
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Content</label>
              <textarea
                rows={10}
                placeholder="Write your article here..."
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] resize-none focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300 leading-relaxed"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="bg-[#4DA3E8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all disabled:opacity-60"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {saving ? "Saving…" : "Publish"}
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="bg-transparent text-slate-500 px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-slate-200 hover:bg-slate-50 transition-all disabled:opacity-60"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Save Draft
            </button>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-10 bg-slate-50 rounded animate-pulse" />)}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Title", "Category", "Date", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-[10px] tracking-[1.5px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-sm font-semibold text-[#1E293B] max-w-[280px]">{p.title}</td>
                    <td className="px-6 py-3.5">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#EBF5FF] text-[#4DA3E8]">{p.category}</span>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-slate-400">{new Date(p.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-3.5">
                      <button
                        onClick={() => togglePublish(p)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-md cursor-pointer border-none ${statusStyle[String(p.published) as "true" | "false"]}`}
                      >
                        {p.published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(p)} className="text-[#4DA3E8] text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="text-red-400 text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-400 text-sm">No blog posts yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
