"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Icons";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Spotlight {
  enabled: boolean;
  eyebrow: string;
  title: string;
  title_highlight: string;
  subtitle: string;
  bg_image: string;
  badge_enabled: boolean;
  badge_text: string;
  season_note: string;
  cta_label: string;
  cta_link: string;
  spotlight_type: string;
  secondary_enabled: boolean;
  secondary_type: string;
  secondary_eyebrow: string;
  secondary_title: string;
  secondary_title_highlight: string;
  secondary_subtitle: string;
  secondary_bg_image: string;
  secondary_cta_label: string;
  secondary_cta_link: string;
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=85&w=2400";

export default function SeasonalSpotlight() {
  const [s, setS] = useState<Spotlight | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/umrah-section")
      .then((r) => r.json())
      .then((d) => setS(d.section || null))
      .catch(() => setS(null))
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || !s || !s.enabled) return null;

  const bg = s.bg_image || FALLBACK_IMG;
  const cta = s.cta_link || `/packages?type=${s.spotlight_type || "Umrah"}`;
  const showSecondary = s.secondary_enabled && (s.secondary_title || s.secondary_bg_image);

  return (
    <section id="seasonal-spotlight" className="bg-midnight py-16 px-6 md:px-9">
      <div className="max-w-[1280px] mx-auto space-y-5">

        {/* ── PRIMARY spotlight ── */}
        <ScrollReveal>
          <div className="relative rounded-3xl overflow-hidden min-h-[340px] flex">
            <img src={bg} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(105deg, rgba(11,22,40,0.94) 0%, rgba(11,22,40,0.8) 45%, rgba(21,37,69,0.45) 75%, rgba(21,37,69,0.2) 100%)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent" />

            <div className="relative z-10 w-full flex items-center">
              <div className="max-w-[620px] px-7 md:px-12 py-11">
                {s.eyebrow && (
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-px bg-gradient-to-r from-accent to-transparent" />
                    <span className="font-mono text-[11px] tracking-[3px] uppercase text-accent-soft">{s.eyebrow}</span>
                  </div>
                )}

                <h2 className="font-display text-white leading-[0.95] text-[40px] md:text-[58px] mb-4">
                  {s.title}{" "}
                  {s.title_highlight && <span className="italic text-accent-soft font-normal">{s.title_highlight}</span>}
                </h2>

                {s.subtitle && (
                  <p className="text-white/60 text-[15px] leading-relaxed max-w-[520px] mb-6">{s.subtitle}</p>
                )}

                {(s.badge_enabled && s.badge_text) || s.season_note ? (
                  <div className="flex flex-wrap items-center gap-3 mb-7">
                    {s.badge_enabled && s.badge_text && (
                      <span className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono text-[11px] font-semibold tracking-[1px] px-3.5 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        {s.badge_text}
                      </span>
                    )}
                    {s.season_note && (
                      <span className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/25 text-emerald-300 font-mono text-[11px] font-semibold tracking-[1px] px-3.5 py-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {s.season_note}
                      </span>
                    )}
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={cta}
                    className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3.5 rounded-xl font-heading text-sm font-semibold no-underline hover:bg-accent-dark transition-all hover:-translate-y-px hover:shadow-lg"
                  >
                    {s.cta_label || "Explore Packages"}
                    <ArrowIcon size={14} color="white" />
                  </Link>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-3.5 rounded-xl font-heading text-sm font-semibold no-underline border border-white/25 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all hover:-translate-y-px"
                  >
                    Talk to an Advisor
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── SECONDARY spotlight (compact) ── */}
        {showSecondary && (
          <ScrollReveal delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden min-h-[180px] flex">
              <img
                src={s.secondary_bg_image || FALLBACK_IMG}
                alt={s.secondary_title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(105deg, rgba(11,22,40,0.92) 0%, rgba(11,22,40,0.72) 50%, rgba(21,37,69,0.3) 100%)" }}
              />
              <div className="relative z-10 w-full flex items-center">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 w-full px-7 md:px-10 py-8">
                  <div className="max-w-[640px]">
                    {s.secondary_eyebrow && (
                      <div className="font-mono text-[10px] tracking-[2.5px] uppercase text-accent-soft mb-2">
                        {s.secondary_eyebrow}
                      </div>
                    )}
                    <h3 className="font-display text-white leading-tight text-[28px] md:text-[36px]">
                      {s.secondary_title}{" "}
                      {s.secondary_title_highlight && (
                        <span className="italic text-accent-soft font-normal">{s.secondary_title_highlight}</span>
                      )}
                    </h3>
                    {s.secondary_subtitle && (
                      <p className="text-white/55 text-[13px] leading-relaxed max-w-[520px] mt-2">{s.secondary_subtitle}</p>
                    )}
                  </div>
                  <Link
                    href={s.secondary_cta_link || `/packages?type=${s.secondary_type || "Holidays"}`}
                    className="inline-flex items-center gap-2 shrink-0 bg-white/10 text-white px-6 py-3 rounded-xl font-heading text-sm font-semibold no-underline border border-white/20 backdrop-blur-sm hover:bg-white/20 hover:border-white/40 transition-all hover:-translate-y-px"
                  >
                    {s.secondary_cta_label || "Explore"}
                    <ArrowIcon size={14} color="white" />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
