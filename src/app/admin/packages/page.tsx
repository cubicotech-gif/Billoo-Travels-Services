"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import AdminLayout from "@/components/AdminLayout";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ItineraryItem { day: string; title: string; desc: string; }

interface Package {
  id: number;
  type: string;
  title: string;
  nights: string;
  hotel: string;
  hotel_short: string | null;
  dates: string | null;
  includes: string[];
  price_pkr: number;
  price_usd: number;
  price_sar: number;
  badge: string | null;
  img: string | null;
  overview: string | null;
  itinerary: ItineraryItem[];
  included_items: string[];
  not_included: string[];
  gallery: string[];
  status: string;
  featured: boolean;
  bookings_count: number;
}

const emptyForm = {
  title: "", type: "Umrah", nights: "", hotel: "", hotel_short: "", dates: "",
  price_pkr: "", price_usd: "", price_sar: "", status: "active", featured: false,
  badge: "", img: "", overview: "",
  includes: [] as string[],
  itinerary: [] as ItineraryItem[],
  included_items: [] as string[],
  not_included: [] as string[],
  gallery: [] as string[],
};

type FormState = typeof emptyForm;

// ─── Tag Input ────────────────────────────────────────────────────────────────

function TagInput({ label, values, onChange }: { label: string; values: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState("");
  function addTag() {
    const t = input.trim();
    if (t && !values.includes(t)) onChange([...values, t]);
    setInput("");
  }
  return (
    <div>
      <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{label}</label>
      <div className="flex flex-wrap gap-1.5 mb-2 min-h-[28px]">
        {values.map((v) => (
          <span key={v} className="flex items-center gap-1 text-[11px] font-semibold text-[#4DA3E8] bg-[#EBF5FF] px-2.5 py-1 rounded-md">
            {v}
            <button type="button" onClick={() => onChange(values.filter((x) => x !== v))} className="text-slate-400 hover:text-red-500 bg-transparent border-none cursor-pointer leading-none">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); } }}
          placeholder="Type and press Enter to add…"
          className="flex-1 px-3.5 py-2 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300"
        />
        <button type="button" onClick={addTag} className="px-3 py-2 bg-[#4DA3E8] text-white rounded-lg text-sm font-semibold border-none cursor-pointer hover:bg-[#2B7CC4]">+</button>
      </div>
    </div>
  );
}

// ─── Itinerary Builder ────────────────────────────────────────────────────────

function ItineraryBuilder({ items, onChange }: { items: ItineraryItem[]; onChange: (v: ItineraryItem[]) => void }) {
  function add() {
    onChange([...items, { day: `DAY ${String(items.length + 1).padStart(2, "0")}`, title: "", desc: "" }]);
  }
  function update(i: number, field: keyof ItineraryItem, value: string) {
    onChange(items.map((item, idx) => idx === i ? { ...item, [field]: value } : item));
  }
  function remove(i: number) { onChange(items.filter((_, idx) => idx !== i)); }

  return (
    <div>
      <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Itinerary</label>
      <div className="space-y-3 mb-3">
        {items.map((item, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative">
            <button type="button" onClick={() => remove(i)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 bg-transparent border-none cursor-pointer text-base leading-none">×</button>
            <div className="grid grid-cols-3 gap-3 mb-2 pr-6">
              <input value={item.day} onChange={(e) => update(i, "day", e.target.value)} placeholder="DAY 01" className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
              <input value={item.title} onChange={(e) => update(i, "title", e.target.value)} placeholder="Day title" className="col-span-2 px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
            </div>
            <textarea value={item.desc} onChange={(e) => update(i, "desc", e.target.value)} rows={2} placeholder="Description for this day…" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] resize-none focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
          </div>
        ))}
      </div>
      <button type="button" onClick={add} className="text-[#4DA3E8] text-sm font-semibold bg-transparent border border-dashed border-[#4DA3E8] hover:bg-[#EBF5FF]/50 px-4 py-2 rounded-lg cursor-pointer transition-all w-full" style={{ fontFamily: "'Sora', sans-serif" }}>
        + Add Day
      </button>
    </div>
  );
}

// ─── Single Image Upload ──────────────────────────────────────────────────────

