"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

const packages = [
  { id: 1, title: "Royal Umrah Retreat", type: "Umrah", nights: 14, price: "PKR 1,250,000", hotel: "Raffles Makkah Palace", status: "Active", bookings: 156 },
  { id: 2, title: "Executive Hajj", type: "Hajj", nights: 21, price: "PKR 3,500,000", hotel: "Fairmont Clock Tower", status: "Active", bookings: 89 },
  { id: 3, title: "Premium Umrah", type: "Umrah", nights: 10, price: "PKR 850,000", hotel: "Hilton Suites Makkah", status: "Active", bookings: 234 },
  { id: 4, title: "Budget Umrah", type: "Umrah", nights: 7, price: "PKR 350,000", hotel: "Al Safwah Hotel", status: "Draft", bookings: 0 },
  { id: 5, title: "Family Hajj Special", type: "Hajj", nights: 18, price: "PKR 2,800,000", hotel: "Swissôtel Al Maqam", status: "Active", bookings: 45 },
];

const statusStyle: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-600",
  Draft: "bg-slate-100 text-slate-500",
  Archived: "bg-red-50 text-red-500",
};

export default function AdminPackages() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = packages.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || p.type === filter || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Packages</h1>
          <p className="text-sm text-slate-400 mt-1">{packages.length} total packages</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#4DA3E8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all flex items-center gap-2"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          ＋ Add Package
        </button>
      </div>

      {/* Form Panel */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>New Package</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 bg-transparent border-none cursor-pointer hover:text-slate-600 text-lg">✕</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Package Title", placeholder: "e.g. Royal Umrah Retreat", type: "text" },
              { label: "Type", placeholder: "", type: "select", options: ["Umrah", "Hajj", "Tour"] },
              { label: "Nights", placeholder: "e.g. 14", type: "number" },
              { label: "Hotel", placeholder: "e.g. Raffles Makkah Palace", type: "text" },
              { label: "Price (PKR)", placeholder: "e.g. 1250000", type: "number" },
              { label: "Price (USD)", placeholder: "e.g. 4499", type: "number" },
              { label: "Price (SAR)", placeholder: "e.g. 16800", type: "number" },
              { label: "Start Date", placeholder: "", type: "date" },
              { label: "Status", placeholder: "", type: "select", options: ["Active", "Draft"] },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{f.label}</label>
                {f.type === "select" ? (
                  <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] cursor-pointer focus:outline-none focus:border-[#4DA3E8]">
                    {f.options?.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={f.type} placeholder={f.placeholder} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Description</label>
            <textarea rows={3} placeholder="Package description..." className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] resize-none focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
          </div>
          <div className="flex gap-3 mt-5">
            <button className="bg-[#4DA3E8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Save Package</button>
            <button onClick={() => setShowForm(false)} className="bg-transparent text-slate-500 px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-slate-200 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search packages..."
          className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-white flex-1 max-w-xs focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300"
        />
        <div className="flex gap-2">
          {["All", "Umrah", "Hajj", "Active", "Draft"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${
                filter === f ? "bg-[#0B1628] text-white border-[#0B1628]" : "bg-white text-slate-500 border-slate-200 hover:border-[#4DA3E8]"
              }`}
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                {["Package", "Type", "Nights", "Hotel", "Price", "Bookings", "Status", "Actions"].map((h) => (
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
                  <td className="px-6 py-3.5 text-sm font-semibold text-[#1E293B]">{p.price}</td>
                  <td className="px-6 py-3.5 text-sm text-slate-500">{p.bookings}</td>
                  <td className="px-6 py-3.5"><span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${statusStyle[p.status]}`}>{p.status}</span></td>
                  <td className="px-6 py-3.5">
                    <div className="flex gap-2">
                      <button className="text-[#4DA3E8] text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Edit</button>
                      <button className="text-red-400 text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-10 text-center text-slate-400 text-sm">No packages found matching your criteria.</div>
        )}
      </div>
    </AdminLayout>
  );
}
