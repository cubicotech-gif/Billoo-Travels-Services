"use client";

import { useState, useEffect, useRef } from "react";
import AdminLayout from "@/components/AdminLayout";

const tabs = ["General", "Branding", "SEO", "Social", "Notifications"] as const;

// ─── Branding Tab ─────────────────────────────────────────────────────────────

function BrandingTab() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoWidth, setLogoWidth] = useState(120);
  const [logoHeight, setLogoHeight] = useState(40);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/site-settings")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setLogoUrl(data.logo_url ?? null);
          setLogoWidth(data.logo_width ?? 120);
          setLogoHeight(data.logo_height ?? 40);
        }
      })
      .catch(() => {});
  }, []);

  function showToast(type: "success" | "error", msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  }

  async function uploadLogo(file: File) {
    if (!file.type.startsWith("image/")) {
      showToast("error", "Only image files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showToast("error", "File size must be under 2 MB.");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("bucket", "branding");
      fd.append("folder", "logo");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");
      setLogoUrl(json.url);
      showToast("success", "Logo uploaded. Click Save Branding to apply.");
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function saveSettings() {
    setSaving(true);
    try {
      const res = await fetch("/api/site-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logo_url: logoUrl, logo_width: logoWidth, logo_height: logoHeight }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Save failed");
      showToast("success", "Branding saved. Logo is now live on the site.");
    } catch (err: unknown) {
      showToast("error", err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl text-sm font-semibold shadow-lg ${
            toast.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
          }`}
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          {toast.msg}
        </div>
      )}

      {/* Upload */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-[#1E293B] mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>Site Logo</h3>
        <p className="text-[13px] text-slate-400 mb-5">
          Upload your logo (PNG, SVG, JPG, WEBP · max 2 MB). It will replace the text placeholder in the navbar.
        </p>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Drop zone */}
          <div
            className={`relative flex flex-col items-center justify-center w-full md:w-64 h-40 rounded-xl border-2 border-dashed transition-all cursor-pointer select-none ${
              dragOver ? "border-[#4DA3E8] bg-blue-50" : "border-slate-200 hover:border-[#4DA3E8] hover:bg-slate-50"
            }`}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files[0];
              if (f) uploadLogo(f);
            }}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadLogo(f);
                e.target.value = "";
              }}
            />
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-7 h-7 border-2 border-[#4DA3E8] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-slate-400">Uploading…</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-center px-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <span className="text-xs text-slate-400 leading-relaxed">
                  Drag & drop or <span className="text-[#4DA3E8] font-semibold">click to upload</span><br />
                  PNG · SVG · JPG · WEBP
                </span>
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            <p className="text-[11px] tracking-[1px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Live Preview
            </p>

            {/* Dark navbar */}
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#0B1628] w-full">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo preview" style={{ width: logoWidth, height: logoHeight, objectFit: "contain" }} />
              ) : (
                <>
                  <div className="w-9 h-9 rounded-[8px] bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold text-lg">B</div>
                  <div>
                    <div className="text-white text-sm font-bold tracking-wide" style={{ fontFamily: "'Sora', sans-serif" }}>BILLOO TRAVELS</div>
                    <div className="text-white/40 text-[9px] tracking-[2px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>PVT LTD · EST. 2000</div>
                  </div>
                </>
              )}
            </div>

            {/* Light navbar */}
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-slate-200 w-full">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo preview" style={{ width: logoWidth, height: logoHeight, objectFit: "contain" }} />
              ) : (
                <>
                  <div className="w-9 h-9 rounded-[8px] bg-[#0B1628] flex items-center justify-center text-[#4DA3E8] font-bold text-lg">B</div>
                  <div>
                    <div className="text-[#0B1628] text-sm font-bold tracking-wide" style={{ fontFamily: "'Sora', sans-serif" }}>BILLOO TRAVELS</div>
                    <div className="text-slate-400 text-[9px] tracking-[2px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>PVT LTD · EST. 2000</div>
                  </div>
                </>
              )}
            </div>

            <p className="text-[11px] text-slate-300" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              ↑ transparent nav &nbsp;·&nbsp; ↑ scrolled nav
            </p>

            {logoUrl && (
              <button
                onClick={() => setLogoUrl(null)}
                className="self-start text-xs text-red-400 hover:text-red-600 bg-transparent border-none cursor-pointer underline"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Remove logo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Size controls */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-[#1E293B] mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>Logo Size</h3>
        <p className="text-[13px] text-slate-400 mb-6">
          Adjust display size in the navbar. The image scales with object-fit: contain.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Width */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] tracking-[1px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Width</label>
              <div className="flex items-center gap-2">
                <input
                  type="number" min={40} max={300} value={logoWidth}
                  onChange={(e) => setLogoWidth(Math.min(300, Math.max(40, Number(e.target.value))))}
                  className="w-16 px-2 py-1 rounded-lg border border-slate-200 text-sm text-center text-[#1E293B] focus:outline-none focus:border-[#4DA3E8]"
                />
                <span className="text-xs text-slate-400">px</span>
              </div>
            </div>
            <input type="range" min={40} max={300} value={logoWidth}
              onChange={(e) => setLogoWidth(Number(e.target.value))}
              className="w-full accent-[#4DA3E8] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-300 mt-1"><span>40px</span><span>300px</span></div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {[80, 120, 160, 200].map((w) => (
                <button key={w} onClick={() => setLogoWidth(w)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
                    logoWidth === w ? "bg-[#4DA3E8] text-white border-[#4DA3E8]" : "bg-transparent text-slate-400 border-slate-200 hover:border-[#4DA3E8] hover:text-[#4DA3E8]"
                  }`}
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >{w}px</button>
              ))}
            </div>
          </div>

          {/* Height */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] tracking-[1px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Height</label>
              <div className="flex items-center gap-2">
                <input
                  type="number" min={20} max={80} value={logoHeight}
                  onChange={(e) => setLogoHeight(Math.min(80, Math.max(20, Number(e.target.value))))}
                  className="w-16 px-2 py-1 rounded-lg border border-slate-200 text-sm text-center text-[#1E293B] focus:outline-none focus:border-[#4DA3E8]"
                />
                <span className="text-xs text-slate-400">px</span>
              </div>
            </div>
            <input type="range" min={20} max={80} value={logoHeight}
              onChange={(e) => setLogoHeight(Number(e.target.value))}
              className="w-full accent-[#4DA3E8] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-300 mt-1"><span>20px</span><span>80px</span></div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {[28, 36, 44, 56].map((h) => (
                <button key={h} onClick={() => setLogoHeight(h)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
                    logoHeight === h ? "bg-[#4DA3E8] text-white border-[#4DA3E8]" : "bg-transparent text-slate-400 border-slate-200 hover:border-[#4DA3E8] hover:text-[#4DA3E8]"
                  }`}
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >{h}px</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={saveSettings}
          disabled={saving}
          className="bg-[#4DA3E8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          {saving ? "Saving…" : "Save Branding"}
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<string>("General");

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Manage your website and business settings.</p>
      </div>

      <div className="flex gap-1 mb-6 bg-white rounded-xl border border-slate-200 p-1 w-fit flex-wrap">
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

      {activeTab === "Branding" && <BrandingTab />}

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
