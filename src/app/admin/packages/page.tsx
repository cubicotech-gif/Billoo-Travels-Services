"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";

interface Package {
  id: number;
  type: string;
  title: string;
  nights: string;
  hotel: string;
  price_pkr: number;
  price_usd: number;
  price_sar: number;
  status: string;
  bookings_count: number;
}

const statusStyle: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-600",
  draft: "bg-slate-100 text-slate-500",
  archived: "bg-red-50 text-red-500",
};

const emptyForm = { title: "", type: "Umrah", nights: "", hotel: "", price_pkr: "", price_usd: "", price_sar: "", status: "active", overview: "" };

export default function AdminPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/packages?all=1");
    const data = await res.json();
    setPackages(data.packages || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPackages(); }, [fetchPackages]);

  const filtered = packages.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || p.type === filter || p.status === filter;
    return matchSearch && matchFilter;
  });

  async function handleSave() {
    setSaving(true);
    const body = {
      type: form.type,
      title: form.title,
      nights: form.nights,
      hotel: form.hotel,
      hotel_short: form.hotel,
      price_pkr: Number(form.price_pkr),
      price_usd: Number(form.price_usd),
      price_sar: Number(form.price_sar),
      status: form.status,
      overview: form.overview,
    };

    const url = editingId ? `/api/packages/${editingId}` : "/api/packages";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) {
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      fetchPackages();
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this package?")) return;
    await fetch(`/api/packages/${id}`, { method: "DELETE" });
    fetchPackages();
  }

  function startEdit(p: Package) {
    setForm({ title: p.title, type: p.type, nights: p.nights, hotel: p.hotel, price_pkr: String(p.price_pkr), price_usd: String(p.price_usd), price_sar: String(p.price_sar), status: p.status, overview: "" });
    setEditingId(p.id);
    setShowForm(true);
  }

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Packages</h1>
          <p className="text-sm text-slate-400 mt-1">{packages.length} total packages</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyForm); }}
          className="bg-[#4DA3E8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          ＋ Add Package
        </button>
      </div>

      {/* Form Panel */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{editingId ? "Edit Package" : "New Package"}</h3>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-slate-400 bg-transparent border-none cursor-pointer hover:text-slate-600 text-lg">✕</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Package Title", key: "title", type: "text", placeholder: "e.g. Royal Umrah Retreat" },
              { label: "Nights", key: "nights", type: "text", placeholder: "e.g. 14 Nights" },
              { label: "Hotel", key: "hotel", type: "text", placeholder: "e.g. Raffles Makkah Palace ★★★★★" },
              { label: "Price (PKR)", key: "price_pkr", type: "number", placeholder: "e.g. 1250000" },
              { label: "Price (USD)", key: "price_usd", type: "number", placeholder: "e.g. 4499" },
              { label: "Price (SAR)", key: "price_sar", type: "number", placeholder: "e.g. 16800" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={(form as Record<string, string>)[f.key]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300"
                />
              </div>
            ))}
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Type</label>
              <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] cursor-pointer focus:outline-none focus:border-[#4DA3E8]">
                <option>Umrah</option><option>Hajj</option><option>Tour</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Status</label>
              <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] cursor-pointer focus:outline-none focus:border-[#4DA3E8]">
                <option value="active">Active</option><option value="draft">Draft</option><option value="archived">Archived</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Overview</label>
            <textarea rows={3} placeholder="Package overview description..." value={form.overview} onChange={(e) => setForm((f) => ({ ...f, overview: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] resize-none focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={handleSave} disabled={saving} className="bg-[#4DA3E8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all disabled:opacity-60" style={{ fontFamily: "'Sora', sans-serif" }}>
              {saving ? "Saving…" : "Save Package"}
            </button>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="bg-transparent text-slate-500 px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-slate-200 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search packages..." className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-white flex-1 max-w-xs focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
        <div className="flex gap-2">
          {["All", "Umrah", "Hajj", "active", "draft"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${filter === f ? "bg-[#0B1628] text-white border-[#0B1628]" : "bg-white text-slate-500 border-slate-200 hover:border-[#4DA3E8]"}`} style={{ fontFamily: "'Sora', sans-serif" }}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-10 bg-slate-50 rounded animate-pulse" />)}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Package", "Type", "Nights", "Hotel", "PKR Price", "Bookings", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-[10px] tracking-[1.5px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-sm font-semibold text-[#1E293B]">{p.title}</td>
                    <td className="px-6 py-3.5"><span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#EBF5FF] text-[#4DA3E8]">{p.type}</span></td>
                    <td className="px-6 py-3.5 text-sm text-slate-500">{p.nights}</td>
                    <td className="px-6 py-3.5 text-sm text-slate-500 max-w-[160px] truncate">{p.hotel}</td>
                    <td className="px-6 py-3.5 text-sm font-semibold text-[#1E293B]">PKR {p.price_pkr.toLocaleString()}</td>
                    <td className="px-6 py-3.5 text-sm text-slate-500">{p.bookings_count}</td>
                    <td className="px-6 py-3.5"><span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md capitalize ${statusStyle[p.status] || ""}`}>{p.status}</span></td>
                    <td className="px-6 py-3.5">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(p)} className="text-[#4DA3E8] text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Edit</button>
                        <button onClick={() => handleDelete(p.id)} className="text-red-400 text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Delete</button>
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
