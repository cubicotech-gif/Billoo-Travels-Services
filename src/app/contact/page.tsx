"use client";

import { useState } from "react";
import InnerLayout from "@/components/InnerLayout";
import PageBanner from "@/components/ui/PageBanner";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CONTACT } from "@/lib/data";
import { PhoneIcon, MailIcon, MapPinIcon, ArrowIcon, CheckIcon } from "@/components/ui/Icons";

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", destination: "", packageInterest: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const contactInfo = [
    { icon: PhoneIcon, label: "Phone", value: CONTACT.phone, sub: "Mon–Sat, 9AM–8PM" },
    { icon: MailIcon, label: "Email", value: CONTACT.email, sub: "We reply within 24 hours" },
    { icon: MapPinIcon, label: "Office", value: CONTACT.address, sub: "Visit by appointment" },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to send message."); setSubmitting(false); return; }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <InnerLayout>
      <PageBanner
        label="Contact"
        title="Get in"
        highlight="Touch"
        description="Our travel advisors are ready to help you plan the perfect journey."
      />

      <section className="py-20 px-6 md:px-9 bg-surface">
        <div className="max-w-[1100px] mx-auto">
          {/* Contact Cards */}
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
              {contactInfo.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-7 text-center hover:border-accent hover:shadow-[0_8px_24px_rgba(77,163,232,0.12)] transition-all duration-400 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-accent-pale flex items-center justify-center mx-auto mb-4">
                    <item.icon color="#4DA3E8" size={18} />
                  </div>
                  <div className="font-mono text-[10px] text-slate-400 tracking-[1.5px] uppercase mb-2">{item.label}</div>
                  <div className="font-heading text-base font-bold text-midnight mb-1">{item.value}</div>
                  <div className="text-xs text-slate-400">{item.sub}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-[0_6px_24px_rgba(0,0,0,0.04)]">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                      <CheckIcon size={28} color="#10B981" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-midnight mb-2">Message Sent!</h3>
                    <p className="text-slate-500 text-sm">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ fullName: "", email: "", phone: "", destination: "", packageInterest: "", message: "" }); }}
                      className="mt-5 text-accent font-heading text-sm font-semibold hover:underline bg-transparent border-none cursor-pointer"
                    >
                      Send another message →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h2 className="font-heading text-2xl font-bold text-midnight mb-2">Send Us a Message</h2>
                    <p className="text-sm text-slate-400 mb-6">Fill out the form and we&apos;ll get back to you promptly.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <input
                        required
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                        className="w-full px-4 py-3.5 border-[1.5px] border-slate-200 rounded-[10px] text-sm bg-white text-slate-700 transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(77,163,232,0.12)] placeholder:text-slate-400"
                      />
                      <input
                        required
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-3.5 border-[1.5px] border-slate-200 rounded-[10px] text-sm bg-white text-slate-700 transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(77,163,232,0.12)] placeholder:text-slate-400"
                      />
                      <input
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className="w-full px-4 py-3.5 border-[1.5px] border-slate-200 rounded-[10px] text-sm bg-white text-slate-700 transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(77,163,232,0.12)] placeholder:text-slate-400"
                      />
                      <input
                        placeholder="Destination"
                        value={form.destination}
                        onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
                        className="w-full px-4 py-3.5 border-[1.5px] border-slate-200 rounded-[10px] text-sm bg-white text-slate-700 transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(77,163,232,0.12)] placeholder:text-slate-400"
                      />
                    </div>

                    <select
                      value={form.packageInterest}
                      onChange={(e) => setForm((f) => ({ ...f, packageInterest: e.target.value }))}
                      className="w-full mt-3.5 px-4 py-3.5 border-[1.5px] border-slate-200 rounded-[10px] text-sm bg-white text-slate-500 cursor-pointer focus:outline-none focus:border-accent appearance-none"
                    >
                      <option value="">Select Package Interest</option>
                      <option value="economy">Economy Package</option>
                      <option value="business">Business Package</option>
                      <option value="first">First Class Package</option>
                      <option value="custom">Custom / Not Sure</option>
                    </select>

                    <textarea
                      placeholder="Tell us about your travel plans, group size, preferred dates..."
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full mt-3.5 px-4 py-3.5 border-[1.5px] border-slate-200 rounded-[10px] text-sm bg-white text-slate-700 resize-none transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(77,163,232,0.12)] placeholder:text-slate-400"
                    />

                    {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full mt-5 flex items-center justify-center gap-2 bg-accent text-white py-3.5 rounded-lg font-heading text-sm font-semibold hover:bg-accent-dark transition-all hover:-translate-y-px hover:shadow-lg border-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Sending…" : <><span>Submit Inquiry</span><ArrowIcon size={15} color="#fff" /></>}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="flex flex-col gap-5">
                <div className="bg-slate-200 rounded-2xl overflow-hidden h-[300px] lg:h-[340px] border border-slate-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.123!2d67.055!3d24.805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ4JzE4LjAiTiA2N8KwMDMnMTguMCJF!5e0!3m2!1sen!2s!4v1700000000000"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" title="Billoo Travels Office Location"
                  />
                </div>
                <a
                  href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="bg-[#25D366] text-white rounded-2xl p-6 no-underline flex items-center gap-4 hover:-translate-y-1 transition-all hover:shadow-[0_12px_32px_rgba(37,211,102,0.25)]"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFF"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <div className="font-heading text-base font-bold">Chat on WhatsApp</div>
                    <div className="text-sm text-white/70">Instant replies during business hours</div>
                  </div>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}
