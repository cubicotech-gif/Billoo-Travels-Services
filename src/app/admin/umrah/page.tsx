"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Spotlight {
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
  spotlight_type: string;
  secondary_enabled: boolean;
  secondary_type: string;
  secondary_eyebrow: string;
  secondary_title: string;
  secondary_title_highlight: string;
  secondary_subtitle: string;
  secondary_bg_image: string;
  secondary_cta_label: string;
  secondary_cta_link: string;
}

const CATEGORIES = ["Umrah", "Hajj", "Holidays", "Honeymoon"];

const EMPTY: Spotlight = {
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
  spotlight_type: "Umrah",
  secondary_enabled: false,
  secondary_type: "Holidays",
  secondary_eyebrow: "",
  secondary_title: "",
  secondary_title_highlight: "",
  secondary_subtitle: "",
  secondary_bg_image: "",
  secondary_cta_label: "Explore Holidays",
  secondary_cta_link: "/packages?type=Holidays",
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

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${on ? "bg-[#4DA3E8]" : "bg-slate-300"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? "translate-x-6" : ""}`} />
    </button>
  );
}

function ImageField({ label = "Background Image", value, onChange }: { label?: string; value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("bucket", "media");
    fd.append("folder", "spotlight");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const j = await res.json();
    setBusy(false);
    if (j.url) onChange(j.url);
  }

  return (
    <Field label={label}>
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
        <img src={value} alt="preview" className="mt-2 h-28 w-full object-cover rounded-lg border border-slate-200" />
      )}
    </Field>
  );
}

// ─── Main page ──────────────────────────────────────────────────────────────

export default function SpotlightAdminPage() {
  const [form, setForm] = useState<Spotlight>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tableExists, setTableExists] = useState<boolean | null>(null);
  const [toast, setToast] = useState("");

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  }

  function set<K extends keyof Spotlight>(k: K, v: Spotlight[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  // Changing a category auto-points its CTA link at that category's packages.
  function setPrimaryType(t: string) {
    setForm((f) => ({ ...f, spotlight_type: t, cta_link: `/packages?type=${t}` }));
  }
  function setSecondaryType(t: string) {
    setForm((f) => ({ ...f, secondary_type: t, secondary_cta_link: `/packages?type=${t}` }));
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
    notify("Saved! The homepage spotlight is updated.");
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0B1628]" style={{ fontFamily: "'Sora', sans-serif" }}>
            Seasonal Spotlight
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Two homepage banners you control per season — point the <strong>primary</strong> at whatever&apos;s
            peaking (Umrah, Hajj, Holidays…) and use the <strong>secondary</strong> for the next-best category.
          </p>
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
                <code className="mx-1 px-1.5 py-0.5 bg-amber-100 rounded text-amber-800 font-mono text-[11px]">seasonal-spotlight-setup.sql</code>
                in the repository root, and click <strong>Run</strong>.
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
                  Show spotlight on homepage
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Turn off to hide both banners between seasons.</p>
              </div>
              <Toggle on={form.enabled} onClick={() => set("enabled", !form.enabled)} />
            </div>

            {/* ── PRIMARY ── */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-[#0B1628]" style={{ fontFamily: "'Sora', sans-serif" }}>Primary Spotlight</h2>
                <span className="font-mono text-[10px] tracking-[1px] uppercase text-slate-400">Large banner</span>
              </div>

              <Field label="Spotlight category" hint="Which category this banner features. Auto-points the button below at it.">
                <select value={form.spotlight_type} onChange={(e) => setPrimaryType(e.target.value)} className={CLS + " cursor-pointer"}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>

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

              {/* Badges */}
              <div className="border-t border-slate-100 pt-5 space-y-4">
                <Field label="Early-bird badge text" hint="e.g. Early-Bird Pricing · Limited Seats">
                  <input value={form.badge_text} onChange={(e) => set("badge_text", e.target.value)} placeholder="Early-Bird Pricing · Limited Seats" className={CLS} />
                </Field>
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="checkbox" checked={form.badge_enabled} onChange={(e) => set("badge_enabled", e.target.checked)} className="w-4 h-4 accent-[#4DA3E8]" />
                  Show the early-bird badge
                </label>
                <Field label="Season note (green pill)" hint="e.g. Bookings now open">
                  <input value={form.season_note} onChange={(e) => set("season_note", e.target.value)} placeholder="Bookings now open" className={CLS} />
                </Field>
              </div>

              {/* CTA */}
              <div className="border-t border-slate-100 pt-5 grid grid-cols-2 gap-4">
                <Field label="Button label">
                  <input value={form.cta_label} onChange={(e) => set("cta_label", e.target.value)} placeholder="Explore Umrah Packages" className={CLS} />
                </Field>
                <Field label="Button link" hint="Auto-set from the category above; edit if needed.">
                  <input value={form.cta_link} onChange={(e) => set("cta_link", e.target.value)} placeholder="/packages?type=Umrah" className={CLS} />
                </Field>
              </div>
            </div>

            {/* ── SECONDARY ── */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-[#0B1628]" style={{ fontFamily: "'Sora', sans-serif" }}>Secondary Spotlight</h2>
                  <p className="text-xs text-slate-400 mt-0.5">A smaller band under the primary, for the next category.</p>
                </div>
                <Toggle on={form.secondary_enabled} onClick={() => set("secondary_enabled", !form.secondary_enabled)} />
              </div>

              <Field label="Spotlight category">
                <select value={form.secondary_type} onChange={(e) => setSecondaryType(e.target.value)} className={CLS + " cursor-pointer"}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>

              <Field label="Eyebrow" hint="e.g. ALSO THIS SEASON">
                <input value={form.secondary_eyebrow} onChange={(e) => set("secondary_eyebrow", e.target.value)} placeholder="ALSO THIS SEASON" className={CLS} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Title">
                  <input value={form.secondary_title} onChange={(e) => set("secondary_title", e.target.value)} placeholder="Worldwide" className={CLS} />
                </Field>
                <Field label="Highlighted part">
                  <input value={form.secondary_title_highlight} onChange={(e) => set("secondary_title_highlight", e.target.value)} placeholder="Holidays" className={CLS} />
                </Field>
              </div>

              <Field label="Subtitle">
                <textarea value={form.secondary_subtitle} onChange={(e) => set("secondary_subtitle", e.target.value)} rows={2} placeholder="One short line about this category…" className={CLS + " resize-none"} />
              </Field>

              <ImageField label="Background Image" value={form.secondary_bg_image} onChange={(url) => set("secondary_bg_image", url)} />

              <div className="grid grid-cols-2 gap-4">
                <Field label="Button label">
                  <input value={form.secondary_cta_label} onChange={(e) => set("secondary_cta_label", e.target.value)} placeholder="Explore Holidays" className={CLS} />
                </Field>
                <Field label="Button link" hint="Auto-set from the category above.">
                  <input value={form.secondary_cta_link} onChange={(e) => set("secondary_cta_link", e.target.value)} placeholder="/packages?type=Holidays" className={CLS} />
                </Field>
              </div>
            </div>

            {/* Packages info */}
            <div className="bg-[#EBF5FF] rounded-2xl border border-[#4DA3E8]/20 p-5 flex gap-3 items-start">
              <svg className="flex-shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2B7CC4" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
              </svg>
              <div className="flex-1 min-w-0 text-sm text-[#2B7CC4]">
                <p className="font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>Where do the package cards show?</p>
                <p className="text-xs mt-1 leading-relaxed text-[#2B7CC4]/90">
                  These spotlights are headline banners only. Your actual package cards live in the{" "}
                  <strong>Packages</strong> section right below them, where tabs are generated automatically from
                  whatever categories you use. Manage them in{" "}
                  <Link href="/admin/packages" className="underline font-semibold">Packages</Link>.
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
