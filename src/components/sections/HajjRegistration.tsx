"use client";

import { useState } from "react";
import { KaabaIcon, CheckIcon, ArrowIcon, ShieldIcon } from "@/components/ui/Icons";
import ScrollReveal from "@/components/ui/ScrollReveal";

const HAJJ_YEAR = "2027";
const PACKAGE_INTEREST = `Hajj ${HAJJ_YEAR} Registration`;

const BG_IMG =
  "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=85&w=2400";

const BENEFITS = [
  "Government-approved Hajj group operator",
  "Priority visa & Nusuk processing",
  "5-star hotels near the Haram in Makkah & Madinah",
  "VIP Mina & Arafat camps with scholar guidance",
];

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

export default function HajjRegistration() {
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
      `Hajj ${HAJJ_YEAR} registration request.`,
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
          packageInterest: PACKAGE_INTEREST,
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

  return (
    <section id="hajj-registration" className="bg-midnight py-16 px-6 md:px-9">
      <div className="max-w-[1280px] mx-auto">
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden">
            <img src={BG_IMG} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, rgba(11,22,40,0.96) 0%, rgba(11,22,40,0.9) 42%, rgba(21,37,69,0.7) 100%)",
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-10 lg:gap-14 items-center px-7 md:px-12 py-11 md:py-14">
              {/* ── Promo copy ── */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-2 bg-emerald-400/12 border border-emerald-400/30 text-emerald-300 font-mono text-[11px] font-semibold tracking-[1.5px] px-3.5 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    REGISTRATION OPEN
                  </span>
                  <span className="inline-flex items-center gap-2 bg-amber-400/12 border border-amber-400/30 text-amber-300 font-mono text-[11px] font-semibold tracking-[1px] px-3.5 py-1.5 rounded-full">
                    Limited Seats
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-gradient-to-r from-accent to-transparent" />
                  <span className="font-mono text-[11px] tracking-[3px] uppercase text-accent-soft">
                    Hajj {HAJJ_YEAR} · 1449 AH
                  </span>
                </div>

                <h2 className="font-display text-white leading-[0.95] text-[38px] md:text-[54px] mb-4">
                  Hajj {HAJJ_YEAR} Registration{" "}
                  <span className="italic text-accent-soft font-normal">Now Open</span>
                </h2>

                <p className="text-white/65 text-[15px] leading-relaxed max-w-[540px] mb-7">
                  Reserve your place for the sacred journey of {HAJJ_YEAR}. Register your details today and
                  our Hajj advisors will call you back with package options, pricing and the next steps —
                  no payment required to register.
                </p>

                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 max-w-[560px]">
                  {BENEFITS.map((b) => (
                    <div key={b} className="flex items-start gap-2.5">
                      <span className="mt-0.5 shrink-0">
                        <CheckIcon size={15} color="#34D399" />
                      </span>
                      <span className="text-white/75 text-[13.5px] leading-snug">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Registration form ── */}
              <div className="bg-white rounded-[20px] p-7 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                {done ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                      <CheckIcon size={26} color="#10B981" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-midnight mb-2">
                      You&apos;re registered!
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-[300px] mx-auto">
                      Thank you, {form.fullName.split(" ")[0]}. Our Hajj {HAJJ_YEAR} team will contact you
                      shortly on <span className="font-semibold text-midnight">{form.phone}</span>.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <KaabaIcon size={22} color="#4DA3E8" />
                      <h3 className="font-heading text-lg font-bold text-midnight">Register for Hajj {HAJJ_YEAR}</h3>
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
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
