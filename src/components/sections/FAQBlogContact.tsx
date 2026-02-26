"use client";

import { useState } from "react";
import { FAQS, BLOGS, CONTACT } from "@/lib/data";
import { ChevronDownIcon, CalendarIcon, ClockIcon, ArrowIcon, PhoneIcon, MailIcon, MapPinIcon } from "@/components/ui/Icons";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

// ─── FAQ ───
export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-9 bg-surface">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <SectionHeading label="FAQ" title="Common" highlight="Questions" centered />
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div
                className={`border rounded-[14px] overflow-hidden transition-all duration-300 bg-white ${
                  open === i ? "border-accent shadow-[0_4px_16px_rgba(77,163,232,0.12)]" : "border-slate-200 hover:border-accent"
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full px-5 py-4.5 flex justify-between items-center bg-transparent border-none cursor-pointer font-heading text-[15px] font-semibold text-midnight text-left"
                >
                  {f.q}
                  <div className={`transition-transform duration-300 min-w-[20px] ${open === i ? "rotate-180" : ""}`}>
                    <ChevronDownIcon color={open === i ? "#4DA3E8" : "#94A3B8"} />
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{ maxHeight: open === i ? 200 : 0 }}
                >
                  <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">{f.a}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BLOG ───
export function Blog() {
  return (
    <section className="py-24 px-6 md:px-9 bg-surface-alt">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <SectionHeading label="Journal" title="Travel" highlight="Insights" />
          <button className="bg-transparent border-none text-accent font-heading text-[13px] font-semibold cursor-pointer flex items-center gap-1 hover:gap-2 transition-all">
            All Articles <ArrowIcon size={14} color="#4DA3E8" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BLOGS.map((b, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-[450ms] hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(11,22,40,0.07)] hover:border-accent group cursor-pointer">
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={b.placeholder}
                    alt={b.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-accent text-white">
                      {b.cat}
                    </span>
                  </div>
                </div>
                <div className="p-5 pb-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                    <span className="flex items-center gap-1"><CalendarIcon />{b.date}</span>
                    <span className="flex items-center gap-1"><ClockIcon />{b.read}</span>
                  </div>
                  <h3 className="font-heading text-[17px] font-bold text-midnight mb-2 leading-snug">{b.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ───
export function Contact() {
  const contactInfo = [
    { icon: PhoneIcon, label: "Call", value: CONTACT.phone },
    { icon: MailIcon, label: "Email", value: CONTACT.email },
    { icon: MapPinIcon, label: "Office", value: CONTACT.address },
  ];

  return (
    <section id="contact" className="py-24 px-6 md:px-9 bg-surface">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <ScrollReveal>
          <div>
            <SectionHeading label="Contact Us" title="Ready to" highlight="Depart?" />
            <p className="text-[15px] text-slate-500 leading-relaxed mt-4 mb-9 max-w-[380px]">
              Our advisors craft personalized itineraries. We respond within 24 hours.
            </p>
            <div className="flex flex-col gap-5">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-3.5">
                  <div className="w-[42px] h-[42px] bg-accent-pale rounded-[10px] flex items-center justify-center">
                    <item.icon color="#4DA3E8" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-slate-400 tracking-[1.5px] uppercase">{item.label}</div>
                    <div className="font-heading font-semibold text-midnight text-sm mt-0.5">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <div className="bg-white rounded-[20px] p-9 shadow-[0_6px_24px_rgba(0,0,0,0.04)] border border-slate-200">
            <h3 className="font-heading text-xl font-bold text-midnight mb-6">Send a Message</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {["Full Name", "Email", "Phone", "Destination"].map((ph) => (
                <input
                  key={ph}
                  placeholder={ph}
                  className="w-full px-4 py-3.5 border-[1.5px] border-slate-200 rounded-[10px] font-body text-sm bg-white text-slate-700 transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(77,163,232,0.12)] placeholder:text-slate-400"
                />
              ))}
            </div>
            <textarea
              placeholder="Your message..."
              rows={3}
              className="w-full mt-3.5 px-4 py-3.5 border-[1.5px] border-slate-200 rounded-[10px] font-body text-sm bg-white text-slate-700 resize-none transition-all focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(77,163,232,0.12)] placeholder:text-slate-400"
            />
            <button className="w-full mt-5 flex items-center justify-center gap-2 bg-accent text-white py-3.5 rounded-lg font-heading text-sm font-semibold hover:bg-accent-dark transition-all hover:-translate-y-px hover:shadow-lg border-none cursor-pointer">
              Submit Inquiry <ArrowIcon size={15} color="#fff" />
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Google Maps Embed */}
      <ScrollReveal delay={0.18}>
        <div className="max-w-[1100px] mx-auto mt-10 rounded-[20px] overflow-hidden border border-slate-200 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
          <iframe
            title="Billoo Travels Office Location — DHA Phase 5, Karachi"
            src="https://maps.google.com/maps?q=24.8038,67.0319&hl=en&z=16&output=embed"
            width="100%"
            height="300"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
