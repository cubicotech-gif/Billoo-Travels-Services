"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import AdminLayout from "@/components/AdminLayout";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroDestination {
  id: number;
  label: string;
  city: string;
  code: string;
  country: string;
  tagline: string;
  desc: string;
  price: string;
  temp: string;
  flight: string;
  tz: string;
  bg_image: string;
  images: string[];
  map_x: number;
  map_y: number;
  quote_text: string;
  quote_name: string;
  quote_role: string;
  quote_initial: string;
  sort_order: number;
  active: boolean;
}

const emptyForm = {
  label: "",
  city: "",
  code: "",
  country: "",
  tagline: "",
  desc: "",
  price: "",
  temp: "",
  flight: "",
  tz: "",
  bg_image: "",
  images: [] as string[],
  map_x: 60,
  map_y: 45,
  quote_text: "",
  quote_name: "",
  quote_role: "",
  quote_initial: "",
  sort_order: 0,
  active: true,
};

type FormState = typeof emptyForm;

// ─── Static default destinations (shown when DB table doesn't exist yet) ──────

const STATIC_DEFAULTS: HeroDestination[] = [
  {
    id: -1,
    label: "Umrah",
    city: "Makkah",
    code: "JED",
    country: "Saudi Arabia",
    tagline: "Your Sacred Journey, Elevated",
    desc: "VIP pilgrimage · Five-star suites steps from Haram · Personal scholar guiding every ritual · Private SUV transfers · 99.8% visa success",
    price: "450,000",
    temp: "34°C",
    flight: "~4h 15m",
    tz: "AST",
    bg_image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=85&w=2400",
    images: [
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565552643951-b2e152973b06?w=400&h=600&fit=crop&q=80",
    ],
    map_x: 62,
    map_y: 46,
    quote_text: "Flawless logistics let us focus entirely on worship. Truly transcendent.",
    quote_name: "Fatima H.",
    quote_role: "Executive Hajj '24",
    quote_initial: "F",
    sort_order: 0,
    active: true,
  },
  {
    id: -2,
    label: "Hajj 2026",
    city: "Makkah",
    code: "JED",
    country: "Saudi Arabia",
    tagline: "The Journey of a Lifetime",
    desc: "Premium Hajj packages · Palace suites at Abraj Al Bait · Dedicated scholar · VIP transfers · Priority visa processing",
    price: "1,250,000",
    temp: "38°C",
    flight: "~4h 15m",
    tz: "AST",
    bg_image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=85&w=2400",
    images: [
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565552643951-b2e152973b06?w=400&h=600&fit=crop&q=80",
    ],
    map_x: 62,
    map_y: 46,
    quote_text: "The Clock Tower suite and VIP transfers exceeded all expectations.",
    quote_name: "Khalid A.",
    quote_role: "Royal Umrah '24",
    quote_initial: "K",
    sort_order: 1,
    active: true,
  },
  {
    id: -3,
    label: "Turkey",
    city: "Istanbul",
    code: "IST",
    country: "Turkey",
    tagline: "Where Continents Converge",
    desc: "Ottoman heritage · Bosphorus cruises · Cappadocia balloon rides · Luxury boutique hotels · Halal dining curated",
    price: "380,000",
    temp: "18°C",
    flight: "~5h 40m",
    tz: "TRT",
    bg_image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=85&w=2400",
    images: [
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=600&fit=crop&q=80",
    ],
    map_x: 54,
    map_y: 30,
    quote_text: "Istanbul with Billoo felt like traveling with family. Incredible detail.",
    quote_name: "Dr. Aisha S.",
    quote_role: "Turkey Tour '24",
    quote_initial: "A",
    sort_order: 2,
    active: true,
  },
  {
    id: -4,
    label: "Dubai",
    city: "Dubai",
    code: "DXB",
    country: "UAE",
    tagline: "Beyond Extraordinary",
    desc: "Desert safaris · Sky-high dining · Beachfront suites · Burj Khalifa access · Curated shopping tours",
    price: "320,000",
    temp: "30°C",
    flight: "~2h 30m",
    tz: "GST",
    bg_image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=85&w=2400",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=400&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop&q=80",
    ],
    map_x: 66,
    map_y: 43,
    quote_text: "Our family trip was seamless. The personal concierge was a game changer.",
    quote_name: "Hasan R.",
    quote_role: "Dubai Luxury '24",
    quote_initial: "H",
    sort_order: 3,
    active: true,
  },
];

// ─── Image Upload Helper ───────────────────────────────────────────────────────

