"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

const tabs = ["General", "SEO", "Social", "Notifications"] as const;

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<string>("General");

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your website and business settings.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white rounded-xl border border-slate-200 p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-all border-none ${
              activeTab === t ? "bg-[#0B1628] text-white" : "bg-transparent text-slate-500 hover:text-[#1E293B]"
            }`}
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* General */}
      {activeTab === "General" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-[#1E293B] mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Company Name", value: "Billoo Travels Services Pvt Ltd" },
              { label: "Agent ID", value: "1251" },
              { label: "Phone", value: "021-32313461-63" },
              { label: "Email", value: "vip@billootravels.com" },
              { label: "Address", value: "M2 Mezzanine, Plot 41c, DHA Phase 5, Karachi" },
              { label: "WhatsApp Number", value: "+922132313461" },
              { label: "CEO", value: "Mr. Shoaib Zakaria" },
              { label: "Managing Director", value: "Danish Zakariya Muhammad Sharif" },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{f.label}</label>
                <input defaultValue={f.value} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8]" />
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="text-lg font-bold text-[#1E293B] mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>Currency Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Default Currency</label>
                <select defaultValue="PKR" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white cursor-pointer focus:outline-none focus:border-[#4DA3E8]">
                  <option>PKR</option><option>USD</option><option>SAR</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>USD to PKR Rate</label>
                <input type="number" defaultValue="278" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8]" />
              </div>
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>SAR to PKR Rate</label>
                <input type="number" defaultValue="74" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8]" />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button className="bg-[#4DA3E8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Save Changes</button>
          </div>
        </div>
      )}

      {/* SEO */}
      {activeTab === "SEO" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-[#1E293B] mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Site Title</label>
              <input defaultValue="Billoo Travels Services Pvt Ltd | Premium Hajj & Umrah Packages" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8]" />
              <p className="text-[11px] text-slate-400 mt-1">Recommended: 50-60 characters</p>
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Meta Description</label>
              <textarea rows={3} defaultValue="Pakistan's premier travel agency for luxury Hajj, Umrah & international tours. VIP access, five-star comfort, and 20+ years of trusted service." className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white resize-none focus:outline-none focus:border-[#4DA3E8]" />
              <p className="text-[11px] text-slate-400 mt-1">Recommended: 150-160 characters</p>
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Keywords</label>
              <input defaultValue="Hajj packages, Umrah packages, luxury travel Pakistan, Billoo Travels, Karachi travel agency" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>OG Image URL</label>
                <input placeholder="https://billootravels.com/og-image.jpg" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
              </div>
              <div>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Canonical URL</label>
                <input defaultValue="https://billootravels.com" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8]" />
              </div>
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Google Analytics ID</label>
              <input placeholder="G-XXXXXXXXXX" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300 max-w-xs" />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="bg-[#4DA3E8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Save SEO Settings</button>
          </div>
        </div>
      )}

      {/* Social */}
      {activeTab === "Social" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-[#1E293B] mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Facebook", placeholder: "https://facebook.com/billootravels" },
              { label: "Instagram", placeholder: "https://instagram.com/billootravels" },
              { label: "Twitter / X", placeholder: "https://x.com/billootravels" },
              { label: "YouTube", placeholder: "https://youtube.com/@billootravels" },
              { label: "LinkedIn", placeholder: "https://linkedin.com/company/billootravels" },
              { label: "TikTok", placeholder: "https://tiktok.com/@billootravels" },
            ].map((s, i) => (
              <div key={i}>
                <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</label>
                <input placeholder={s.placeholder} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button className="bg-[#4DA3E8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Save Social Links</button>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === "Notifications" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-[#1E293B] mb-5" style={{ fontFamily: "'Sora', sans-serif" }}>Notification Settings</h3>
          <div className="space-y-5">
            {[
              { label: "New Booking Alert", desc: "Get notified when a new booking inquiry is submitted", default: true },
              { label: "Contact Form Submissions", desc: "Email notification for every contact form message", default: true },
              { label: "Payment Confirmations", desc: "Alert when a payment is received or verified", default: true },
              { label: "Low Availability Warning", desc: "Notify when a package has fewer than 5 spots remaining", default: false },
              { label: "Weekly Summary Report", desc: "Receive a weekly digest of bookings and revenue", default: true },
              { label: "Blog Comment Notifications", desc: "Get notified of new blog post comments", default: false },
            ].map((n, i) => (
              <div key={i} className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100 last:border-0 last:pb-0">
                <div>
                  <div className="text-sm font-semibold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{n.label}</div>
                  <div className="text-[13px] text-slate-400 mt-0.5">{n.desc}</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                  <input type="checkbox" defaultChecked={n.default} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4DA3E8]"></div>
                </label>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h4 className="text-sm font-bold text-[#1E293B] mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>Notification Email</h4>
            <input defaultValue="vip@billootravels.com" className="w-full max-w-sm px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8]" />
          </div>
          <div className="flex gap-3 mt-6">
            <button className="bg-[#4DA3E8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Save Preferences</button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
