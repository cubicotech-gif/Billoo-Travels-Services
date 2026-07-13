"use client";

import { useEffect, useMemo, useState } from "react";
import { useSiteSettings } from "@/lib/siteSettings";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { QuoteIcon, ArrowIcon } from "@/components/ui/Icons";

// Official multi-colour Google "G"
function GoogleG({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function Stars({ value = 5, size = 14 }: { value?: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < Math.round(value) ? "#FBBC05" : "#E2E8F0"}>
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function loadScript(src: string) {
  if (!src) return;
  if (document.querySelector(`script[src="${src}"]`)) {
    // Script already present — nudge known providers to re-scan for new widgets
    const w = window as unknown as { eapps?: { onInit?: () => void } };
    w.eapps?.onInit?.();
    return;
  }
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  document.body.appendChild(s);
}

/**
 * Injects the provider's widget container and loads its platform script(s).
 * Works with Elfsight, Featurable, Trustindex and similar snippets — and is
 * forgiving: you can paste the whole snippet (script + div) into one field,
 * or keep the div and script separate. Scripts injected via innerHTML don't
 * execute, so we extract any <script src> and load it properly.
 */
function WidgetEmbed({ html, script }: { html: string; script?: string | null }) {
  // Strip <script> tags out of the markup — we load them ourselves below.
  const cleanedHtml = useMemo(
    () => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ""),
    [html]
  );

  useEffect(() => {
    // Load any script srcs found inside the pasted embed…
    const re = /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) loadScript(m[1]);
    // …plus the explicit script field, if provided.
    if (script) loadScript(script);
  }, [html, script]);

  return <div dangerouslySetInnerHTML={{ __html: cleanedHtml }} />;
}

interface DbTestimonial {
  id: number;
  name: string;
  role: string | null;
  text: string;
  img: string | null;
  rating: number;
}

interface Props {
  /** visual tone — "dark" sits on an image backdrop, "light" on the surface */
  tone?: "dark" | "light";
}

export default function GoogleReviews({ tone = "dark" }: Props) {
  const s = useSiteSettings();
  const [fallback, setFallback] = useState<DbTestimonial[]>([]);

  // Only treat the embed as a real widget if it actually looks like widget markup —
  // guards against accidentally pasting plain text (e.g. the SQL setup) into the field.
  const embed = s.google_reviews_embed || "";
  const looksLikeWidget =
    /<(div|ins|iframe|script|blockquote)\b/i.test(embed) ||
    /elfsight|featurable|trustindex|elfsight-app|\.elf\.site/i.test(embed);
  const hasWidget = Boolean(s.google_reviews_enabled && embed && looksLikeWidget);

  // When no live widget is configured, fall back to published reviews from the admin panel
  useEffect(() => {
    if (hasWidget) return;
    fetch("/api/testimonials?published=1")
      .then((r) => r.json())
      .then((d) => setFallback(Array.isArray(d.testimonials) ? d.testimonials : []))
      .catch(() => setFallback([]));
  }, [hasWidget]);

  if (s.google_reviews_enabled === false) return null;

  const dark = tone === "dark";
  const rating = s.google_rating || "4.9";
  const count = s.google_reviews_count;

  return (
    <section className={`relative py-16 md:py-20 px-6 md:px-9 overflow-hidden ${dark ? "" : "bg-surface-alt"}`}>
      {dark && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=2000')" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(11,22,40,0.93), rgba(15,29,53,0.9))" }} />
        </>
      )}

      <div className="relative z-10 max-w-[1080px] mx-auto">
        <div className="text-center mb-8">
          <SectionHeading label="Google Reviews" title="Trusted by" highlight="Our Pilgrims" centered light={dark} />
        </div>

        {/* Real Google rating badge */}
        <ScrollReveal>
          <div className="flex justify-center mb-10">
            <div className={`inline-flex items-center gap-3.5 rounded-2xl px-5 py-3.5 border ${dark ? "bg-white/95 border-white/20" : "bg-white border-slate-200 shadow-sm"}`}>
              <GoogleG size={26} />
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-lg font-bold text-midnight leading-none">{rating}</span>
                  <Stars value={parseFloat(rating) || 5} />
                </div>
                <div className="font-mono text-[10px] tracking-[0.5px] text-slate-500 mt-1">
                  {count ? `Based on ${count} Google reviews` : "Rated by our pilgrims on Google"}
                </div>
              </div>
              {s.google_reviews_url && (
                <a
                  href={s.google_reviews_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 inline-flex items-center gap-1.5 bg-accent text-white text-[12px] font-heading font-semibold px-3.5 py-2 rounded-lg no-underline hover:bg-accent-dark transition-all"
                >
                  See all
                  <ArrowIcon size={13} color="#fff" />
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Live widget — real reviews auto-synced from Google */}
        {hasWidget ? (
          <ScrollReveal>
            <WidgetEmbed html={s.google_reviews_embed as string} script={s.google_reviews_script} />
          </ScrollReveal>
        ) : fallback.length > 0 ? (
          // Published reviews entered in the admin panel
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {fallback.slice(0, 6).map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 0.06}>
                <div className="h-full bg-white rounded-2xl p-7 border border-slate-200 relative">
                  <div className="absolute top-5 right-5"><QuoteIcon size={34} /></div>
                  <Stars value={t.rating || 5} />
                  <p className="text-[14px] text-slate-600 leading-relaxed my-4 relative z-10">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 mt-auto">
                    {t.img ? (
                      <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-midnight flex items-center justify-center text-accent font-bold">{t.name.charAt(0)}</div>
                    )}
                    <div>
                      <div className="font-heading text-sm font-bold text-midnight">{t.name}</div>
                      {t.role && <div className="font-mono text-[10px] tracking-[1px] uppercase text-accent mt-0.5">{t.role}</div>}
                    </div>
                    <span className="ml-auto"><GoogleG size={18} /></span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          // Nothing configured yet — honest CTA, no fake reviews
          <ScrollReveal>
            <div className={`max-w-[520px] mx-auto text-center rounded-2xl p-9 border ${dark ? "bg-white/95 border-white/20" : "bg-white border-slate-200"}`}>
              <div className="flex justify-center mb-4"><GoogleG size={34} /></div>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-5">
                Read what our pilgrims say about their journey with Billoo Travels on Google.
              </p>
              {s.google_reviews_url && (
                <a
                  href={s.google_reviews_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-heading text-sm font-semibold no-underline hover:bg-accent-dark transition-all"
                >
                  Read our Google Reviews
                  <ArrowIcon size={15} color="#fff" />
                </a>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