function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    fd.append("bucket", "media");
    fd.append("folder", "hero");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    setUploading(false);
    if (json.url) onChange(json.url);
    else setError(json.error || "Upload failed");
  }

  return (
    <div>
      <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {label}
      </label>
      <div className="flex gap-2 items-start">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or upload below"
          className="flex-1 px-3.5 py-2 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300"
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="px-3 py-2 bg-slate-100 hover:bg-[#EBF5FF] text-slate-500 hover:text-[#4DA3E8] rounded-lg text-sm border border-slate-200 cursor-pointer transition-all whitespace-nowrap disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      </div>
      {value && (
        <img src={value} alt="preview" className="mt-2 h-24 w-auto rounded-lg object-cover border border-slate-200" />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// ─── Multi-Image Manager ───────────────────────────────────────────────────────

function MultiImageManager({
  images,
  onChange,
}: {
  images: string[];
  onChange: (imgs: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("bucket", "media");
    fd.append("folder", "hero");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    setUploading(false);
    if (json.url) onChange([...images, json.url]);
  }

  function updateUrl(idx: number, url: string) {
    onChange(images.map((img, i) => (i === idx ? url : img)));
  }

  function remove(idx: number) {
    onChange(images.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-2 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        Column Images (3 recommended)
      </label>
      <div className="space-y-2 mb-2">
        {images.map((img, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <div className="relative flex-shrink-0">
              <img src={img} alt={`img-${idx}`} className="w-14 h-20 rounded-lg object-cover border border-slate-200" />
            </div>
            <input
              value={img}
              onChange={(e) => updateUrl(idx, e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8]"
            />
            <button
              type="button"
              onClick={() => remove(idx)}
              className="text-slate-300 hover:text-red-500 bg-transparent border-none cursor-pointer text-lg leading-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          placeholder="Paste image URL and press +"
          className="flex-1 px-3.5 py-2 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const v = (e.target as HTMLInputElement).value.trim();
              if (v) { onChange([...images, v]); (e.target as HTMLInputElement).value = ""; }
            }
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="px-3 py-2 bg-[#4DA3E8] text-white rounded-lg text-sm font-semibold border-none cursor-pointer hover:bg-[#2B7CC4] disabled:opacity-50 whitespace-nowrap"
        >
          {uploading ? "…" : "Upload"}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HeroAdminPage() {
  const [destinations, setDestinations] = useState<HeroDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUsingStatic, setIsUsingStatic] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<HeroDestination | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  async function load() {
    setLoading(true);
    const res = await fetch("/api/hero");
    const json = await res.json();
    if (json.destinations && json.destinations.length > 0) {
      setDestinations(json.destinations);
      setIsUsingStatic(false);
    } else {
      // Table empty or not yet created — show static defaults as read-only preview
      setDestinations(STATIC_DEFAULTS);
      setIsUsingStatic(true);
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function setField<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function openNew() {
    setEditing(null);
    setForm({ ...emptyForm, sort_order: destinations.length });
    setShowForm(true);
  }

  function openEdit(d: HeroDestination) {
    if (d.id < 0) {
      showToast("Set up the database table first to edit destinations.");
      return;
    }
    setEditing(d);
    setForm({
      label: d.label,
      city: d.city,
      code: d.code,
      country: d.country,
      tagline: d.tagline,
      desc: d.desc,
      price: d.price,
      temp: d.temp,
      flight: d.flight,
      tz: d.tz,
      bg_image: d.bg_image,
      images: d.images || [],
      map_x: d.map_x,
      map_y: d.map_y,
      quote_text: d.quote_text,
      quote_name: d.quote_name,
      quote_role: d.quote_role,
      quote_initial: d.quote_initial,
      sort_order: d.sort_order,
      active: d.active,
    });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      map_x: Number(form.map_x),
      map_y: Number(form.map_y),
      sort_order: Number(form.sort_order),
    };
    const url = editing ? `/api/hero/${editing.id}` : "/api/hero";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    setSaving(false);
    if (json.error) {
      showToast("Error: " + json.error);
      return;
    }
    showToast(editing ? "Destination updated!" : "Destination created!");
    setShowForm(false);
    load();
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/hero/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.error) { showToast("Error: " + json.error); return; }
    showToast("Destination deleted.");
    setDeleteConfirm(null);
    load();
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1628]" style={{ fontFamily: "'Sora', sans-serif" }}>
              Hero Section
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Manage hero destinations, images and content displayed on the homepage.
            </p>
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#4DA3E8] text-white rounded-xl font-semibold text-sm border-none cursor-pointer hover:bg-[#2B7CC4] transition-all"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Add Destination
          </button>
        </div>

        {/* DB notice */}
        {isUsingStatic && !loading && (
          <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start">
            <svg className="flex-shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2"><path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
            <div>
              <p className="text-sm font-semibold text-amber-800" style={{ fontFamily: "'Sora', sans-serif" }}>
                Database table not set up yet
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                Showing static defaults. Run the SQL below in Supabase to enable full management:
              </p>
              <pre className="mt-2 text-[11px] bg-amber-100 rounded-lg p-3 overflow-x-auto text-amber-900 leading-relaxed">
{`CREATE TABLE hero_destinations (
  id           SERIAL PRIMARY KEY,
  label        TEXT NOT NULL,
  city         TEXT NOT NULL DEFAULT '',
  code         TEXT NOT NULL DEFAULT '',
  country      TEXT NOT NULL DEFAULT '',
  tagline      TEXT NOT NULL DEFAULT '',
  desc         TEXT NOT NULL DEFAULT '',
  price        TEXT NOT NULL DEFAULT '',
  temp         TEXT NOT NULL DEFAULT '',
  flight       TEXT NOT NULL DEFAULT '',
  tz           TEXT NOT NULL DEFAULT '',
  bg_image     TEXT NOT NULL DEFAULT '',
  images       TEXT[] NOT NULL DEFAULT '{}',
  map_x        NUMERIC NOT NULL DEFAULT 60,
  map_y        NUMERIC NOT NULL DEFAULT 45,
  quote_text   TEXT NOT NULL DEFAULT '',
  quote_name   TEXT NOT NULL DEFAULT '',
  quote_role   TEXT NOT NULL DEFAULT '',
  quote_initial TEXT NOT NULL DEFAULT '',
  sort_order   INT NOT NULL DEFAULT 0,
  active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`}
              </pre>
            </div>
          </div>
        )}

        {/* Destination Cards */}
        {loading ? (
          <div className="flex items-center justify-center h-48 text-slate-400 text-sm">Loading…</div>
        ) : (
          <div className="grid gap-4">
            {destinations.map((d) => (
              <div key={d.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-0">
                  {/* BG image preview */}
                  <div className="w-40 flex-shrink-0 relative">
                    {d.bg_image ? (
                      <img src={d.bg_image} alt={d.label} className="w-full h-full object-cover" style={{ minHeight: 130 }} />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 text-sm" style={{ minHeight: 130 }}>No image</div>
                    )}
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${d.active ? "bg-emerald-500 text-white" : "bg-slate-300 text-white"}`}>
                        {d.active ? "ACTIVE" : "HIDDEN"}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-[#0B1628] text-lg leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>{d.label}</h3>
                          <span className="text-xs text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded">{d.code}</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-1">{d.city}, {d.country}</p>
                        <p className="text-xs text-[#4DA3E8] font-semibold mb-2">{d.tagline}</p>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{d.desc}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div className="text-lg font-bold text-[#0B1628]" style={{ fontFamily: "'Sora', sans-serif" }}>PKR {d.price}</div>
                        <div className="text-xs text-slate-400">{d.temp} · {d.flight}</div>
                        <div className="text-xs text-slate-400 mt-0.5">Sort: #{d.sort_order + 1}</div>
                      </div>
                    </div>

                    {/* Column image thumbs */}
                    {d.images && d.images.length > 0 && (
                      <div className="flex gap-1.5 mt-3">
                        {d.images.map((img, i) => (
                          <img key={i} src={img} alt={`col-${i}`} className="w-10 h-14 object-cover rounded-md border border-slate-200" />
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        onClick={() => openEdit(d)}
                        className="px-4 py-1.5 bg-[#EBF5FF] text-[#4DA3E8] rounded-lg text-xs font-semibold border-none cursor-pointer hover:bg-[#4DA3E8] hover:text-white transition-all"
                        style={{ fontFamily: "'Sora', sans-serif" }}
                      >
                        Edit
                      </button>
                      {d.id >= 0 && (
                        <button
                          onClick={() => setDeleteConfirm(d.id)}
                          className="px-4 py-1.5 bg-red-50 text-red-400 rounded-lg text-xs font-semibold border-none cursor-pointer hover:bg-red-500 hover:text-white transition-all"
                          style={{ fontFamily: "'Sora', sans-serif" }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Edit / Create Form Modal ── */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <h2 className="font-bold text-[#0B1628] text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>
                  {editing ? "Edit Destination" : "New Destination"}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-slate-300 hover:text-slate-600 bg-transparent border-none cursor-pointer text-2xl leading-none">&times;</button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-5">

                {/* Row: label, city, code, country */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Label / Name" required>
                    <input value={form.label} onChange={(e) => setField("label", e.target.value)} required placeholder="e.g. Umrah" className={INPUT} />
                  </Field>
                  <Field label="City">
                    <input value={form.city} onChange={(e) => setField("city", e.target.value)} placeholder="e.g. Makkah" className={INPUT} />
                  </Field>
                  <Field label="Airport Code">
                    <input value={form.code} onChange={(e) => setField("code", e.target.value)} placeholder="e.g. JED" className={INPUT} />
                  </Field>
                  <Field label="Country">
                    <input value={form.country} onChange={(e) => setField("country", e.target.value)} placeholder="e.g. Saudi Arabia" className={INPUT} />
                  </Field>
                </div>

                {/* Tagline */}
                <Field label="Tagline">
                  <input value={form.tagline} onChange={(e) => setField("tagline", e.target.value)} placeholder="Short inspirational line" className={INPUT} />
                </Field>

                {/* Description */}
                <Field label="Description">
                  <textarea
                    value={form.desc}
                    onChange={(e) => setField("desc", e.target.value)}
                    placeholder="Key features separated by ·"
                    rows={3}
                    className={INPUT + " resize-none"}
                  />
                </Field>

                {/* Row: price, temp, flight, tz */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Price (PKR)">
                    <input value={form.price} onChange={(e) => setField("price", e.target.value)} placeholder="e.g. 450,000" className={INPUT} />
                  </Field>
                  <Field label="Temperature">
                    <input value={form.temp} onChange={(e) => setField("temp", e.target.value)} placeholder="e.g. 34°C" className={INPUT} />
                  </Field>
                  <Field label="Flight Time">
                    <input value={form.flight} onChange={(e) => setField("flight", e.target.value)} placeholder="e.g. ~4h 15m" className={INPUT} />
                  </Field>
                  <Field label="Timezone Code">
                    <input value={form.tz} onChange={(e) => setField("tz", e.target.value)} placeholder="e.g. AST" className={INPUT} />
                  </Field>
                </div>

                {/* Background Image */}
                <ImageUploadField
                  label="Background Image (full page)"
                  value={form.bg_image}
                  onChange={(url) => setField("bg_image", url)}
                />

                {/* Column Images */}
                <MultiImageManager
                  images={form.images}
                  onChange={(imgs) => setField("images", imgs)}
                />

                {/* Map coordinates */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Map X Position (0–100)">
                    <input type="number" min={0} max={100} value={form.map_x} onChange={(e) => setField("map_x", Number(e.target.value))} className={INPUT} />
                  </Field>
                  <Field label="Map Y Position (0–100)">
                    <input type="number" min={0} max={100} value={form.map_y} onChange={(e) => setField("map_y", Number(e.target.value))} className={INPUT} />
                  </Field>
                </div>

                {/* Quote */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <p className="text-[11px] tracking-[1px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Customer Quote</p>
                  <Field label="Quote Text">
                    <textarea
                      value={form.quote_text}
                      onChange={(e) => setField("quote_text", e.target.value)}
                      placeholder="What the customer said…"
                      rows={2}
                      className={INPUT + " resize-none"}
                    />
                  </Field>
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Name">
                      <input value={form.quote_name} onChange={(e) => setField("quote_name", e.target.value)} placeholder="Fatima H." className={INPUT} />
                    </Field>
                    <Field label="Role / Package">
                      <input value={form.quote_role} onChange={(e) => setField("quote_role", e.target.value)} placeholder="Executive Hajj '24" className={INPUT} />
                    </Field>
                    <Field label="Avatar Initial">
                      <input value={form.quote_initial} onChange={(e) => setField("quote_initial", e.target.value)} maxLength={2} placeholder="F" className={INPUT} />
                    </Field>
                  </div>
                </div>

                {/* Sort order & active */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Sort Order">
                    <input type="number" min={0} value={form.sort_order} onChange={(e) => setField("sort_order", Number(e.target.value))} className={INPUT} />
                  </Field>
                  <Field label="Status">
                    <select value={form.active ? "active" : "hidden"} onChange={(e) => setField("active", e.target.value === "active")} className={INPUT}>
                      <option value="active">Active (visible)</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </Field>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
                  <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-slate-500 bg-slate-100 hover:bg-slate-200 font-semibold text-sm border-none cursor-pointer transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-[#4DA3E8] hover:bg-[#2B7CC4] text-white font-semibold text-sm border-none cursor-pointer transition-all disabled:opacity-60" style={{ fontFamily: "'Sora', sans-serif" }}>
                    {saving ? "Saving…" : editing ? "Save Changes" : "Create Destination"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete confirm dialog */}
        {deleteConfirm !== null && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
              <h3 className="font-bold text-[#0B1628] text-lg mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>Delete destination?</h3>
              <p className="text-slate-500 text-sm mb-5">This action cannot be undone. The destination will be removed from the hero section.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-xl text-slate-500 bg-slate-100 hover:bg-slate-200 font-semibold text-sm border-none cursor-pointer" style={{ fontFamily: "'Sora', sans-serif" }}>Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm border-none cursor-pointer" style={{ fontFamily: "'Sora', sans-serif" }}>Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#0B1628] text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>
            {toast}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const INPUT = "w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300";

function Field({ label, children, required }: { label: string; children: ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}
