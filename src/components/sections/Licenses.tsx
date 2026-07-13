"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { ShieldIcon, CheckIcon } from "@/components/ui/Icons";

interface License {
  title: string;
  issuer: string;
  image: string;
  doc_url: string;
}

interface Props {
  tone?: "surface" | "surface-alt";
}

export default function Licenses({ tone = "surface" }: Props) {
  const [items, setItems] = useState<License[] | null>(null);
  const [label, setLabel] = useState("Officially Licensed & Verified");
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    fetch("/api/homepage")
      .then((r) => r.json())
      .then((d) => {
        const c = d.content;
        if (!c) {
          setItems([]);
          return;
        }
        setEnabled(c.licenses_enabled !== false);
        setLabel(c.licenses_label || "Officially Licensed & Verified");
        setItems(Array.isArray(c.licenses) ? c.licenses.filter((l: License) => l.title) : []);
      })
      .catch(() => setItems([]));
  }, []);

  if (items === null || !enabled || items.length === 0) return null;

  return (
    <section className={`py-20 md:py-24 px-6 md:px-9 ${tone === "surface" ? "bg-surface" : "bg-surface-alt"}`}>
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-4">
          <SectionHeading label="Credentials" title="Officially" highlight="Licensed & Verified" centered />
        </div>
        <p className="text-center text-slate-500 max-w-[560px] mx-auto mb-12 text-[15px] leading-relaxed">
          {label} — every document below is genuine and verifiable. Your pilgrimage is handled by a
          registered, accountable operator.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((l, i) => {
            const Card = (
              <div className="group h-full bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-accent hover:shadow-[0_14px_36px_rgba(77,163,232,0.14)] transition-all duration-300 flex flex-col">
                {/* Document preview */}
                <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden flex items-center justify-center">
                  {l.image ? (
                    <img
                      src={l.image}
                      alt={`${l.title} — ${l.issuer}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-300">
                      <ShieldIcon size={40} color="#CBD5E1" />
                      <span className="font-mono text-[10px] tracking-[1px] uppercase">Document</span>
                    </div>
                  )}
                  {/* Verified ribbon */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] font-semibold tracking-[0.5px] px-2.5 py-1 rounded-full shadow">
                    <CheckIcon size={11} color="#fff" />
                    Verified
                  </div>
                </div>

                {/* Meta */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-heading text-[15px] font-bold text-midnight leading-snug">{l.title}</h3>
                  <div className="font-mono text-[10px] tracking-[1px] uppercase text-accent mt-1.5">{l.issuer}</div>
                  {l.doc_url && (
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-heading font-semibold text-slate-400 group-hover:text-accent transition-colors">
                      View document →
                    </span>
                  )}
                </div>
              </div>
            );

            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                {l.doc_url ? (
                  <a href={l.doc_url} target="_blank" rel="noopener noreferrer" className="block h-full no-underline">
                    {Card}
                  </a>
                ) : (
                  Card
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
