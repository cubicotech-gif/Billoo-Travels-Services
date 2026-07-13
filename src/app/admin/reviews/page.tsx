"use client";

import { useEffect, useState, type ReactNode } from "react";
import AdminLayout from "@/components/AdminLayout";

interface ReviewSettings {
  google_reviews_enabled: boolean;
  google_reviews_embed: string;
  google_reviews_script: string;
  google_reviews_url: string;
  google_rating: string;
  google_reviews_count: string;
}

const EMPTY: ReviewSettings = {
  google_reviews_enabled: true,
  google_reviews_embed: "",
  google_reviews_script: "",
  google_reviews_url: "",
  google_rating: "",
  google_reviews_count: "",
};

const CLS =
  "w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white text-[#1E293B] focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300";

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{hint}</p>}
    </div>
  );
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${on ? "bg-[#4DA3E8]" : "bg-slate-300"}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? "translate-x-6" : ""}`} />
    </button>
  );
}

export default function AdminReviews() {
  const [form, setForm] = useState<ReviewSettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  function set<K extends keyof ReviewSettings>(k: K, v: ReviewSettings[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }
  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  }

  useEffect(() => {
    fetch("/api/site-settings")
      .then((r) => r.json())
      .then((d) => {
        if (d && !d.error) {
          setForm({
            google_reviews_enabled: d.google_reviews_enabled ?? true,
            google_reviews_embed: d.google_reviews_embed ?? "",
            google_reviews_script: d.google_reviews_script ?? "",
            google_reviews_url: d.google_reviews_url ?? "",
            google_rating: d.google_rating ?? "",
            google_reviews_count: d.google_reviews_count ?? "",
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/site-settings", {
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
    notify("Saved! Your reviews section is updated.");
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0B1628]" style={{ fontFamily: "'Sora', sans-serif" }}>Google Reviews</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Connect your real Google reviews so they show live on the homepage and the Hajj page.
          </p>
        </div>

        {/* How-to guide */}
        <div className="mb-6 rounded-2xl border border-[#4DA3E8]/25 bg-[#EBF5FF] p-5">
          <p className="font-semibold text-[#0B1628] text-sm mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
            How to connect your Google reviews (2 minutes)
          </p>
          <ol className="text-[13px] text-slate-600 leading-relaxed list-decimal ml-4 space-y-1">
            <li>Create a free widget at a reviews provider — e.g. <strong>Elfsight</strong> (elfsight.com), <strong>Featurable</strong> (featurable.com) or <strong>Trustindex</strong>. Connect your Google Business profile.</li>
            <li>The provider gives you an <strong>embed code</strong> (a <code className="bg-white px-1 rounded">&lt;div&gt;</code>) and a <strong>script URL</strong>. Paste them below.</li>
            <li>Add your Google reviews link, star rating and review count for the badge.</li>
            <li>Save — the widget appears automatically everywhere reviews are shown.</li>
          </ol>
          <p className="text-[12px] text-slate-500 mt-2">
            Until a widget is added, the site shows your Google rating badge, a &ldquo;Read our Google Reviews&rdquo; button, and any reviews you publish under <strong>Testimonials</strong>.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#4DA3E8] border-t-transparent rounded-full animate-spin" /> Loading…
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-[#0B1628]" style={{ fontFamily: "'Sora', sans-serif" }}>Reviews Section</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Show or hide the reviews section across the site.</p>
                </div>
                <Toggle on={form.google_reviews_enabled} onClick={() => set("google_reviews_enabled", !form.google_reviews_enabled)} />
              </div>

              <Field label="Widget embed code" hint="The <div>…</div> snippet from your reviews provider, e.g. <div class=&quot;elfsight-app-XXXX&quot; data-elfsight-app-lazy></div>">
                <textarea
                  value={form.google_reviews_embed}
                  onChange={(e) => set("google_reviews_embed", e.target.value)}
                  rows={4}
                  placeholder='<div class="elfsight-app-xxxxxxxx" data-elfsight-app-lazy></div>'
                  className={CLS + " font-mono text-[12px] resize-none"}
                />
              </Field>

              <Field label="Widget script URL" hint="The platform script from your provider, e.g. https://static.elfsight.com/platform/platform.js">
                <input
                  value={form.google_reviews_script}
                  onChange={(e) => set("google_reviews_script", e.target.value)}
                  placeholder="https://static.elfsight.com/platform/platform.js"
                  className={CLS + " font-mono text-[12px]"}
                />
              </Field>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
              <div>
                <h2 className="font-bold text-[#0B1628]" style={{ fontFamily: "'Sora', sans-serif" }}>Rating Badge</h2>
                <p className="text-xs text-slate-400 mt-0.5">Shown even without a widget — keep these matching your real Google profile.</p>
              </div>

              <Field label="Google reviews link" hint="Where the “See all reviews” button sends visitors (your Google Business / Maps reviews URL).">
                <input
                  value={form.google_reviews_url}
                  onChange={(e) => set("google_reviews_url", e.target.value)}
                  placeholder="https://g.page/r/…  or  https://maps.google.com/…"
                  className={CLS}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Star rating" hint="e.g. 4.9">
                  <input value={form.google_rating} onChange={(e) => set("google_rating", e.target.value)} placeholder="4.9" className={CLS} />
                </Field>
                <Field label="Number of reviews" hint="e.g. 320">
                  <input value={form.google_reviews_count} onChange={(e) => set("google_reviews_count", e.target.value)} placeholder="320" className={CLS} />
                </Field>
              </div>
            </div>

            <div className="flex items-center justify-end pb-4">
              <button
                type="submit"
                disabled={saving}
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
