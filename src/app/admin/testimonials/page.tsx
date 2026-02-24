"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  img: string;
  rating: number;
  published: boolean;
  created_at: string;
}

const emptyForm = {
  name: "",
  role: "",
  text: "",
  img: "",
  rating: 5,
  published: false,
};

const statusStyle = {
  true: "bg-emerald-50 text-emerald-600",
  false: "bg-slate-100 text-slate-500",
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setTestimonials(data.testimonials || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchTestimonials(); }, [fetchTestimonials]);

  function openNew() {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
    setShowForm(true);
  }

  function openEdit(t: Testimonial) {
    setForm({
      name: t.name,
      role: t.role || "",
      text: t.text,
      img: t.img || "",
      rating: t.rating,
      published: t.published,
    });
    setEditingId(t.id);
    setError(null);
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);

    const body = {
      name: form.name,
      role: form.role || null,
      text: form.text,
      img: form.img || null,
      rating: Number(form.rating),
      published: form.published,
    };

    const url = editingId ? `/api/testimonials/${editingId}` : "/api/testimonials";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      fetchTestimonials();
    } else {
      const d = await res.json();
      setError(d.error || "Failed to save testimonial.");
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    fetchTestimonials();
  }

  async function togglePublish(t: Testimonial) {
    await fetch(`/api/testimonials/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !t.published }),
    });
    fetchTestimonials();
  }

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Testimonials</h1>
          <p className="text-sm text-slate-400 mt-1">
            {testimonials.length} reviews · {testimonials.filter((t) => t.published).length} published
          </p>
        </div>
        <button
          onClick={openNew}
          className="bg-[#4DA3E8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all flex items-center gap-2"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          ＋ Add Testimonial
        </button>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>
              {editingId ? "Edit Testimonial" : "New Testimonial"}
            </h3>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-slate-400 bg-transparent border-none cursor-pointer hover:text-slate-600 text-lg">✕</button>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Client Name</label>
              <input
                placeholder="e.g. Ahmad Khan"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Package / Role</label>
              <input
                placeholder="e.g. Executive Hajj '24"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Rating</label>
              <select
                value={form.rating}
                onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white cursor-pointer focus:outline-none focus:border-[#4DA3E8]"
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★</option>
                <option value={3}>3 Stars ★★★</option>
                <option value={2}>2 Stars ★★</option>
                <option value={1}>1 Star ★</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Photo URL</label>
              <input
                placeholder="https://..."
                value={form.img}
                onChange={(e) => setForm((f) => ({ ...f, img: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Status</label>
              <select
                value={form.published ? "true" : "false"}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.value === "true" }))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white cursor-pointer focus:outline-none focus:border-[#4DA3E8]"
              >
                <option value="true">Published</option>
                <option value="false">Hidden</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Review Text</label>
            <textarea
              rows={3}
              placeholder="Client's review..."
              value={form.text}
              onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white resize-none focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300"
            />
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#4DA3E8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all disabled:opacity-60"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              onClick={() => { setShowForm(false); setEditingId(null); }}
              className="bg-transparent text-slate-500 px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-slate-200 hover:bg-slate-50 transition-all"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Testimonial Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 h-40 animate-pulse" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
          <div className="text-slate-200 text-5xl mb-4">★</div>
          <div className="text-slate-400 text-sm font-medium">No testimonials yet.</div>
          <div className="text-slate-300 text-xs mt-1">Add your first testimonial using the button above.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {t.img ? (
                    <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover border-2 border-slate-100" />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#0B1628] flex items-center justify-center text-[#4DA3E8] font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-sm text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{t.name}</div>
                    {t.role && <div className="text-[11px] text-[#4DA3E8]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{t.role}</div>}
                  </div>
                </div>
                <button
                  onClick={() => togglePublish(t)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-md cursor-pointer border-none ${statusStyle[String(t.published) as "true" | "false"]}`}
                >
                  {t.published ? "Published" : "Hidden"}
                </button>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed italic mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-sm ${i < t.rating ? "text-amber-400" : "text-slate-200"}`}>★</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(t)} className="text-[#4DA3E8] text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Edit</button>
                  <button onClick={() => handleDelete(t.id)} className="text-red-400 text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
