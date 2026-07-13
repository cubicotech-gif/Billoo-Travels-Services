"use client";

import { useState } from "react";
import { KaabaIcon, CheckIcon, ArrowIcon, ShieldIcon } from "@/components/ui/Icons";
import { HAJJ } from "@/lib/hajj";

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  pilgrims: string;
  message: string;
}

const EMPTY: FormState = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  pilgrims: "1",
  message: "",
};

interface Props {
  /** where the lead is coming from — stored with the enquiry for the CRM */
  source?: string;
  /** compact heading label */
  heading?: string;
}

/**
 * Self-contained Hajj registration form. Posts to the same /api/contact
 * endpoint the rest of the site uses, so every registration lands in the
 * admin CRM alongside normal enquiries.
 */
export default function HajjLeadForm({
  source = "Hajj Registration",
  heading,
}: Props) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(field: K, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.email) {
      setError("Please share your name, phone and email so we can reach you.");
      return;
    }
    setSubmitting(true);
    setError("");

    const composedMessage = [
      `Hajj ${HAJJ.year} registration request (${source}).`,
      `Pilgrims: ${form.pilgrims}`,
      form.city ? `City: ${form.city}` : "",
      form.message ? `Notes: ${form.message}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          destination: form.city || null,
          packageInterest: HAJJ.packageInterest,
          message: composedMessage,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
          <CheckIcon size={26} color="#10B981" />
        </div>
        <h3 className="font-heading text-xl font-bold text-midnight mb-2">
          You&apos;re registered!
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed max-w-[300px] mx-auto">
          Thank you, {form.fullName.split(" ")[0]}. Our Hajj {HAJJ.year} team will contact you
          shortly on <span className="font-semibold text-midnight">{form.phone}</span>.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2.5 mb-1.5">
        <KaabaIcon size={22} color="#4DA3E8" />
        <h3 className="font-heading text-lg font-bold text-midnight">
          {heading || `Register for Hajj ${HAJJ.year}`}
        </h3>
      </div>
      <p className="text-[13px] text-slate-400 mb-5">
        Takes under a minute · An advisor calls you back
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          placeholder="Full Name *"
          className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-[10px] font-body text-sm text-slate-700 transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(77,163,232,0.12)] placeholder:text-slate-400"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="Phone / WhatsApp *"
            className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-[10px] font-body text-sm text-slate-700 transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(77,163,232,0.12)] placeholder:text-slate-400"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="Email *"
            className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-[10px] font-body text-sm text-slate-700 transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(77,163,232,0.12)] placeholder:text-slate-400"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="City"
            className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-[10px] font-body text-sm text-slate-700 transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(77,163,232,0.12)] placeholder:text-slate-400"
          />
          <select
            value={form.pilgrims}
            onChange={(e) => update("pilgrims", e.target.value)}
            className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-[10px] font-body text-sm text-slate-700 bg-white cursor-pointer transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(77,163,232,0.12)]"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n === 6 ? "6+" : String(n)}>
                {n === 6 ? "6+ Pilgrims" : `${n} ${n === 1 ? "Pilgrim" : "Pilgrims"}`}
              </option>
            ))}
          </select>
        </div>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Anything we should know? (optional)"
          rows={2}
          className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-[10px] font-body text-sm text-slate-700 resize-none transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(77,163,232,0.12)] placeholder:text-slate-400"
        />

        {error && (
          <div className="text-red-500 text-[13px] bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full mt-1 flex items-center justify-center gap-2 bg-accent text-white py-3.5 rounded-lg font-heading text-sm font-semibold hover:bg-accent-dark transition-all hover:-translate-y-px hover:shadow-lg border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          {submitting ? "Registering…" : "Register My Interest"}
          {!submitting && <ArrowIcon size={15} color="#fff" />}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
          <ShieldIcon size={12} color="#94A3B8" />
          Your details are private · No payment required
        </div>
      </form>
    </>
  );
}
