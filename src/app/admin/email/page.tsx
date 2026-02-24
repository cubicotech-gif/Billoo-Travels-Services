"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

const campaigns = [
  { id: 1, name: "Ramadan Umrah Special 2025", status: "Sent", date: "Jan 20, 2025", recipients: 2450, opened: 1832, clicked: 456, rate: "74.8%" },
  { id: 2, name: "Early Bird Hajj Discount", status: "Sent", date: "Jan 15, 2025", recipients: 2450, opened: 1567, clicked: 389, rate: "64.0%" },
  { id: 3, name: "New Year Travel Deals", status: "Sent", date: "Dec 28, 2024", recipients: 2200, opened: 1540, clicked: 312, rate: "70.0%" },
  { id: 4, name: "Summer Turkey Packages", status: "Draft", date: "—", recipients: 0, opened: 0, clicked: 0, rate: "—" },
  { id: 5, name: "Hajj 2025 Last Call", status: "Scheduled", date: "Feb 15, 2025", recipients: 2500, opened: 0, clicked: 0, rate: "—" },
];

const templates = [
  { id: 1, name: "Package Promotion", desc: "Showcase featured packages with pricing", uses: 12 },
  { id: 2, name: "Booking Confirmation", desc: "Automated booking confirmation email", uses: 1247 },
  { id: 3, name: "Payment Reminder", desc: "Gentle reminder for pending payments", uses: 89 },
  { id: 4, name: "Travel Tips Newsletter", desc: "Monthly newsletter with travel insights", uses: 6 },
  { id: 5, name: "Welcome Email", desc: "New subscriber welcome message", uses: 2450 },
];

const statusStyle: Record<string, string> = {
  Sent: "bg-emerald-50 text-emerald-600",
  Draft: "bg-slate-100 text-slate-500",
  Scheduled: "bg-blue-50 text-blue-600",
};

export default function AdminEmail() {
  const [tab, setTab] = useState<"campaigns" | "compose" | "templates" | "subscribers">("campaigns");

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Email Marketing</h1>
          <p className="text-sm text-slate-400 mt-1">2,500 subscribers · 68% avg open rate</p>
        </div>
        <button onClick={() => setTab("compose")} className="bg-[#4DA3E8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>
          ✉ New Campaign
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white rounded-xl border border-slate-200 p-1 w-fit">
        {(["campaigns", "compose", "templates", "subscribers"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all border-none capitalize ${tab === t ? "bg-[#0B1628] text-white" : "bg-transparent text-slate-500 hover:text-[#1E293B]"}`} style={{ fontFamily: "'Sora', sans-serif" }}>{t}</button>
        ))}
      </div>

      {/* KPIs */}
      {tab === "campaigns" && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Campaigns Sent", value: "24" },
              { label: "Avg Open Rate", value: "68.2%" },
              { label: "Avg Click Rate", value: "18.6%" },
              { label: "Subscribers", value: "2,500" },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="text-[11px] tracking-[1px] text-slate-400 uppercase mb-2 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
                <div className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{s.value}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    {["Campaign", "Status", "Date", "Recipients", "Opened", "Clicked", "Open Rate", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-3 text-[10px] tracking-[1.5px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => (
                    <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#1E293B] max-w-[200px]">{c.name}</td>
                      <td className="px-5 py-3.5"><span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${statusStyle[c.status]}`}>{c.status}</span></td>
                      <td className="px-5 py-3.5 text-sm text-slate-400">{c.date}</td>
                      <td className="px-5 py-3.5 text-sm text-slate-500">{c.recipients.toLocaleString()}</td>
                      <td className="px-5 py-3.5 text-sm text-slate-500">{c.opened.toLocaleString()}</td>
                      <td className="px-5 py-3.5 text-sm text-slate-500">{c.clicked.toLocaleString()}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#4DA3E8]">{c.rate}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-2">
                          <button className="text-[#4DA3E8] text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">{c.status === "Draft" ? "Edit" : "View"}</button>
                          <button className="text-slate-400 text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Duplicate</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Compose */}
      {tab === "compose" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-[#1E293B] mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>Compose Campaign</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Campaign Name</label>
                <input placeholder="e.g. Ramadan Umrah Special" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
              </div>
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Template</label>
                <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white cursor-pointer focus:outline-none focus:border-[#4DA3E8]">
                  <option value="">Select template...</option>
                  {templates.map((t) => <option key={t.id}>{t.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Subject Line</label>
              <input placeholder="e.g. ✨ Exclusive Ramadan Umrah Packages — Book Now!" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Recipients</label>
                <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white cursor-pointer focus:outline-none focus:border-[#4DA3E8]">
                  <option>All Subscribers (2,500)</option>
                  <option>VIP Clients (156)</option>
                  <option>Previous Umrah Pilgrims (890)</option>
                  <option>Previous Hajj Pilgrims (312)</option>
                  <option>New Leads (445)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Schedule</label>
                <input type="datetime-local" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8]" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Email Body</label>
              <textarea rows={12} placeholder="Write your email content here...&#10;&#10;You can use HTML for formatting." className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] resize-none focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300 leading-relaxed" />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button className="bg-[#4DA3E8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Send Now</button>
            <button className="bg-transparent text-[#1E293B] px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-slate-200 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Schedule</button>
            <button className="bg-transparent text-slate-400 px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-slate-200 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Save Draft</button>
          </div>
        </div>
      )}

      {/* Templates */}
      {tab === "templates" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:border-[#4DA3E8] hover:shadow-sm transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-[#EBF5FF] flex items-center justify-center mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4DA3E8" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
              </div>
              <h4 className="text-sm font-bold text-[#1E293B] mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>{t.name}</h4>
              <p className="text-xs text-slate-400 mb-3">{t.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Used {t.uses}×</span>
                <button className="text-[#4DA3E8] text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Edit</button>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-xl border-2 border-dashed border-slate-200 p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#4DA3E8] transition-all min-h-[160px]">
            <div className="text-2xl text-slate-300">＋</div>
            <span className="text-sm text-slate-400 font-semibold">New Template</span>
          </div>
        </div>
      )}

      {/* Subscribers */}
      {tab === "subscribers" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Subscriber Lists</h3>
            <button className="bg-[#0B1628] text-white px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer border-none" style={{ fontFamily: "'Sora', sans-serif" }}>＋ Import CSV</button>
          </div>
          <div className="space-y-3">
            {[
              { name: "All Subscribers", count: 2500, growth: "+45 this month" },
              { name: "VIP Clients", count: 156, growth: "+8 this month" },
              { name: "Previous Umrah Pilgrims", count: 890, growth: "+23 this month" },
              { name: "Previous Hajj Pilgrims", count: 312, growth: "+5 this month" },
              { name: "New Leads", count: 445, growth: "+67 this month" },
              { name: "Unsubscribed", count: 34, growth: "+2 this month" },
            ].map((l, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-[#4DA3E8] transition-all">
                <div>
                  <div className="text-sm font-semibold text-[#1E293B]">{l.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{l.growth}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{l.count.toLocaleString()}</span>
                  <button className="text-[#4DA3E8] text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Manage</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
