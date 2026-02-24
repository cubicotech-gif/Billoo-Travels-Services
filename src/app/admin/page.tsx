"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";

interface StatsData {
  totalBookings: number;
  confirmedBookings: number;
  totalRevenuePKR: number;
  activePackages: number;
  recentBookings: { id: string; contact_name: string; package_title: string; created_at: string; total_price: number; booking_status: string }[];
  monthlyRevenue: { month: string; value: number }[];
}

const statusColor: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-600",
  pending: "bg-amber-50 text-amber-600",
  processing: "bg-blue-50 text-blue-600",
  cancelled: "bg-red-50 text-red-600",
  completed: "bg-slate-100 text-slate-600",
};

function formatRevenuePKR(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export default function AdminDashboard() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const stats = data
    ? [
        { label: "Total Bookings", value: String(data.totalBookings), sub: `${data.confirmedBookings} confirmed` },
        { label: "Revenue (PKR)", value: `PKR ${formatRevenuePKR(data.totalRevenuePKR)}`, sub: "All time" },
        { label: "Active Packages", value: String(data.activePackages), sub: "Currently available" },
        { label: "Client Rating", value: "4.9★", sub: "Last 30 days" },
      ]
    : [];

  const monthlyRevenue = data?.monthlyRevenue || [];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">Welcome back — here&apos;s your overview.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse h-24" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-all">
              <div className="text-[11px] tracking-[1px] text-slate-400 uppercase mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
              <div className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{s.value}</div>
              <div className="text-[11px] text-slate-400 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Monthly Revenue</h3>
              <p className="text-xs text-slate-400 mt-0.5">Last 6 months (PKR in Millions)</p>
            </div>
          </div>
          {loading ? (
            <div className="h-[180px] bg-slate-50 rounded-lg animate-pulse" />
          ) : (
            <div className="flex items-end justify-between gap-3 h-[180px] px-2">
              {(monthlyRevenue.length > 0 ? monthlyRevenue : Array.from({ length: 6 }, (_, i) => ({ month: "—", value: 0 }))).map((m, i) => {
                const maxVal = Math.max(...monthlyRevenue.map((r) => r.value), 1);
                const h = Math.max((m.value / maxVal) * 100, 4);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-[11px] font-semibold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{m.value > 0 ? `${m.value}M` : ""}</div>
                    <div
                      className="w-full rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${h}%`, background: i === monthlyRevenue.length - 1 ? "linear-gradient(180deg, #4DA3E8, #2B7CC4)" : "#E2E8F0" }}
                    />
                    <div className="text-[11px] text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{m.month}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-base font-bold text-[#1E293B] mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Quick Actions</h3>
          <div className="space-y-3">
            {[
              { label: "Add Package", icon: "＋", color: "#4DA3E8", href: "/admin/packages" },
              { label: "View Bookings", icon: "📋", color: "#10B981", href: "/admin/bookings" },
              { label: "View Messages", icon: "✉", color: "#F59E0B", href: "/admin/crm" },
              { label: "Settings", icon: "⚙", color: "#8B5CF6", href: "/admin/settings" },
            ].map((a, i) => (
              <Link
                key={i}
                href={a.href}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:border-[#4DA3E8] hover:shadow-sm transition-all cursor-pointer text-left no-underline"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg" style={{ background: a.color }}>
                  {a.icon}
                </div>
                <span className="text-sm font-semibold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 pb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Recent Bookings</h3>
            <p className="text-xs text-slate-400 mt-0.5">Latest customer bookings</p>
          </div>
          <Link href="/admin/bookings" className="text-[#4DA3E8] text-sm font-semibold no-underline hover:underline" style={{ fontFamily: "'Sora', sans-serif" }}>
            View All →
          </Link>
        </div>
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-10 bg-slate-50 rounded animate-pulse" />)}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-t border-b border-slate-100">
                  {["ID", "Client", "Package", "Date", "Amount", "Status"].map((h) => (
                    <th key={h} className="px-6 py-3 text-[10px] tracking-[1.5px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(data?.recentBookings || []).map((b) => (
                  <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-sm font-semibold text-[#4DA3E8]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{b.id}</td>
                    <td className="px-6 py-3.5 text-sm font-semibold text-[#1E293B]">{b.contact_name}</td>
                    <td className="px-6 py-3.5 text-sm text-slate-500">{b.package_title}</td>
                    <td className="px-6 py-3.5 text-sm text-slate-400">{new Date(b.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-3.5 text-sm font-semibold text-[#1E293B]">PKR {b.total_price.toLocaleString()}</td>
                    <td className="px-6 py-3.5">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md capitalize ${statusColor[b.booking_status] || "bg-slate-100 text-slate-500"}`}>
                        {b.booking_status}
                      </span>
                    </td>
                  </tr>
                ))}
                {(!data?.recentBookings || data.recentBookings.length === 0) && (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-400 text-sm">No bookings yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
