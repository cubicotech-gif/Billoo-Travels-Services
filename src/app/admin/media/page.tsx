"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

const mediaItems = [
  { id: 1, name: "masjid-al-haram.jpg", url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=300&fit=crop", size: "2.4 MB", date: "Jan 10, 2025", category: "Gallery" },
  { id: 2, name: "holy-kaaba.jpg", url: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400&h=300&fit=crop", size: "1.8 MB", date: "Jan 10, 2025", category: "Gallery" },
  { id: 3, name: "madinah-mosque.jpg", url: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=400&h=300&fit=crop", size: "3.1 MB", date: "Jan 12, 2025", category: "Gallery" },
  { id: 4, name: "makkah-skyline.jpg", url: "https://images.unsplash.com/photo-1565552643951-b2e152973b06?w=400&h=300&fit=crop", size: "2.7 MB", date: "Jan 15, 2025", category: "Packages" },
  { id: 5, name: "istanbul-heritage.jpg", url: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop", size: "1.9 MB", date: "Jan 18, 2025", category: "Blog" },
  { id: 6, name: "mosque-interior.jpg", url: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=300&fit=crop", size: "2.2 MB", date: "Jan 20, 2025", category: "Gallery" },
  { id: 7, name: "team-ceo.jpg", url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop", size: "1.1 MB", date: "Jan 22, 2025", category: "Team" },
  { id: 8, name: "team-md.jpg", url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop", size: "0.9 MB", date: "Jan 22, 2025", category: "Team" },
];

const categories = ["All", "Gallery", "Packages", "Blog", "Team"];

export default function AdminMedia() {
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<number[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  const filtered = mediaItems.filter((m) => filter === "All" || m.category === filter);

  const toggleSelect = (id: number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Media Library</h1>
          <p className="text-sm text-slate-400 mt-1">{mediaItems.length} files · {(mediaItems.reduce((a, m) => a + parseFloat(m.size), 0)).toFixed(1)} MB total</p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="bg-[#4DA3E8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all flex items-center gap-2"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          ↑ Upload Files
        </button>
      </div>

      {/* Upload Area */}
      {showUpload && (
        <div className="bg-white rounded-xl border-2 border-dashed border-[#4DA3E8]/30 p-10 mb-6 text-center hover:border-[#4DA3E8]/60 transition-all cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-[#EBF5FF] flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4DA3E8" strokeWidth="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
          </div>
          <h3 className="text-base font-bold text-[#1E293B] mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>Drag & drop files here</h3>
          <p className="text-sm text-slate-400 mb-4">or click to browse · JPG, PNG, WebP up to 10MB</p>
          <button className="bg-[#4DA3E8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>
            Choose Files
          </button>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-5">
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${
                filter === c ? "bg-[#0B1628] text-white border-[#0B1628]" : "bg-white text-slate-500 border-slate-200 hover:border-[#4DA3E8]"
              }`}
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <button className="text-red-400 text-xs font-semibold bg-transparent border border-red-200 rounded-lg px-3 py-2 cursor-pointer hover:bg-red-50 transition-all">
              Delete ({selected.length})
            </button>
          )}
          <div className="flex border border-slate-200 rounded-lg overflow-hidden">
            <button onClick={() => setView("grid")} className={`px-3 py-2 border-none cursor-pointer text-xs ${view === "grid" ? "bg-[#0B1628] text-white" : "bg-white text-slate-400"}`}>Grid</button>
            <button onClick={() => setView("list")} className={`px-3 py-2 border-none cursor-pointer text-xs ${view === "list" ? "bg-[#0B1628] text-white" : "bg-white text-slate-400"}`}>List</button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((m) => (
            <div
              key={m.id}
              onClick={() => toggleSelect(m.id)}
              className={`rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                selected.includes(m.id) ? "border-[#4DA3E8] shadow-[0_0_0_2px_rgba(77,163,232,0.2)]" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="h-[160px] relative overflow-hidden bg-slate-100">
                <img src={m.url} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                {selected.includes(m.id) && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#4DA3E8] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/50 text-white backdrop-blur-sm">{m.category}</span>
                </div>
              </div>
              <div className="p-3 bg-white">
                <div className="text-xs font-semibold text-[#1E293B] truncate">{m.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{m.size} · {m.date}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                {["", "Preview", "Name", "Category", "Size", "Date", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-[10px] tracking-[1.5px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-2.5">
                    <input type="checkbox" checked={selected.includes(m.id)} onChange={() => toggleSelect(m.id)} className="cursor-pointer" />
                  </td>
                  <td className="px-4 py-2.5">
                    <img src={m.url} alt={m.name} className="w-10 h-10 rounded-lg object-cover" />
                  </td>
                  <td className="px-4 py-2.5 text-sm font-semibold text-[#1E293B]">{m.name}</td>
                  <td className="px-4 py-2.5"><span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#EBF5FF] text-[#4DA3E8]">{m.category}</span></td>
                  <td className="px-4 py-2.5 text-sm text-slate-400">{m.size}</td>
                  <td className="px-4 py-2.5 text-sm text-slate-400">{m.date}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-2">
                      <button className="text-[#4DA3E8] text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Copy URL</button>
                      <button className="text-red-400 text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