function ImageUpload({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("bucket", "package-images");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) onChange(data.url);
    setUploading(false);
  }

  return (
    <div>
      <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{label}</label>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 h-[140px] group">
          <img src={value} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0B1628]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button type="button" onClick={() => ref.current?.click()} className="bg-white text-[#1E293B] text-xs font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer" style={{ fontFamily: "'Sora', sans-serif" }}>Change</button>
            <button type="button" onClick={() => onChange("")} className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border-none cursor-pointer" style={{ fontFamily: "'Sora', sans-serif" }}>Remove</button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => ref.current?.click()} disabled={uploading} className="w-full h-[100px] rounded-xl border-2 border-dashed border-slate-200 hover:border-[#4DA3E8] hover:bg-[#EBF5FF]/30 transition-all cursor-pointer bg-transparent flex flex-col items-center justify-center gap-1.5 text-slate-400 disabled:opacity-60">
          {uploading ? (
            <div className="w-5 h-5 border-2 border-[#4DA3E8] border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
              <span className="text-xs font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>Click to Upload</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

// ─── Gallery Upload ───────────────────────────────────────────────────────────

function GalleryUpload({ images, onChange }: { images: string[]; onChange: (imgs: string[]) => void }) {
  const [uploading, setUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  async function uploadFiles(files: FileList) {
    setUploading(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("bucket", "package-images");
      fd.append("folder", "gallery");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) newUrls.push(data.url);
    }
    onChange([...images, ...newUrls]);
    setUploading(false);
  }

  return (
    <div>
      <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Gallery Images</label>
      <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { if (e.target.files?.length) uploadFiles(e.target.files); e.target.value = ""; }} />
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <div key={i} className="relative rounded-lg overflow-hidden h-[80px] border border-slate-200 group">
            <img src={img} alt="" className="w-full h-full object-cover" />
            <button type="button" onClick={() => onChange(images.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full border-none cursor-pointer text-xs font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
          </div>
        ))}
        <button type="button" onClick={() => ref.current?.click()} disabled={uploading} className="h-[80px] rounded-lg border-2 border-dashed border-slate-200 hover:border-[#4DA3E8] hover:bg-[#EBF5FF]/30 transition-all cursor-pointer bg-transparent flex items-center justify-center text-slate-400 disabled:opacity-60 text-2xl font-light">
          {uploading ? <div className="w-4 h-4 border-2 border-[#4DA3E8] border-t-transparent rounded-full animate-spin" /> : "+"}
        </button>
      </div>
      <p className="text-[11px] text-slate-400 mt-1.5">Click + to add multiple images (shown in the package detail gallery)</p>
    </div>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

const statusStyle: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-600",
  draft: "bg-slate-100 text-slate-500",
  archived: "bg-red-50 text-red-500",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }

  function setF(key: string, value: unknown) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/packages?all=1");
    const data = await res.json();
    setPackages(data.packages || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPackages(); }, [fetchPackages]);

  const filtered = packages.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || (p.hotel || "").toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || p.type === filter || p.status === filter;
    return matchSearch && matchFilter;
  });

  async function handleSave() {
    if (!form.title.trim() || !form.hotel.trim() || !form.nights.trim()) {
      showToast("error", "Title, hotel, and nights are required.");
      return;
    }
    setSaving(true);
    const body = {
      type: form.type,
      title: form.title,
      nights: form.nights,
      hotel: form.hotel,
      hotel_short: form.hotel_short || form.hotel,
      dates: form.dates || null,
      price_pkr: Number(form.price_pkr) || 0,
      price_usd: Number(form.price_usd) || 0,
      price_sar: Number(form.price_sar) || 0,
      status: form.status,
      featured: form.featured,
      badge: form.badge || null,
      img: form.img || null,
      overview: form.overview || null,
      includes: form.includes,
      itinerary: form.itinerary,
      included_items: form.included_items,
      not_included: form.not_included,
      gallery: form.gallery,
    };

    const url = editingId ? `/api/packages/${editingId}` : "/api/packages";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

    if (res.ok) {
      showToast("success", editingId ? "Package updated successfully." : "Package created successfully.");
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      fetchPackages();
    } else {
      const err = await res.json();
      showToast("error", err.error || "Failed to save.");
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this package? This cannot be undone.")) return;
    await fetch(`/api/packages/${id}`, { method: "DELETE" });
    showToast("success", "Package deleted.");
    fetchPackages();
  }

  async function toggleFeatured(p: Package) {
    await fetch(`/api/packages/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !p.featured }),
    });
    fetchPackages();
  }

  function startEdit(p: Package) {
    setForm({
      title: p.title, type: p.type, nights: p.nights, hotel: p.hotel,
      hotel_short: p.hotel_short || "", dates: p.dates || "",
      price_pkr: String(p.price_pkr), price_usd: String(p.price_usd), price_sar: String(p.price_sar),
      status: p.status, featured: p.featured, badge: p.badge || "", img: p.img || "",
      overview: p.overview || "",
      includes: Array.isArray(p.includes) ? p.includes : [],
      itinerary: Array.isArray(p.itinerary) ? p.itinerary : [],
      included_items: Array.isArray(p.included_items) ? p.included_items : [],
      not_included: Array.isArray(p.not_included) ? p.not_included : [],
      gallery: Array.isArray(p.gallery) ? p.gallery : [],
    });
    setEditingId(p.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const featuredCount = packages.filter((p) => p.featured).length;

  return (
    <AdminLayout>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-sm font-semibold shadow-lg ${toast.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`} style={{ fontFamily: "'Sora', sans-serif" }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Packages</h1>
          <p className="text-sm text-slate-400 mt-1">
            {packages.length} total · <span className="text-amber-500 font-semibold">★ {featuredCount} featured</span> on homepage
          </p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyForm); }}
          className="bg-[#4DA3E8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          {showForm && !editingId ? "✕ Close" : "＋ Add Package"}
        </button>
      </div>

      {/* ── FORM PANEL ─────────────────────────────────────────────────────── */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h3 className="text-lg font-bold text-[#1E293B] mb-6" style={{ fontFamily: "'Sora', sans-serif" }}>
            {editingId ? "Edit Package" : "New Package"}
          </h3>

          {/* ── BASIC INFO ── */}
          <p className="text-[10px] tracking-[2px] text-slate-400 uppercase font-semibold mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>── Basic Info</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="lg:col-span-2">
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Package Title *</label>
              <input value={form.title} onChange={(e) => setF("title", e.target.value)} placeholder="e.g. Royal Umrah Retreat" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Badge Label</label>
              <input value={form.badge} onChange={(e) => setF("badge", e.target.value)} placeholder="e.g. Most Booked" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Type</label>
              <select value={form.type} onChange={(e) => setF("type", e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] cursor-pointer focus:outline-none focus:border-[#4DA3E8]">
                <option>Umrah</option><option>Hajj</option><option>Tour</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Status</label>
              <select value={form.status} onChange={(e) => setF("status", e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] cursor-pointer focus:outline-none focus:border-[#4DA3E8]">
                <option value="active">Active</option><option value="draft">Draft</option><option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Featured on Homepage</label>
              <button
                type="button"
                onClick={() => setF("featured", !form.featured)}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-lg border text-sm font-semibold cursor-pointer transition-all ${form.featured ? "bg-amber-50 border-amber-300 text-amber-700" : "bg-slate-50 border-slate-200 text-slate-500 hover:border-amber-300 hover:bg-amber-50/50"}`}
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${form.featured ? "bg-amber-400 border-amber-400" : "border-slate-300"}`}>
                  {form.featured && <span className="text-white text-[10px] leading-none">★</span>}
                </span>
                {form.featured ? "★ Featured on Homepage" : "☆ Not Featured"}
              </button>
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Duration *</label>
              <input value={form.nights} onChange={(e) => setF("nights", e.target.value)} placeholder="e.g. 14 Nights" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Hotel Full Name *</label>
              <input value={form.hotel} onChange={(e) => setF("hotel", e.target.value)} placeholder="e.g. Raffles Makkah Palace ★★★★★" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Hotel Short Name</label>
              <input value={form.hotel_short} onChange={(e) => setF("hotel_short", e.target.value)} placeholder="e.g. Raffles Makkah" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Departure Dates</label>
              <input value={form.dates} onChange={(e) => setF("dates", e.target.value)} placeholder="e.g. Jan – Dec 2025" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
            </div>
          </div>

          {/* ── PRICING ── */}
          <p className="text-[10px] tracking-[2px] text-slate-400 uppercase font-semibold mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>── Pricing</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Price (PKR)", key: "price_pkr", placeholder: "1250000" },
              { label: "Price (USD)", key: "price_usd", placeholder: "4499" },
              { label: "Price (SAR)", key: "price_sar", placeholder: "16800" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{f.label}</label>
                <input type="number" value={(form as Record<string, unknown>)[f.key] as string} onChange={(e) => setF(f.key, e.target.value)} placeholder={f.placeholder} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
              </div>
            ))}
          </div>

          {/* ── MAIN IMAGE ── */}
          <p className="text-[10px] tracking-[2px] text-slate-400 uppercase font-semibold mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>── Cover Image</p>
          <div className="max-w-sm mb-6">
            <ImageUpload label="Package Cover Photo" value={form.img} onChange={(url) => setF("img", url)} />
          </div>

          {/* ── OVERVIEW ── */}
          <p className="text-[10px] tracking-[2px] text-slate-400 uppercase font-semibold mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>── Overview</p>
          <div className="mb-6">
            <textarea rows={4} placeholder="Detailed package description shown on the detail page…" value={form.overview} onChange={(e) => setF("overview", e.target.value)} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] resize-none focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
          </div>

          {/* ── PACKAGE FEATURES ── */}
          <p className="text-[10px] tracking-[2px] text-slate-400 uppercase font-semibold mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>── Package Features (shown on cards)</p>
          <div className="mb-6">
            <TagInput label="Feature Tags" values={form.includes} onChange={(v) => setF("includes", v)} />
          </div>

          {/* ── ITINERARY ── */}
          <p className="text-[10px] tracking-[2px] text-slate-400 uppercase font-semibold mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>── Day-by-Day Itinerary</p>
          <div className="mb-6">
            <ItineraryBuilder items={form.itinerary} onChange={(v) => setF("itinerary", v)} />
          </div>

          {/* ── INCLUDED / NOT INCLUDED ── */}
          <p className="text-[10px] tracking-[2px] text-slate-400 uppercase font-semibold mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>── What&apos;s Included / Not Included</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <TagInput label="What's Included" values={form.included_items} onChange={(v) => setF("included_items", v)} />
            <TagInput label="Not Included" values={form.not_included} onChange={(v) => setF("not_included", v)} />
          </div>

          {/* ── GALLERY ── */}
          <p className="text-[10px] tracking-[2px] text-slate-400 uppercase font-semibold mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>── Gallery</p>
          <div className="mb-6">
            <GalleryUpload images={form.gallery} onChange={(imgs) => setF("gallery", imgs)} />
          </div>

          {/* ── ACTIONS ── */}
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button onClick={handleSave} disabled={saving} className="bg-[#4DA3E8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all disabled:opacity-60" style={{ fontFamily: "'Sora', sans-serif" }}>
              {saving ? "Saving…" : editingId ? "Update Package" : "Create Package"}
            </button>
            <button onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }} className="bg-transparent text-slate-500 px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-slate-200 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* ── FILTERS ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or hotel…" className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-white flex-1 max-w-xs focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
        <div className="flex gap-2 flex-wrap">
          {["All", "Umrah", "Hajj", "active", "draft", "archived"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${filter === f ? "bg-[#0B1628] text-white border-[#0B1628]" : "bg-white text-slate-500 border-slate-200 hover:border-[#4DA3E8]"}`} style={{ fontFamily: "'Sora', sans-serif" }}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ── TABLE ───────────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-12 bg-slate-50 rounded animate-pulse" />)}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Package", "Type", "Nights", "PKR Price", "Featured", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-5 py-3 text-[10px] tracking-[1.5px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {p.img ? (
                          <img src={p.img} alt="" className="w-11 h-11 rounded-lg object-cover border border-slate-100 shrink-0" />
                        ) : (
                          <div className="w-11 h-11 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-300 text-lg shrink-0">✈</div>
                        )}
                        <div>
                          <div className="text-sm font-semibold text-[#1E293B]">{p.title}</div>
                          {p.badge && <div className="text-[10px] text-slate-400 mt-0.5">{p.badge}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5"><span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#EBF5FF] text-[#4DA3E8]">{p.type}</span></td>
                    <td className="px-5 py-3.5 text-sm text-slate-500 whitespace-nowrap">{p.nights}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-[#1E293B] whitespace-nowrap">PKR {p.price_pkr.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => toggleFeatured(p)}
                        title={p.featured ? "Click to remove from homepage" : "Click to feature on homepage"}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border-none cursor-pointer transition-all whitespace-nowrap ${p.featured ? "bg-amber-50 text-amber-600 hover:bg-amber-100" : "bg-slate-50 text-slate-400 hover:bg-amber-50 hover:text-amber-500"}`}
                        style={{ fontFamily: "'Sora', sans-serif" }}
                      >
                        {p.featured ? "★ Featured" : "☆ Feature"}
                      </button>
                    </td>
                    <td className="px-5 py-3.5"><span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md capitalize ${statusStyle[p.status] || ""}`}>{p.status}</span></td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-3">
                        <button onClick={() => startEdit(p)} className="text-[#4DA3E8] text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline" style={{ fontFamily: "'Sora', sans-serif" }}>Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="text-red-400 text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline" style={{ fontFamily: "'Sora', sans-serif" }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="p-10 text-center text-slate-400 text-sm">No packages found.</div>}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
