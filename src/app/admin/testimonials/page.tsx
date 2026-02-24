"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

const testimonials = [
  { id: 1, name: "Fatima Hassan", role: "Executive Hajj '24", text: "The proximity to the Haram and flawless logistics allowed us to focus entirely on worship. Truly transcendent.", rating: 5, status: "Published", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" },
  { id: 2, name: "Khalid Abdullah", role: "Royal Umrah '24", text: "Impeccable from start to finish. The Clock Tower suite and VIP transfers exceeded all expectations.", rating: 5, status: "Published", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
  { id: 3, name: "Dr. Aisha Siddiqui", role: "Family Umrah '24", text: "Traveling with three children was seamless. The personal concierge was an absolute game changer for our family.", rating: 5, status: "Published", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" },
  { id: 4, name: "Omar Farooq", role: "Premium Umrah '24", text: "Best travel agency experience I've ever had. Will definitely book again for Hajj next year.", rating: 4, status: "Pending", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
];

const statusStyle: Record<string, string> = {
  Published: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
  Hidden: "bg-slate-100 text-slate-500",
};

export default function AdminTestimonials() {
  const [showForm, setShowForm] = useState(false);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Testimonials</h1>
          <p className="text-sm text-slate-400 mt-1">{testimonials.length} reviews</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#4DA3E8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all flex items-center gap-2"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          ＋ Add Testimonial
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>New Testimonial</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 bg-transparent border-none cursor-pointer hover:text-slate-600 text-lg">✕</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Client Name</label>
              <input placeholder="e.g. Ahmad Khan" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Package / Role</label>
              <input placeholder="e.g. Executive Hajj '24" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Rating</label>
              <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white cursor-pointer focus:outline-none focus:border-[#4DA3E8]">
                <option>5 Stars</option><option>4 Stars</option><option>3 Stars</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Photo URL</label>
              <input placeholder="https://..." className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Status</label>
              <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white cursor-pointer focus:outline-none focus:border-[#4DA3E8]">
                <option>Published</option><option>Pending</option><option>Hidden</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Review Text</label>
            <textarea rows={3} placeholder="Client's review..." className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white resize-none focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
          </div>
          <div className="flex gap-3 mt-5">
            <button className="bg-[#4DA3E8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Save</button>
            <button onClick={() => setShowForm(false)} className="bg-transparent text-slate-500 px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-slate-200 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-sm transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={t.img} alt={t.name} className="w-11 h-11 rounded-full object-cover border-2 border-slate-100" />
                <div>
                  <div className="font-semibold text-sm text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{t.name}</div>
                  <div className="text-[11px] text-[#4DA3E8]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{t.role}</div>
                </div>
              </div>
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${statusStyle[t.status]}`}>{t.status}</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed italic mb-4">&ldquo;{t.text}&rdquo;</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-sm ${i < t.rating ? "text-amber-400" : "text-slate-200"}`}>★</span>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="text-[#4DA3E8] text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Edit</button>
                <button className="text-red-400 text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
