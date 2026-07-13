"use client";

import { useState, useEffect, type ReactNode } from "react";
import AdminLayout from "@/components/AdminLayout";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TrustItem {
  value: string;
  label: string;
}
interface Step {
  title: string;
  desc: string;
}
interface Accreditation {
  name: string;
  logo: string;
}
interface License {
  title: string;
  issuer: string;
  image: string;
  doc_url: string;
}
interface HomepageContent {
  trust_enabled: boolean;
  trust_items: TrustItem[];
  steps_enabled: boolean;
  steps_label: string;
  steps_title: string;
  steps_highlight: string;
  steps_subtitle: string;
  steps: Step[];
  accred_enabled: boolean;
  accred_label: string;
  accreditations: Accreditation[];
  licenses_enabled: boolean;
  licenses_label: string;
  licenses: License[];
}

const EMPTY: HomepageContent = {
  trust_enabled: true,
  trust_items: [],
  steps_enabled: true,
  steps_label: "Simple Process",
  steps_title: "Your Journey in",
  steps_highlight: "Four Steps",
  steps_subtitle: "",
  steps: [],
  accred_enabled: true,
  accred_label: "Accredited & Trusted",
  accreditations: [],
  licenses_enabled: true,
  licenses_label: "Officially Licensed & Verified",
  licenses: [],
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

// ─── Main page ──────────────────────────────────────────────────────────────

export default function HomepageAdminPage() {
  const [form, setForm] = useState<HomepageContent>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tableExists, setTableExists] = useState<boolean | null>(null);
  const [toast, setToast] = useState("");

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  }

  function set<K extends keyof HomepageContent>(k: K, v: HomepageContent[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/homepage");
      const json = await res.json();
      setTableExists(json.tableExists !== false);
      if (json.content) {
        setForm({
          ...EMPTY,
          ...json.content,
          trust_items: Array.isArray(json.content.trust_items) ? json.content.trust_items : [],
          steps: Array.isArray(json.content.steps) ? json.content.steps : [],
          accreditations: Array.isArray(json.content.accreditations) ? json.content.accreditations : [],
          licenses: Array.isArray(json.content.licenses) ? json.content.licenses : [],
        });
      }
    } catch {
      setTableExists(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  // ── trust item helpers ──
  function setTrust(i: number, key: keyof TrustItem, v: string) {
    set("trust_items", form.trust_items.map((it, idx) => (idx === i ? { ...it, [key]: v } : it)));
  }
  function addTrust() {
    set("trust_items", [...form.trust_items, { value: "", label: "" }]);
  }
  function removeTrust(i: number) {
    set("trust_items", form.trust_items.filter((_, idx) => idx !== i));
  }

  // ── step helpers ──
  function setStep(i: number, key: keyof Step, v: string) {
    set("steps", form.steps.map((s, idx) => (idx === i ? { ...s, [key]: v } : s)));
  }
  function addStep() {
    set("steps", [...form.steps, { title: "", desc: "" }]);
  }
  function removeStep(i: number) {
    set("steps", form.steps.filter((_, idx) => idx !== i));
  }

  // ── accreditation helpers ──
  function setAccred(i: number, key: keyof Accreditation, v: string) {
    set("accreditations", form.accreditations.map((a, idx) => (idx === i ? { ...a, [key]: v } : a)));
  }
  function addAccred() {
    set("accreditations", [...form.accreditations, { name: "", logo: "" }]);
  }
  function removeAccred(i: number) {
    set("accreditations", form.accreditations.filter((_, idx) => idx !== i));
  }
  async function uploadLogo(i: number, file: File) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("bucket", "media");
    fd.append("folder", "accreditations");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const j = await res.json();
    if (j.url) setAccred(i, "logo", j.url);
  }

  // ── licence helpers ──
  function setLicense(i: number, key: keyof License, v: string) {
    set("licenses", form.licenses.map((l, idx) => (idx === i ? { ...l, [key]: v } : l)));
  }
  function addLicense() {
    set("licenses", [...form.licenses, { title: "", issuer: "", image: "", doc_url: "" }]);
  }
  function removeLicense(i: number) {
    set("licenses", form.licenses.filter((_, idx) => idx !== i));
  }
  const [licenseUploading, setLicenseUploading] = useState<number | null>(null);
  async function uploadLicenseDoc(i: number, file: File) {
    setLicenseUploading(i);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("bucket", "documents");
    fd.append("folder", "licenses");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const j = await res.json();
    if (j.url) {
      const isPdf = /\.pdf($|\?)/i.test(j.url);
      // doc_url is what opens on click; image is the preview (only for image uploads)
      setForm((f) => ({
        ...f,
        licenses: f.licenses.map((l, idx) =>
          idx === i ? { ...l, doc_url: j.url, image: isPdf ? l.image : j.url } : l
        ),
      }));
    }
    setLicenseUploading(null);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/homepage", {
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
    notify("Saved! The homepage is updated.");
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0B1628]" style={{ fontFamily: "'Sora', sans-serif" }}>
            Homepage
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Edit the trust bar, accreditation logos, licence documents, and the &ldquo;How It Works&rdquo; steps.
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
                <code className="mx-1 px-1.5 py-0.5 bg-amber-100 rounded text-amber-800 font-mono text-[11px]">homepage-content-setup.sql</code>
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

            {/* ── TRUST BAR ── */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-bold text-[#0B1628]" style={{ fontFamily: "'Sora', sans-serif" }}>Trust Bar</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Credibility figures shown right under the hero.</p>
                </div>
                <Toggle on={form.trust_enabled} onClick={() => set("trust_enabled", !form.trust_enabled)} />
              </div>

              <div className="space-y-2.5">
                {form.trust_items.map((it, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      value={it.value}
                      onChange={(e) => setTrust(i, "value", e.target.value)}
                      placeholder="Value (e.g. 15,000+)"
                      className={CLS + " flex-1"}
                    />
                    <input
                      value={it.label}
                      onChange={(e) => setTrust(i, "label", e.target.value)}
                      placeholder="Label (e.g. Pilgrims Served)"
                      className={CLS + " flex-1"}
                    />
                    <button
                      type="button"
                      onClick={() => removeTrust(i)}
                      className="text-slate-300 hover:text-red-500 bg-transparent border-none cursor-pointer text-xl leading-none flex-shrink-0 px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addTrust}
                className="mt-3 px-4 py-2 text-xs font-semibold rounded-lg bg-[#EBF5FF] text-[#4DA3E8] hover:bg-[#4DA3E8] hover:text-white border-none cursor-pointer transition-all"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                + Add trust item
              </button>
            </div>

            {/* ── ACCREDITATIONS ── */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-bold text-[#0B1628]" style={{ fontFamily: "'Sora', sans-serif" }}>Accreditations &amp; Partners</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Logo strip of memberships &amp; approvals (IATA, Nusuk, Ministry…). Builds trust.</p>
                </div>
                <Toggle on={form.accred_enabled} onClick={() => set("accred_enabled", !form.accred_enabled)} />
              </div>

              <Field label="Section label" hint="Small caption above the logos, e.g. Accredited & Trusted">
                <input value={form.accred_label} onChange={(e) => set("accred_label", e.target.value)} className={CLS} />
              </Field>

              <div className="space-y-2.5 mt-4">
                {form.accreditations.map((a, i) => (
                  <div key={i} className="flex gap-2 items-center bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                    {a.logo ? (
                      <img src={a.logo} alt={a.name} className="h-9 w-12 object-contain rounded bg-white border border-slate-200 flex-shrink-0" />
                    ) : (
                      <span className="h-9 w-12 rounded bg-white border border-dashed border-slate-200 flex items-center justify-center text-[9px] text-slate-300 flex-shrink-0">no logo</span>
                    )}
                    <input
                      value={a.name}
                      onChange={(e) => setAccred(i, "name", e.target.value)}
                      placeholder="Name (shown if no logo), e.g. IATA Accredited"
                      className={CLS + " flex-1"}
                    />
                    <label className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white hover:bg-[#EBF5FF] hover:text-[#4DA3E8] hover:border-[#4DA3E8] cursor-pointer transition-all whitespace-nowrap">
                      Logo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) uploadLogo(i, f);
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => removeAccred(i)}
                      className="text-slate-300 hover:text-red-500 bg-transparent border-none cursor-pointer text-xl leading-none flex-shrink-0 px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addAccred}
                className="mt-3 px-4 py-2 text-xs font-semibold rounded-lg bg-[#EBF5FF] text-[#4DA3E8] hover:bg-[#4DA3E8] hover:text-white border-none cursor-pointer transition-all"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                + Add accreditation
              </button>
            </div>

            {/* ── LICENSES & CREDENTIALS ── */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-bold text-[#0B1628]" style={{ fontFamily: "'Sora', sans-serif" }}>Licences &amp; Credentials</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Upload the real Munazzam, Ministry of Religious Affairs, Nusuk &amp; IATA documents. Shown as verifiable trust proof (images or PDF).</p>
                </div>
                <Toggle on={form.licenses_enabled} onClick={() => set("licenses_enabled", !form.licenses_enabled)} />
              </div>

              <Field label="Section label" hint="Small caption under the heading, e.g. Officially Licensed & Verified">
                <input value={form.licenses_label} onChange={(e) => set("licenses_label", e.target.value)} className={CLS} />
              </Field>

              <div className="space-y-3 mt-4">
                {form.licenses.map((l, i) => (
                  <div key={i} className="flex gap-3 items-start bg-slate-50 border border-slate-200 rounded-xl p-3">
                    {/* Preview */}
                    {l.image ? (
                      <img src={l.image} alt={l.title} className="h-16 w-16 object-cover rounded-lg bg-white border border-slate-200 flex-shrink-0" />
                    ) : l.doc_url ? (
                      <span className="h-16 w-16 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-semibold text-[#4DA3E8] flex-shrink-0">PDF</span>
                    ) : (
                      <span className="h-16 w-16 rounded-lg bg-white border border-dashed border-slate-200 flex items-center justify-center text-[9px] text-slate-300 flex-shrink-0 text-center px-1">no file</span>
                    )}
                    <div className="flex-1 space-y-2 min-w-0">
                      <input
                        value={l.title}
                        onChange={(e) => setLicense(i, "title", e.target.value)}
                        placeholder="Title, e.g. Hajj Group Organizer Licence"
                        className={CLS}
                      />
                      <input
                        value={l.issuer}
                        onChange={(e) => setLicense(i, "issuer", e.target.value)}
                        placeholder="Issuer, e.g. Ministry of Religious Affairs / Munazzam / Nusuk"
                        className={CLS}
                      />
                      <div className="flex items-center gap-2 flex-wrap">
                        <label className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white hover:bg-[#EBF5FF] hover:text-[#4DA3E8] hover:border-[#4DA3E8] cursor-pointer transition-all whitespace-nowrap">
                          {licenseUploading === i ? "Uploading…" : l.doc_url ? "Replace file" : "Upload image / PDF"}
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) uploadLicenseDoc(i, f);
                            }}
                          />
                        </label>
                        {l.doc_url && (
                          <a href={l.doc_url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#4DA3E8] hover:underline">
                            View file ↗
                          </a>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLicense(i)}
                      className="text-slate-300 hover:text-red-500 bg-transparent border-none cursor-pointer text-xl leading-none flex-shrink-0 px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addLicense}
                className="mt-3 px-4 py-2 text-xs font-semibold rounded-lg bg-[#EBF5FF] text-[#4DA3E8] hover:bg-[#4DA3E8] hover:text-white border-none cursor-pointer transition-all"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                + Add licence / credential
              </button>
            </div>

            {/* ── HOW IT WORKS ── */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-bold text-[#0B1628]" style={{ fontFamily: "'Sora', sans-serif" }}>How It Works</h2>
                  <p className="text-xs text-slate-400 mt-0.5">The booking process steps.</p>
                </div>
                <Toggle on={form.steps_enabled} onClick={() => set("steps_enabled", !form.steps_enabled)} />
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <Field label="Eyebrow label">
                  <input value={form.steps_label} onChange={(e) => set("steps_label", e.target.value)} className={CLS} />
                </Field>
                <Field label="Title">
                  <input value={form.steps_title} onChange={(e) => set("steps_title", e.target.value)} className={CLS} />
                </Field>
                <Field label="Highlight (italic)">
                  <input value={form.steps_highlight} onChange={(e) => set("steps_highlight", e.target.value)} className={CLS} />
                </Field>
              </div>
              <Field label="Subtitle">
                <textarea value={form.steps_subtitle} onChange={(e) => set("steps_subtitle", e.target.value)} rows={2} className={CLS + " resize-none"} />
              </Field>

              <div className="space-y-3 mt-4">
                {form.steps.map((s, i) => (
                  <div key={i} className="flex gap-2 items-start bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-[#4DA3E8] text-sm flex-shrink-0 mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        value={s.title}
                        onChange={(e) => setStep(i, "title", e.target.value)}
                        placeholder="Step title (e.g. Choose Your Package)"
                        className={CLS}
                      />
                      <textarea
                        value={s.desc}
                        onChange={(e) => setStep(i, "desc", e.target.value)}
                        placeholder="Short description of this step…"
                        rows={2}
                        className={CLS + " resize-none text-xs"}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeStep(i)}
                      className="text-slate-300 hover:text-red-500 bg-transparent border-none cursor-pointer text-xl leading-none flex-shrink-0 px-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addStep}
                className="mt-3 px-4 py-2 text-xs font-semibold rounded-lg bg-[#EBF5FF] text-[#4DA3E8] hover:bg-[#4DA3E8] hover:text-white border-none cursor-pointer transition-all"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                + Add step
              </button>
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
