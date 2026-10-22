"use client";

import { useEffect, useRef, useState } from "react";
import AdminLayout from "@/components/AdminLayout";

interface Photo {
  key: string;
  label: string;
  grp: string;
  image_url: string | null;
}

export default function HajjPhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableExists, setTableExists] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const targetKey = useRef<string>("");

  async function load() {
    const d = await fetch("/api/hajj-photos").then((r) => r.json());
    setPhotos(d.photos || []);
    setTableExists(d.tableExists !== false);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  function flash(ok: boolean, text: string) {
    setMsg({ ok, text });
    setTimeout(() => setMsg(null), 3500);
  }

  async function save(key: string, url: string | null) {
    const res = await fetch("/api/hajj-photos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, image_url: url }),
    });
    if (!res.ok) throw new Error((await res.json()).error || "Save failed");
    setPhotos((ps) => ps.map((p) => (p.key === key ? { ...p, image_url: url } : p)));
  }

  async function onFile(file: File) {
    const key = targetKey.current;
    setBusy(key);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "hajj");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Upload failed");
      await save(key, d.url);
      flash(true, "Photo saved — it now appears on every package that uses it.");
    } catch (e) {
      flash(false, e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(null);
    }
  }

  const groups = Array.from(new Set(photos.map((p) => p.grp)));

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Hajj Photos</h1>
        <p className="text-sm text-slate-400 mt-1 max-w-[640px]">
          Upload one photo per hotel or service. Every Hajj package that uses that hotel shows it automatically on its
          card, detail page and comparison. A package&apos;s own cover photo (Admin → Packages) still takes priority.
        </p>
      </div>

      {msg && (
        <div className={`mb-5 px-4 py-3 rounded-lg text-sm font-semibold ${msg.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
          {msg.text}
        </div>
      )}

      {!tableExists && (
        <div className="mb-6 p-5 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
          The photo library table doesn&apos;t exist yet. Run <code className="font-mono">supabase/migrations/013_hajj_photos.sql</code> in
          the Supabase SQL editor, then refresh this page.
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
      />

      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-8 h-8 border-2 border-[#4DA3E8] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        groups.map((g) => (
          <div key={g} className="mb-10">
            <h2 className="text-[13px] font-semibold tracking-[1.5px] uppercase text-slate-400 mb-4">{g}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {photos
                .filter((p) => p.grp === g)
                .map((p) => (
                  <div key={p.key} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="h-[140px] bg-slate-100 relative">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.label} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[12px] text-slate-400">No photo yet</div>
                      )}
                      {busy === p.key && (
                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-[#4DA3E8] border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                    <div className="p-3.5">
                      <div className="text-[13px] font-semibold text-[#1E293B] leading-snug mb-3 min-h-[34px]">{p.label}</div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={!tableExists || busy !== null}
                          onClick={() => {
                            targetKey.current = p.key;
                            fileRef.current?.click();
                          }}
                          className="flex-1 bg-[#4DA3E8] text-white py-2 rounded-lg text-[12px] font-semibold border-none cursor-pointer hover:bg-[#2B7CC4] disabled:opacity-50"
                        >
                          {p.image_url ? "Replace" : "Upload"}
                        </button>
                        {p.image_url && (
                          <button
                            type="button"
                            onClick={() => save(p.key, null).catch((e) => flash(false, e.message))}
                            className="px-3 py-2 rounded-lg text-[12px] font-semibold text-red-500 border border-red-200 bg-white cursor-pointer hover:bg-red-50"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </AdminLayout>
  );
}
