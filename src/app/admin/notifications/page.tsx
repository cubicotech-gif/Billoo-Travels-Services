"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

const notifications = [
  { id: 1, type: "booking", title: "New Booking Received", desc: "Ahmad Khan booked Royal Umrah Retreat for 2 travelers", time: "2 minutes ago", read: false },
  { id: 2, type: "payment", title: "Payment Confirmed", desc: "PKR 2,500,000 received from Ahmad Khan via BankAlfalah", time: "5 minutes ago", read: false },
  { id: 3, type: "message", title: "New Contact Inquiry", desc: "Bilal Hussain sent a message about Hajj 2025 packages", time: "15 minutes ago", read: false },
  { id: 4, type: "payment", title: "Payment Reminder Due", desc: "Sara Ahmed — PKR 2,250,000 balance due Feb 25, 2025", time: "1 hour ago", read: true },
  { id: 5, type: "booking", title: "Booking Cancelled", desc: "Zainab Malik cancelled Premium Umrah booking — refund initiated", time: "2 hours ago", read: true },
  { id: 6, type: "system", title: "Weekly Report Ready", desc: "January Week 4 sales report is ready for download", time: "3 hours ago", read: true },
  { id: 7, type: "review", title: "New Testimonial", desc: "Omar Farooq submitted a 4-star review for Premium Umrah", time: "5 hours ago", read: true },
  { id: 8, type: "payment", title: "Deposit Received", desc: "PKR 4,200,000 deposit from Fatima Noor for Executive Hajj", time: "6 hours ago", read: true },
  { id: 9, type: "booking", title: "Departure Approaching", desc: "Khalid Raza — Premium Umrah departure in 5 days (Feb 20)", time: "8 hours ago", read: true },
  { id: 10, type: "system", title: "Package Alert", desc: "Executive Hajj package has only 3 spots remaining", time: "12 hours ago", read: true },
];

const typeIcon: Record<string, { emoji: string; bg: string }> = {
  booking: { emoji: "📋", bg: "bg-blue-50" },
  payment: { emoji: "💰", bg: "bg-emerald-50" },
  message: { emoji: "✉", bg: "bg-purple-50" },
  system: { emoji: "⚙", bg: "bg-slate-100" },
  review: { emoji: "⭐", bg: "bg-amber-50" },
};

export default function AdminNotifications() {
  const [filter, setFilter] = useState("All");
  const [items, setItems] = useState(notifications);

  const unreadCount = items.filter((n) => !n.read).length;
  const filtered = items.filter((n) => filter === "All" || n.type === filter);

  const markAllRead = () => setItems(items.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setItems(items.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Notifications</h1>
          <p className="text-sm text-slate-400 mt-1">{unreadCount} unread · {items.length} total</p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="bg-transparent text-[#4DA3E8] px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer border border-[#4DA3E8]/20 hover:bg-[#EBF5FF] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>
              ✓ Mark All Read
            </button>
          )}
          <button className="bg-[#0B1628] text-white px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer border-none" style={{ fontFamily: "'Sora', sans-serif" }}>
            ⚙ Settings
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
          { type: "All", count: items.length },
          { type: "booking", count: items.filter(n => n.type === "booking").length },
          { type: "payment", count: items.filter(n => n.type === "payment").length },
          { type: "message", count: items.filter(n => n.type === "message").length },
          { type: "system", count: items.filter(n => n.type === "system").length },
        ].map((s) => (
          <button
            key={s.type}
            onClick={() => setFilter(s.type)}
            className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
              filter === s.type ? "bg-[#0B1628] text-white border-[#0B1628]" : "bg-white text-[#1E293B] border-slate-200 hover:border-[#4DA3E8]"
            }`}
          >
            <div className="text-lg font-bold" style={{ fontFamily: "'Sora', sans-serif" }}>{s.count}</div>
            <div className={`text-xs capitalize ${filter === s.type ? "text-white/60" : "text-slate-400"}`}>{s.type === "All" ? "All" : s.type}</div>
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-sm">No notifications in this category.</div>
        ) : (
          <div>
            {filtered.map((n) => {
              const icon = typeIcon[n.type] || typeIcon.system;
              return (
                <div
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={`flex items-start gap-4 px-6 py-4 border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50/50 ${!n.read ? "bg-[#EBF5FF]/30" : ""}`}
                >
                  <div className={`w-10 h-10 rounded-xl ${icon.bg} flex items-center justify-center text-lg shrink-0 mt-0.5`}>
                    {icon.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-sm font-semibold ${!n.read ? "text-[#1E293B]" : "text-slate-500"}`} style={{ fontFamily: "'Sora', sans-serif" }}>{n.title}</span>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-[#4DA3E8] shrink-0" />}
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{n.desc}</p>
                    <span className="text-[11px] text-slate-300 mt-1 block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{n.time}</span>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="text-[#4DA3E8] text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">View</button>
                    <button className="text-slate-300 text-xs bg-transparent border-none cursor-pointer hover:text-red-400">✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
