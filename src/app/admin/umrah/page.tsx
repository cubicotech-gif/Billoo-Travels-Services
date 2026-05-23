"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UmrahSection {
  enabled: boolean;
  eyebrow: string;
  title: string;
  title_highlight: string;
  subtitle: string;
  bg_image: string;
  badge_enabled: boolean;
  badge_text: string;
  season_note: string;
  cta_label: string;
  cta_link: string;
}

const EMPTY: UmrahSection = {
  enabled: true,
  eyebrow: "",
  title: "",
  title_highlight: "",
  subtitle: "",
  bg_image: "",
  badge_enabled: true,
  badge_text: "",
  season_note: "",
  cta_label: "Explore Umrah Packages",
  cta_link: "/packages?type=Umrah",
};

const CLS =
  "w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300";

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label
        className="block text-[10px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

function ImageField({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("bucket", "media");
    fd.append("folder", "umrah");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const j = await res.json();
    setBusy(false);
    if (j.url) onChange(j.url);
  }

  return (
    <Field label="Background Image">
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or click Upload"
          className={CLS + " flex-1"}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => ref.current?.click()}
          className="px-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 hover:bg-[#EBF5FF] hover:text-[#4DA3E8] hover:border-[#4DA3E8] cursor-pointer transition-all disabled:opacity-50 whitespace-nowrap"
        >
          {busy ? "…" : "Upload"}
        </button>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
          }}
        />
      </div>
      {value && (
        <img
          src={value}
          alt="preview"
          className="mt-2 h-28 w-full object-cover rounded-lg border border-slate-200"
        />
      )}
    </Field>
  );
}

// ─── Main page ──────────────────────────────────────────────────────────────

export default function UmrahAdminPage() {
  const [form, setForm] = useState<UmrahSection>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tableExists, setTableExists] = useState<boolean | null>(null);
  const [toast, setToast] = useState("");

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  }

  function set<K extends keyof UmrahSection>(k: K, v: UmrahSection[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/umrah-section");
      const json = await res.json();
      setTableExists(json.tableExists !== false);
      if (json.section) setForm({ ...EMPTY, ...json.section });
    } catch {
      setTableExists(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/umrah-section", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    setSaving(false);
    if (json.error) {
      notify("Error: " + json.error);
      return;
    }
    notify("Saved! The homepage banner is updated.");
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1628]" style={{ fontFamily: "'Sora', sans-serif" }}>
              Umrah Season
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Your permanent seasonal banner on the homepage. Update it each season (1448, 1449…).
            </p>
          </div>
        </div>

        {/* DB setup notice */}
        {tableExists === false && !loading && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 flex gap-3 items-start">
            <svg className="flex-shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
              <path d="M12 9v4M12 17h.01" />
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-amber-900 text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>
                Database not set up yet
              </p>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                Go to <strong>Supabase → SQL Editor</strong>, paste the SQL from
                <code className="mx-1 px-1.5 py-0.5 bg-amber-100 rounded text-amber-800 font-mono text-[11px]">umrah-section-setup.sql</code>
                in the repository root, and click <strong>Run</strong>. It creates the table and seeds the 1448 banner.
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#4DA3E8] border-t-transparent rounded-full animate-spin" />
              Loading…
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">

            {/* Visibility toggle */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#0B1628] text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Show section on homepage
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Turn off to hide the whole banner between seasons.</p>
              </div>
              <button
                type="button"
                onClick={() => set("enabled", !form.enabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${form.enabled ? "bg-[#4DA3E8]" : "bg-slate-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.enabled ? "translate-x-6" : ""}`} />
              </button>
            </div>

            {/* Content card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
              <Field label="Eyebrow (small tag above title)" hint="e.g. NEW SEASON · 1448 AH">
                <input value={form.eyebrow} onChange={(e) => set("eyebrow", e.target.value)} placeholder="NEW SEASON · 1448 AH" className={CLS} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Title" hint="The main word, e.g. Umrah">
                  <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Umrah" className={CLS} />
                </Field>
                <Field label="Highlighted part" hint="Shown in italic blue, e.g. 1448">
                  <input value={form.title_highlight} onChange={(e) => set("title_highlight", e.target.value)} placeholder="1448" className={CLS} />
                </Field>
              </div>

              <Field label="Subtitle">
                <textarea value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} rows={3} placeholder="Short paragraph describing the season offer…" className={CLS + " resize-none"} />
              </Field>

              <ImageField value={form.bg_image} onChange={(url) => set("bg_image", url)} />
            </div>

            {/* Badges card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <Field label="Early-bird badge text" hint="e.g. Early-Bird Pricing · Limited Seats">
                  <input value={form.badge_text} onChange={(e) => set("badge_text", e.target.value)} placeholder="Early-Bird Pricing · Limited Seats" className={CLS} />
                </Field>
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" checked={form.badge_enabled} onChange={(e) => set("badge_enabled", e.target.checked)} className="w-4 h-4 accent-[#4DA3E8]" />
                Show the early-bird badge
              </label>
              <Field label="Season note (green pill)" hint="e.g. Bookings now open">
                <input value={form.season_note} onChange={(e) => set("season_note", e.target.value)} placeholder="Bookings now open" className={CLS} />
              </Field>
            </div>

            {/* CTA card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Button label">
                  <input value={form.cta_label} onChange={(e) => set("cta_label", e.target.value)} placeholder="Explore Umrah Packages" className={CLS} />
                </Field>
                <Field label="Button link" hint="Default opens the Umrah tab on the packages page">
                  <input value={form.cta_link} onChange={(e) => set("cta_link", e.target.value)} placeholder="/packages?type=Umrah" className={CLS} />
                </Field>
              </div>
            </div>

            {/* Hot packages info */}
            <div className="bg-[#EBF5FF] rounded-2xl border border-[#4DA3E8]/20 p-5 flex gap-3 items-start">
              <svg className="flex-shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2B7CC4" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
              </svg>
              <div className="flex-1 min-w-0 text-sm text-[#2B7CC4]">
                <p className="font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>About the &ldquo;hot packages&rdquo; shown here</p>
                <p className="text-xs mt-1 leading-relaxed text-[#2B7CC4]/90">
                  The package cards under this banner are pulled automatically from your <strong>Umrah</strong> packages that are marked <strong>Featured</strong>.
                  Manage them in{" "}
                  <Link href="/admin/packages" className="underline font-semibold">Packages</Link> — tick &ldquo;Featured&rdquo; on any Umrah package and it appears here.
                </p>
              </div>
            </div>

            {/* Save */}
            <div className="flex items-center justify-end gap-3 pb-4">
              <button
                type="submit"
                disabled={saving || tableExists === false}
                className="px-6 py-2.5 rounded-xl bg-[#4DA3E8] hover:bg-[#2B7CC4] text-white font-semibold text-sm border-none cursor-pointer transition-all disabled:opacity-60"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        )}

        {toast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0B1628] text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>
            {toast}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
