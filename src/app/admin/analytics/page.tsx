"use client";

import AdminLayout from "@/components/AdminLayout";

const trafficData = [
  { source: "Organic Search", visitors: 12450, share: 42, change: "+18%" },
  { source: "Direct", visitors: 8230, share: 28, change: "+5%" },
  { source: "Social Media", visitors: 4560, share: 15, change: "+32%" },
  { source: "Referral", visitors: 2890, share: 10, change: "+12%" },
  { source: "Email", visitors: 1470, share: 5, change: "+8%" },
];

const topPages = [
  { page: "/", title: "Homepage", views: 18500, bounce: "32%", avgTime: "2:45" },
  { page: "/packages", title: "Packages", views: 12340, bounce: "28%", avgTime: "3:12" },
  { page: "/packages/1", title: "Royal Umrah Retreat", views: 8900, bounce: "22%", avgTime: "4:05" },
  { page: "/blog/complete-guide-umrah-2025", title: "Umrah Guide 2025", views: 6780, bounce: "35%", avgTime: "5:30" },
  { page: "/contact", title: "Contact", views: 5420, bounce: "41%", avgTime: "1:55" },
  { page: "/about", title: "About Us", views: 3210, bounce: "38%", avgTime: "2:15" },
];

const keywords = [
  { keyword: "umrah packages karachi", position: 3, volume: 2400, change: "↑ 2" },
  { keyword: "hajj packages 2025 pakistan", position: 5, volume: 1800, change: "↑ 1" },
  { keyword: "luxury umrah", position: 8, volume: 1200, change: "↑ 4" },
  { keyword: "billoo travels", position: 1, volume: 890, change: "—" },
  { keyword: "vip hajj package", position: 6, volume: 720, change: "↑ 3" },
  { keyword: "umrah visa karachi", position: 4, volume: 650, change: "↓ 1" },
];

const vitals = [
  { metric: "LCP", label: "Largest Contentful Paint", value: "1.8s", status: "Good", color: "#10B981" },
  { metric: "FID", label: "First Input Delay", value: "45ms", status: "Good", color: "#10B981" },
  { metric: "CLS", label: "Cumulative Layout Shift", value: "0.05", status: "Good", color: "#10B981" },
  { metric: "TTFB", label: "Time to First Byte", value: "320ms", status: "Good", color: "#10B981" },
  { metric: "FCP", label: "First Contentful Paint", value: "1.2s", status: "Good", color: "#10B981" },
  { metric: "INP", label: "Interaction to Next Paint", value: "120ms", status: "Needs Work", color: "#F59E0B" },
];

export default function AdminAnalytics() {
  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>SEO & Analytics</h1>
          <p className="text-sm text-slate-400 mt-1">Website performance and search rankings</p>
        </div>
        <select className="px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-500 bg-white cursor-pointer focus:outline-none" style={{ fontFamily: "'Sora', sans-serif" }}>
          <option>Last 30 days</option><option>Last 7 days</option><option>Last 90 days</option><option>This year</option>
        </select>
      </div>

      {/* Overview KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Visitors", value: "29,600", change: "+15.3%" },
          { label: "Page Views", value: "87,450", change: "+22.1%" },
          { label: "Avg Session", value: "3:28", change: "+8.5%" },
          { label: "Bounce Rate", value: "33.2%", change: "-2.1%" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-[11px] tracking-[1px] text-slate-400 uppercase mb-2 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
            <div className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{s.value}</div>
            <div className="text-xs font-semibold text-emerald-500 mt-1">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Traffic Sources */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-base font-bold text-[#1E293B] mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>Traffic Sources</h3>
          <div className="space-y-4">
            {trafficData.map((t, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-[#1E293B]">{t.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">{t.visitors.toLocaleString()}</span>
                    <span className="text-xs font-semibold text-emerald-500">{t.change}</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#4DA3E8] to-[#5CB8FF] transition-all" style={{ width: `${t.share}%` }} />
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{t.share}% of total traffic</div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Web Vitals */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-base font-bold text-[#1E293B] mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>Core Web Vitals</h3>
          <div className="grid grid-cols-2 gap-3">
            {vitals.map((v, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold tracking-[1px]" style={{ fontFamily: "'JetBrains Mono', monospace", color: v.color }}>{v.metric}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md" style={{ backgroundColor: v.color + "15", color: v.color }}>{v.status}</span>
                </div>
                <div className="text-xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{v.value}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{v.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
        <div className="p-6 pb-4">
          <h3 className="text-base font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Top Pages</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                {["Page", "Views", "Bounce Rate", "Avg. Time"].map((h) => (
                  <th key={h} className="px-6 py-3 text-[10px] tracking-[1.5px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topPages.map((p, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="text-sm font-semibold text-[#1E293B]">{p.title}</div>
                    <div className="text-[11px] text-[#4DA3E8]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p.page}</div>
                  </td>
                  <td className="px-6 py-3.5 text-sm font-semibold text-[#1E293B]">{p.views.toLocaleString()}</td>
                  <td className="px-6 py-3.5 text-sm text-slate-500">{p.bounce}</td>
                  <td className="px-6 py-3.5 text-sm text-slate-500">{p.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Keywords */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 pb-4">
          <h3 className="text-base font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Keyword Rankings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                {["Keyword", "Position", "Monthly Volume", "Change"].map((h) => (
                  <th key={h} className="px-6 py-3 text-[10px] tracking-[1.5px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {keywords.map((k, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5 text-sm font-semibold text-[#1E293B]">{k.keyword}</td>
                  <td className="px-6 py-3.5">
                    <span className="bg-[#0B1628] text-white text-xs font-bold px-2.5 py-1 rounded-md">#{k.position}</span>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-slate-500">{k.volume.toLocaleString()}/mo</td>
                  <td className="px-6 py-3.5">
                    <span className={`text-xs font-semibold ${k.change.includes("↑") ? "text-emerald-500" : k.change.includes("↓") ? "text-red-400" : "text-slate-400"}`}>{k.change}</span>
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
