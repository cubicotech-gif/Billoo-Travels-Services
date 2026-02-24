"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

const monthlyData = [
  { month: "Jul", revenue: 15.2, bookings: 42, avg: 361 },
  { month: "Aug", revenue: 18.1, bookings: 51, avg: 355 },
  { month: "Sep", revenue: 22.4, bookings: 63, avg: 356 },
  { month: "Oct", revenue: 19.8, bookings: 55, avg: 360 },
  { month: "Nov", revenue: 25.3, bookings: 72, avg: 351 },
  { month: "Dec", revenue: 30.1, bookings: 85, avg: 354 },
  { month: "Jan", revenue: 28.5, bookings: 78, avg: 365 },
];

const packagePerformance = [
  { name: "Royal Umrah Retreat", bookings: 156, revenue: "PKR 195M", share: 38, trend: "+15%" },
  { name: "Executive Hajj", bookings: 89, revenue: "PKR 311.5M", share: 28, trend: "+8%" },
  { name: "Premium Umrah", bookings: 234, revenue: "PKR 198.9M", share: 22, trend: "+22%" },
  { name: "Budget Umrah", bookings: 312, revenue: "PKR 109.2M", share: 8, trend: "+5%" },
  { name: "Family Hajj Special", bookings: 45, revenue: "PKR 126M", share: 4, trend: "New" },
];

const topSources = [
  { source: "WhatsApp Referral", leads: 312, conversion: "34%", bar: 85 },
  { source: "Website Form", leads: 245, conversion: "28%", bar: 65 },
  { source: "Walk-in", leads: 189, conversion: "52%", bar: 50 },
  { source: "Social Media", leads: 156, conversion: "18%", bar: 42 },
  { source: "Google Search", leads: 98, conversion: "22%", bar: 26 },
];

export default function AdminReports() {
  const [period, setPeriod] = useState("7 months");

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Sales Reports</h1>
          <p className="text-sm text-slate-400 mt-1">Revenue and booking analytics</p>
        </div>
        <div className="flex gap-2">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-500 bg-white cursor-pointer focus:outline-none" style={{ fontFamily: "'Sora', sans-serif" }}>
            <option>7 months</option><option>12 months</option><option>This year</option><option>All time</option>
          </select>
          <button className="bg-[#0B1628] text-white px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer border-none hover:bg-[#152545] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>↓ Export PDF</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Revenue", value: "PKR 159.4M", change: "+12.3%", up: true },
          { label: "Total Bookings", value: "446", change: "+18.5%", up: true },
          { label: "Avg. Booking Value", value: "PKR 357K", change: "+2.1%", up: true },
          { label: "Conversion Rate", value: "31.2%", change: "-1.4%", up: false },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-[11px] tracking-[1px] text-slate-400 uppercase mb-2 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
            <div className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{s.value}</div>
            <div className={`text-xs font-semibold mt-1 ${s.up ? "text-emerald-500" : "text-red-400"}`}>{s.change} vs prev period</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Revenue Trend (PKR Millions)</h3>
          <div className="flex gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#4DA3E8]" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#E2E8F0]" /> Bookings</span>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 h-[220px] px-2">
          {monthlyData.map((m, i) => {
            const maxRev = Math.max(...monthlyData.map(r => r.revenue));
            const maxBook = Math.max(...monthlyData.map(r => r.bookings));
            const hRev = (m.revenue / maxRev) * 100;
            const hBook = (m.bookings / maxBook) * 60;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-[11px] font-semibold text-[#4DA3E8]" style={{ fontFamily: "'Sora', sans-serif" }}>{m.revenue}M</div>
                <div className="w-full flex gap-1 items-end justify-center" style={{ height: "160px" }}>
                  <div className="w-[45%] rounded-t-md bg-gradient-to-t from-[#2B7CC4] to-[#5CB8FF] transition-all" style={{ height: `${hRev}%` }} />
                  <div className="w-[35%] rounded-t-md bg-[#E2E8F0] transition-all" style={{ height: `${hBook}%` }} />
                </div>
                <div className="text-[11px] text-slate-400 mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{m.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Package Performance */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-base font-bold text-[#1E293B] mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>Package Performance</h3>
          <div className="space-y-4">
            {packagePerformance.map((p, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-[#1E293B] truncate">{p.name}</span>
                    <span className="text-xs font-semibold text-emerald-500 shrink-0 ml-2">{p.trend}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#4DA3E8] to-[#5CB8FF] transition-all" style={{ width: `${p.share}%` }} />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[11px] text-slate-400">{p.bookings} bookings</span>
                    <span className="text-[11px] font-semibold text-slate-500">{p.revenue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-base font-bold text-[#1E293B] mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>Lead Sources</h3>
          <div className="space-y-4">
            {topSources.map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-[#1E293B]">{s.source}</span>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{s.leads} leads</span>
                    <span className="font-semibold text-[#4DA3E8]">{s.conversion}</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${s.bar}%`, background: i === 0 ? "#4DA3E8" : i === 1 ? "#5CB8FF" : i === 2 ? "#10B981" : i === 3 ? "#F59E0B" : "#8B5CF6" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 pb-4">
          <h3 className="text-base font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Monthly Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                {["Month", "Revenue (PKR)", "Bookings", "Avg. Value (PKR)", "Growth"].map((h) => (
                  <th key={h} className="px-6 py-3 text-[10px] tracking-[1.5px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((m, i) => {
                const prev = i > 0 ? monthlyData[i - 1].revenue : m.revenue;
                const growth = ((m.revenue - prev) / prev * 100).toFixed(1);
                return (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-sm font-semibold text-[#1E293B]">{m.month} 2025</td>
                    <td className="px-6 py-3.5 text-sm font-semibold text-[#4DA3E8]">{m.revenue}M</td>
                    <td className="px-6 py-3.5 text-sm text-slate-500">{m.bookings}</td>
                    <td className="px-6 py-3.5 text-sm text-slate-500">{m.avg}K</td>
                    <td className="px-6 py-3.5">
                      <span className={`text-xs font-semibold ${parseFloat(growth) >= 0 ? "text-emerald-500" : "text-red-400"}`}>
                        {parseFloat(growth) >= 0 ? "+" : ""}{growth}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
