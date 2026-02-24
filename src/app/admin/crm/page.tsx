"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

const clients = [
  { id: "C-001", name: "Ahmad Khan", email: "ahmad.khan@email.com", phone: "+92 300 1234567", totalBookings: 3, totalSpent: "PKR 5,850,000", lastBooking: "Jan 28, 2025", status: "VIP", tag: "Repeat" },
  { id: "C-002", name: "Fatima Noor", email: "fatima.noor@email.com", phone: "+92 321 9876543", totalBookings: 1, totalSpent: "PKR 3,500,000", lastBooking: "Jan 27, 2025", status: "Active", tag: "New" },
  { id: "C-003", name: "Khalid Raza", email: "khalid.raza@email.com", phone: "+92 333 4567890", totalBookings: 2, totalSpent: "PKR 2,100,000", lastBooking: "Jan 26, 2025", status: "Active", tag: "Repeat" },
  { id: "C-004", name: "Sara Ahmed", email: "sara.ahmed@email.com", phone: "+92 312 3456789", totalBookings: 1, totalSpent: "PKR 1,250,000", lastBooking: "Jan 25, 2025", status: "Active", tag: "New" },
  { id: "C-005", name: "Usman Ali", email: "usman.ali@email.com", phone: "+92 345 6789012", totalBookings: 5, totalSpent: "PKR 12,300,000", lastBooking: "Jan 24, 2025", status: "VIP", tag: "Loyal" },
  { id: "C-006", name: "Zainab Malik", email: "zainab.malik@email.com", phone: "+92 301 2345678", totalBookings: 2, totalSpent: "PKR 1,700,000", lastBooking: "Dec 15, 2024", status: "Inactive", tag: "Repeat" },
  { id: "C-007", name: "Bilal Hussain", email: "bilal.h@email.com", phone: "+92 322 8765432", totalBookings: 1, totalSpent: "PKR 850,000", lastBooking: "Nov 20, 2024", status: "Active", tag: "New" },
  { id: "C-008", name: "Ayesha Siddiqui", email: "ayesha.s@email.com", phone: "+92 311 5678901", totalBookings: 4, totalSpent: "PKR 8,750,000", lastBooking: "Jan 20, 2025", status: "VIP", tag: "Loyal" },
];

const statusStyle: Record<string, string> = {
  VIP: "bg-amber-50 text-amber-600",
  Active: "bg-emerald-50 text-emerald-600",
  Inactive: "bg-slate-100 text-slate-500",
};

const tagStyle: Record<string, string> = {
  New: "bg-blue-50 text-blue-600",
  Repeat: "bg-purple-50 text-purple-600",
  Loyal: "bg-emerald-50 text-emerald-600",
};

export default function AdminCRM() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const filtered = clients.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || c.status === filter || c.tag === filter;
    return matchSearch && matchFilter;
  });

  const detail = clients.find((c) => c.id === selectedClient);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Client CRM</h1>
          <p className="text-sm text-slate-400 mt-1">{clients.length} clients · {clients.filter(c => c.status === "VIP").length} VIP</p>
        </div>
        <button className="bg-[#4DA3E8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all flex items-center gap-2" style={{ fontFamily: "'Sora', sans-serif" }}>
          ↓ Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Clients", value: clients.length.toString(), color: "#4DA3E8" },
          { label: "VIP Clients", value: clients.filter(c => c.status === "VIP").length.toString(), color: "#F59E0B" },
          { label: "Total Revenue", value: "PKR 36.3M", color: "#10B981" },
          { label: "Avg. Spend", value: "PKR 4.5M", color: "#8B5CF6" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-[11px] tracking-[1px] text-slate-400 uppercase mb-2 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
            <div className="text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Client List */}
        <div>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clients..." className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-white flex-1 max-w-xs focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
            <div className="flex gap-2 flex-wrap">
              {["All", "VIP", "Active", "Inactive", "New", "Loyal"].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${filter === f ? "bg-[#0B1628] text-white border-[#0B1628]" : "bg-white text-slate-500 border-slate-200 hover:border-[#4DA3E8]"}`} style={{ fontFamily: "'Sora', sans-serif" }}>{f}</button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    {["Client", "Bookings", "Total Spent", "Last Booking", "Status", "Tag"].map((h) => (
                      <th key={h} className="px-5 py-3 text-[10px] tracking-[1.5px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} onClick={() => setSelectedClient(c.id)} className={`border-b border-slate-50 cursor-pointer transition-colors ${selectedClient === c.id ? "bg-[#EBF5FF]" : "hover:bg-slate-50/50"}`}>
                      <td className="px-5 py-3.5">
                        <div className="text-sm font-semibold text-[#1E293B]">{c.name}</div>
                        <div className="text-[11px] text-slate-400">{c.email}</div>
                      </td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#1E293B]">{c.totalBookings}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#1E293B]">{c.totalSpent}</td>
                      <td className="px-5 py-3.5 text-sm text-slate-400">{c.lastBooking}</td>
                      <td className="px-5 py-3.5"><span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${statusStyle[c.status]}`}>{c.status}</span></td>
                      <td className="px-5 py-3.5"><span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${tagStyle[c.tag]}`}>{c.tag}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Client Detail */}
        <div className="sticky top-20">
          {detail ? (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-[#0B1628] flex items-center justify-center text-[#4DA3E8] font-bold text-lg">{detail.name.charAt(0)}</div>
                <div>
                  <div className="text-base font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{detail.name}</div>
                  <div className="text-xs text-slate-400">{detail.id}</div>
                </div>
                <span className={`ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-md ${statusStyle[detail.status]}`}>{detail.status}</span>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: "Email", value: detail.email },
                  { label: "Phone", value: detail.phone },
                  { label: "Total Bookings", value: detail.totalBookings.toString() },
                  { label: "Total Spent", value: detail.totalSpent },
                  { label: "Last Booking", value: detail.lastBooking },
                ].map((f, i) => (
                  <div key={i} className="flex justify-between pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                    <span className="text-xs text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{f.label}</span>
                    <span className="text-sm font-semibold text-[#1E293B]">{f.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <button className="w-full bg-[#4DA3E8] text-white py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Send Email</button>
                <button className="w-full bg-[#25D366] text-white py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#1DA851] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>WhatsApp</button>
                <button className="w-full bg-transparent text-slate-500 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-slate-200 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>View Bookings</button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
              <div className="text-slate-300 text-4xl mb-3">👤</div>
              <div className="text-sm text-slate-400">Select a client to view details</div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
