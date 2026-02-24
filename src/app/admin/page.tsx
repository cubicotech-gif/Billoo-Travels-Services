"use client";

import AdminLayout from "@/components/AdminLayout";

const stats = [
  { label: "Total Bookings", value: "1,247", change: "+12%", up: true, period: "vs last month" },
  { label: "Revenue (PKR)", value: "28.5M", change: "+8.3%", up: true, period: "vs last month" },
  { label: "Active Packages", value: "12", change: "+2", up: true, period: "new this month" },
  { label: "Client Rating", value: "4.9★", change: "0.0", up: true, period: "last 30 days" },
];

const recentBookings = [
  { id: "BT-2501", client: "Ahmad Khan", package: "Royal Umrah Retreat", date: "Jan 28, 2025", amount: "PKR 1,250,000", status: "Confirmed" },
  { id: "BT-2502", client: "Fatima Noor", package: "Executive Hajj", date: "Jan 27, 2025", amount: "PKR 3,500,000", status: "Pending" },
  { id: "BT-2503", client: "Khalid Raza", package: "Premium Umrah", date: "Jan 26, 2025", amount: "PKR 850,000", status: "Confirmed" },
  { id: "BT-2504", client: "Sara Ahmed", package: "Royal Umrah Retreat", date: "Jan 25, 2025", amount: "PKR 1,250,000", status: "Processing" },
  { id: "BT-2505", client: "Usman Ali", package: "Executive Hajj", date: "Jan 24, 2025", amount: "PKR 3,500,000", status: "Confirmed" },
];

const quickActions = [
  { label: "Add Package", icon: "＋", color: "#4DA3E8" },
  { label: "New Blog Post", icon: "✎", color: "#10B981" },
  { label: "View Messages", icon: "✉", color: "#F59E0B" },
  { label: "Export Report", icon: "↓", color: "#8B5CF6" },
];

const monthlyRevenue = [
  { month: "Aug", value: 18 },
  { month: "Sep", value: 22 },
  { month: "Oct", value: 19 },
  { month: "Nov", value: 25 },
  { month: "Dec", value: 30 },
  { month: "Jan", value: 28.5 },
];

const statusColor: Record<string, string> = {
  Confirmed: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Processing: "bg-blue-50 text-blue-600",
  Cancelled: "bg-red-50 text-red-600",
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">Welcome back — here&apos;s your overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-all">
            <div className="text-[11px] tracking-[1px] text-slate-400 uppercase mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
            <div className="flex items-end justify-between">
              <div className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{s.value}</div>
              <div className={`text-xs font-semibold px-2 py-0.5 rounded-md ${s.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                {s.change}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">{s.period}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Monthly Revenue</h3>
              <p className="text-xs text-slate-400 mt-0.5">Last 6 months (PKR in Millions)</p>
            </div>
            <select className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-500 bg-white cursor-pointer focus:outline-none" style={{ fontFamily: "'Sora', sans-serif" }}>
              <option>Last 6 months</option>
              <option>Last 12 months</option>
              <option>This year</option>
            </select>
          </div>
          {/* Simple bar chart */}
          <div className="flex items-end justify-between gap-3 h-[180px] px-2">
            {monthlyRevenue.map((m, i) => {
              const maxVal = Math.max(...monthlyRevenue.map(r => r.value));
              const h = (m.value / maxVal) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-[11px] font-semibold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{m.value}M</div>
                  <div
                    className="w-full rounded-t-lg transition-all hover:opacity-80"
                    style={{
                      height: `${h}%`,
                      background: i === monthlyRevenue.length - 1
                        ? "linear-gradient(180deg, #4DA3E8, #2B7CC4)"
                        : "#E2E8F0",
                    }}
                  />
                  <div className="text-[11px] text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{m.month}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-base font-bold text-[#1E293B] mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((a, i) => (
              <button
                key={i}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:border-[#4DA3E8] hover:shadow-sm transition-all cursor-pointer text-left"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-lg" style={{ background: a.color }}>
                  {a.icon}
                </div>
                <span className="text-sm font-semibold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{a.label}</span>
              </button>
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
          <button className="text-[#4DA3E8] text-sm font-semibold bg-transparent border-none cursor-pointer hover:underline" style={{ fontFamily: "'Sora', sans-serif" }}>
            View All →
          </button>
        </div>
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
              {recentBookings.map((b) => (
                <tr key={b.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5 text-sm font-semibold text-[#4DA3E8]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{b.id}</td>
                  <td className="px-6 py-3.5 text-sm font-semibold text-[#1E293B]">{b.client}</td>
                  <td className="px-6 py-3.5 text-sm text-slate-500">{b.package}</td>
                  <td className="px-6 py-3.5 text-sm text-slate-400">{b.date}</td>
                  <td className="px-6 py-3.5 text-sm font-semibold text-[#1E293B]">{b.amount}</td>
                  <td className="px-6 py-3.5">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${statusColor[b.status] || ""}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
