"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

const posts = [
  { id: 1, title: "Complete Guide to Umrah 2025", category: "Umrah", date: "Jan 15, 2025", status: "Published", views: 2340 },
  { id: 2, title: "Top 10 Tips for Comfortable Hajj", category: "Hajj", date: "Feb 5, 2025", status: "Published", views: 1890 },
  { id: 3, title: "Istanbul: Muslim Traveler's Paradise", category: "Travel", date: "Feb 18, 2025", status: "Published", views: 1245 },
  { id: 4, title: "Preparing Your Family for Umrah", category: "Umrah", date: "Mar 1, 2025", status: "Draft", views: 0 },
  { id: 5, title: "Best Hotels Near Masjid Al-Haram", category: "Guide", date: "Mar 10, 2025", status: "Draft", views: 0 },
];

const statusStyle: Record<string, string> = {
  Published: "bg-emerald-50 text-emerald-600",
  Draft: "bg-slate-100 text-slate-500",
};

export default function AdminBlog() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Blog Posts</h1>
          <p className="text-sm text-slate-400 mt-1">{posts.length} articles</p>
        </div>
        <button
          onClick={() => setShowEditor(!showEditor)}
          className="bg-[#4DA3E8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all flex items-center gap-2"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          ＋ New Post
        </button>
      </div>

      {/* Editor */}
      {showEditor && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>New Blog Post</h3>
            <button onClick={() => setShowEditor(false)} className="text-slate-400 bg-transparent border-none cursor-pointer hover:text-slate-600 text-lg">✕</button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Title</label>
              <input placeholder="Article title..." className="w-full px-4 py-3 rounded-lg border border-slate-200 text-base bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300 font-semibold" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Category</label>
                <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white cursor-pointer focus:outline-none focus:border-[#4DA3E8]">
                  <option>Umrah</option><option>Hajj</option><option>Travel</option><option>Guide</option><option>News</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Cover Image URL</label>
                <input placeholder="https://..." className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
              </div>
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Status</label>
                <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white cursor-pointer focus:outline-none focus:border-[#4DA3E8]">
                  <option>Draft</option><option>Published</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Short Description</label>
              <input placeholder="Brief summary for listing cards..." className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Content</label>
              <textarea rows={10} placeholder="Write your article here... (Markdown supported)" className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] resize-none focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300 leading-relaxed" />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button className="bg-[#4DA3E8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Publish</button>
            <button className="bg-transparent text-slate-500 px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-slate-200 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Save Draft</button>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                {["Title", "Category", "Date", "Views", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-3 text-[10px] tracking-[1.5px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5 text-sm font-semibold text-[#1E293B] max-w-[250px]">{p.title}</td>
                  <td className="px-6 py-3.5"><span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#EBF5FF] text-[#4DA3E8]">{p.category}</span></td>
                  <td className="px-6 py-3.5 text-sm text-slate-400">{p.date}</td>
                  <td className="px-6 py-3.5 text-sm text-slate-500">{p.views.toLocaleString()}</td>
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
      </div>
    </AdminLayout>
  );
}
