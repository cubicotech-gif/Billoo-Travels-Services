"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import AdminLayout from "@/components/AdminLayout";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Dest {
  id: number;
  label: string;
  city: string;
  code: string;
  country: string;
  tagline: string;
  description: string;
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

const EMPTY_FORM = {
  label: "",
  city: "",
  code: "",
  country: "",
  tagline: "",
  description: "",
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

type Form = typeof EMPTY_FORM;

// ─── Shared input className ───────────────────────────────────────────────────

const CLS =
  "w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300";

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-[10px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Single image upload row ──────────────────────────────────────────────────

function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("bucket", "media");
    fd.append("folder", "hero");
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
        <img
          src={value}
          alt="preview"
          className="mt-2 h-20 w-auto rounded-lg object-cover border border-slate-200"
        />
      )}
    </Field>
  );
}

// ─── Multi-image manager (column images) ─────────────────────────────────────

function MultiImages({
  images,
  onChange,
}: {
  images: string[];
  onChange: (v: string[]) => void;
}) {
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("bucket", "media");
    fd.append("folder", "hero");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const j = await res.json();
    setBusy(false);
    if (j.url) onChange([...images, j.url]);
  }

  function update(i: number, url: string) {
    onChange(images.map((img, idx) => (idx === i ? url : img)));
  }

  function remove(i: number) {
    onChange(images.filter((_, idx) => idx !== i));
  }

  return (
    <Field label="Column Images (3 recommended)">
      <div className="space-y-2 mb-2">
        {images.map((img, i) => (
          <div key={i} className="flex gap-2 items-center">
            {img && (
              <img
                src={img}
                alt=""
                className="w-10 h-14 rounded-md object-cover border border-slate-200 flex-shrink-0"
              />
            )}
            <input
              value={img}
              onChange={(e) => update(i, e.target.value)}
              className={CLS + " flex-1 text-xs"}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-slate-300 hover:text-red-500 bg-transparent border-none cursor-pointer text-xl leading-none flex-shrink-0"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          placeholder="Paste URL then press Enter to add"
          className={CLS + " flex-1 text-xs"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const v = (e.target as HTMLInputElement).value.trim();
              if (v) {
                onChange([...images, v]);
                (e.target as HTMLInputElement).value = "";
              }
            }
          }}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => ref.current?.click()}
          className="px-4 py-2 text-sm rounded-lg bg-[#4DA3E8] text-white hover:bg-[#2B7CC4] border-none cursor-pointer font-semibold transition-all disabled:opacity-50 whitespace-nowrap"
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
    </Field>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HeroAdminPage() {
  const [list, setList] = useState<Dest[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableExists, setTableExists] = useState<boolean | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Dest | null>(null);
  const [form, setForm] = useState<Form>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [toast, setToast] = useState("");

  // ── toast helper ──────────────────────────────────────────────────────────
  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  }

  // ── load destinations from API ─────────────────────────────────────────────
  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/hero");
      const json = await res.json();
      setTableExists(json.tableExists !== false);
      setList(Array.isArray(json.destinations) ? json.destinations : []);
    } catch {
      setTableExists(false);
      setList([]);
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  // ── form helpers ──────────────────────────────────────────────────────────
  function set<K extends keyof Form>(k: K, v: Form[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function openNew() {
    setEditing(null);
    setForm({ ...EMPTY_FORM, sort_order: list.length });
    setShowForm(true);
  }

  function openEdit(d: Dest) {
    setEditing(d);
    setForm({
      label: d.label,
      city: d.city,
      code: d.code,
      country: d.country,
      tagline: d.tagline,
      description: d.description,
      price: d.price,
      temp: d.temp,
      flight: d.flight,
      tz: d.tz,
      bg_image: d.bg_image,
      images: d.images ?? [],
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

  async function handleSubmit(e: React.FormEvent) {
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
    if (json.error) { notify("Error: " + json.error); return; }
    notify(editing ? "Destination updated!" : "Destination created!");
    setShowForm(false);
    load();
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/hero/${id}`, { method: "DELETE" });
    const json = await res.json();
    if (json.error) { notify("Error: " + json.error); return; }
    notify("Deleted.");
    setConfirmDelete(null);
    load();
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className="text-2xl font-bold text-[#0B1628]"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Hero Section
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Manage destinations, images & content shown in the homepage hero.
            </p>
          </div>
          {tableExists && (
            <button
              onClick={openNew}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#4DA3E8] hover:bg-[#2B7CC4] text-white rounded-xl font-semibold text-sm border-none cursor-pointer transition-all"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              Add Destination
            </button>
          )}
        </div>

        {/* ── DB setup notice ── */}
        {tableExists === false && !loading && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 overflow-hidden">
            <div className="flex gap-3 items-start p-5">
              <svg className="flex-shrink-0 mt-0.5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
                <path d="M12 9v4M12 17h.01"/>
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              </svg>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-amber-900 text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>
                  Database not set up yet
                </p>
                <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                  Go to <strong>Supabase → SQL Editor</strong>, paste the SQL from
                  <code className="mx-1 px-1.5 py-0.5 bg-amber-100 rounded text-amber-800 font-mono text-[11px]">hero-setup.sql</code>
                  in the repository root, and click <strong>Run</strong>.
                  The file creates the table and inserts all 4 default destinations.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#4DA3E8] border-t-transparent rounded-full animate-spin" />
              Loading…
            </div>
          </div>
        )}

        {/* ── Empty state (table exists but no rows) ── */}
        {!loading && tableExists && list.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <div className="w-16 h-16 bg-[#EBF5FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4DA3E8" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M2 10l5-4 4 3 4-5 7 6"/>
                <path d="M2 20h20"/>
              </svg>
            </div>
            <h3 className="font-bold text-[#0B1628] text-lg mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>
              No destinations yet
            </h3>
            <p className="text-slate-400 text-sm mb-5">Add your first hero destination to get started.</p>
            <button
              onClick={openNew}
              className="px-6 py-2.5 bg-[#4DA3E8] hover:bg-[#2B7CC4] text-white rounded-xl font-semibold text-sm border-none cursor-pointer transition-all"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Add Destination
            </button>
          </div>
        )}

        {/* ── Destination cards ── */}
        {!loading && list.length > 0 && (
          <div className="grid gap-4">
            {list.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex">
                  {/* Bg image thumbnail */}
                  <div className="w-44 flex-shrink-0 relative" style={{ minHeight: 140 }}>
                    {d.bg_image ? (
                      <img
                        src={d.bg_image}
                        alt={d.label}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-300 text-xs">
                        No image
                      </div>
                    )}
                    <span
                      className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${
                        d.active ? "bg-emerald-500 text-white" : "bg-slate-400 text-white"
                      }`}
                    >
                      {d.active ? "ACTIVE" : "HIDDEN"}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className="font-bold text-[#0B1628] text-lg leading-tight"
                            style={{ fontFamily: "'Sora', sans-serif" }}
                          >
                            {d.label}
                          </h3>
                          <span className="text-xs text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded flex-shrink-0">
                            {d.code}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 mb-1">
                          {d.city}, {d.country}
                        </p>
                        <p className="text-xs font-semibold text-[#4DA3E8] mb-2">{d.tagline}</p>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                          {d.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <div
                          className="font-bold text-[#0B1628] text-base"
                          style={{ fontFamily: "'Sora', sans-serif" }}
                        >
                          PKR {d.price}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {d.temp} · {d.flight}
                        </div>
                        <div className="text-xs text-slate-300 mt-0.5">
                          Order #{d.sort_order + 1}
                        </div>
                      </div>
                    </div>

                    {/* Column image thumbs */}
                    {d.images && d.images.length > 0 && (
                      <div className="flex gap-1.5 mt-3">
                        {d.images.slice(0, 5).map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt=""
                            className="w-9 h-13 object-cover rounded-md border border-slate-200"
                            style={{ height: 52 }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => openEdit(d)}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#EBF5FF] text-[#4DA3E8] hover:bg-[#4DA3E8] hover:text-white border-none cursor-pointer transition-all"
                        style={{ fontFamily: "'Sora', sans-serif" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setConfirmDelete(d.id)}
                        className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-400 hover:bg-red-500 hover:text-white border-none cursor-pointer transition-all"
                        style={{ fontFamily: "'Sora', sans-serif" }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════════
            FORM MODAL
        ══════════════════════════════════════════ */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center overflow-y-auto py-8 px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">

              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <h2
                  className="font-bold text-[#0B1628] text-lg"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {editing ? `Edit: ${editing.label}` : "New Destination"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-slate-300 hover:text-slate-600 bg-transparent border-none cursor-pointer text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">

                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Destination Name" required>
                    <input
                      required
                      value={form.label}
                      onChange={(e) => set("label", e.target.value)}
                      placeholder="e.g. Umrah"
                      className={CLS}
                    />
                  </Field>
                  <Field label="City">
                    <input
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="e.g. Makkah"
                      className={CLS}
                    />
                  </Field>
                  <Field label="Airport Code">
                    <input
                      value={form.code}
                      onChange={(e) => set("code", e.target.value.toUpperCase())}
                      placeholder="e.g. JED"
                      maxLength={4}
                      className={CLS}
                    />
                  </Field>
                  <Field label="Country">
                    <input
                      value={form.country}
                      onChange={(e) => set("country", e.target.value)}
                      placeholder="e.g. Saudi Arabia"
                      className={CLS}
                    />
                  </Field>
                </div>

                {/* Tagline */}
                <Field label="Tagline">
                  <input
                    value={form.tagline}
                    onChange={(e) => set("tagline", e.target.value)}
                    placeholder="Short inspiring line shown on hero"
                    className={CLS}
                  />
                </Field>

                {/* Description */}
                <Field label="Description (use · to separate features)">
                  <textarea
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="VIP pilgrimage · Five-star suites · Private transfers"
                    rows={3}
                    className={CLS + " resize-none"}
                  />
                </Field>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Price (PKR)">
                    <input
                      value={form.price}
                      onChange={(e) => set("price", e.target.value)}
                      placeholder="e.g. 450,000"
                      className={CLS}
                    />
                  </Field>
                  <Field label="Temperature">
                    <input
                      value={form.temp}
                      onChange={(e) => set("temp", e.target.value)}
                      placeholder="e.g. 34°C"
                      className={CLS}
                    />
                  </Field>
                  <Field label="Flight Duration">
                    <input
                      value={form.flight}
                      onChange={(e) => set("flight", e.target.value)}
                      placeholder="e.g. ~4h 15m"
                      className={CLS}
                    />
                  </Field>
                  <Field label="Timezone Code">
                    <input
                      value={form.tz}
                      onChange={(e) => set("tz", e.target.value)}
                      placeholder="e.g. AST"
                      className={CLS}
                    />
                  </Field>
                </div>

                {/* Background image */}
                <ImageField
                  label="Background Image (full screen)"
                  value={form.bg_image}
                  onChange={(url) => set("bg_image", url)}
                />

                {/* Column images */}
                <MultiImages
                  images={form.images}
                  onChange={(imgs) => set("images", imgs)}
                />

                {/* Map coords */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Map X (0–100, horizontal position)">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={form.map_x}
                      onChange={(e) => set("map_x", Number(e.target.value))}
                      className={CLS}
                    />
                  </Field>
                  <Field label="Map Y (0–100, vertical position)">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={form.map_y}
                      onChange={(e) => set("map_y", Number(e.target.value))}
                      className={CLS}
                    />
                  </Field>
                </div>

                {/* Quote */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <p
                    className="text-[10px] tracking-[1px] text-slate-400 uppercase font-semibold"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Customer Quote
                  </p>
                  <Field label="Quote Text">
                    <textarea
                      value={form.quote_text}
                      onChange={(e) => set("quote_text", e.target.value)}
                      placeholder="What the customer said…"
                      rows={2}
                      className={CLS + " resize-none"}
                    />
                  </Field>
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Name">
                      <input
                        value={form.quote_name}
                        onChange={(e) => set("quote_name", e.target.value)}
                        placeholder="Fatima H."
                        className={CLS}
                      />
                    </Field>
                    <Field label="Package / Role">
                      <input
                        value={form.quote_role}
                        onChange={(e) => set("quote_role", e.target.value)}
                        placeholder="Executive Hajj '24"
                        className={CLS}
                      />
                    </Field>
                    <Field label="Initial (avatar)">
                      <input
                        value={form.quote_initial}
                        onChange={(e) => set("quote_initial", e.target.value)}
                        maxLength={2}
                        placeholder="F"
                        className={CLS}
                      />
                    </Field>
                  </div>
                </div>

                {/* Sort + Status */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Display Order">
                    <input
                      type="number"
                      min={0}
                      value={form.sort_order}
                      onChange={(e) => set("sort_order", Number(e.target.value))}
                      className={CLS}
                    />
                  </Field>
                  <Field label="Visibility">
                    <select
                      value={form.active ? "1" : "0"}
                      onChange={(e) => set("active", e.target.value === "1")}
                      className={CLS}
                    >
                      <option value="1">Active — visible on site</option>
                      <option value="0">Hidden — not shown</option>
                    </select>
                  </Field>
                </div>

                {/* Submit */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2.5 rounded-xl text-slate-500 bg-slate-100 hover:bg-slate-200 font-semibold text-sm border-none cursor-pointer transition-all"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-[#4DA3E8] hover:bg-[#2B7CC4] text-white font-semibold text-sm border-none cursor-pointer transition-all disabled:opacity-60"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {saving ? "Saving…" : editing ? "Save Changes" : "Create Destination"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── Delete confirm ── */}
        {confirmDelete !== null && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
              <h3
                className="font-bold text-[#0B1628] text-lg mb-2"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Delete destination?
              </h3>
              <p className="text-slate-500 text-sm mb-5">
                This will remove it from the hero section permanently.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 py-2.5 rounded-xl text-slate-500 bg-slate-100 hover:bg-slate-200 font-semibold text-sm border-none cursor-pointer"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm border-none cursor-pointer"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Toast ── */}
        {toast && (
          <div
            className="fixed bottom-6 right-6 z-50 bg-[#0B1628] text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            {toast}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
