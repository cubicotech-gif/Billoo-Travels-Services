"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import InnerLayout from "@/components/InnerLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useCurrency } from "@/lib/currency";
import { CheckIcon, XIcon, CalendarIcon, ArrowIcon, PhoneIcon } from "@/components/ui/Icons";
import Link from "next/link";

interface ItineraryItem { day: string; title: string; desc: string; }

interface DbPackage {
  id: number;
  type: string;
  title: string;
  nights: string;
  hotel: string;
  hotel_short: string | null;
  dates: string | null;
  includes: string[];
  price_pkr: number;
  price_usd: number;
  price_sar: number;
  badge: string | null;
  img: string | null;
  overview: string | null;
  itinerary: ItineraryItem[];
  included_items: string[];
  not_included: string[];
  gallery: string[];
  status: string;
  featured: boolean;
}

function fmtPrice(p: DbPackage, currency: string) {
  const prices: Record<string, number> = { PKR: p.price_pkr, USD: p.price_usd, SAR: p.price_sar };
  const sym: Record<string, string> = { PKR: "PKR ", USD: "$", SAR: "SAR " };
  return `${sym[currency] || ""}${(prices[currency] ?? p.price_pkr).toLocaleString()}`;
}

const FALLBACK_IMG = "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=2000";

export default function PackageDetailPage() {
  const params = useParams();
  const { currency } = useCurrency();
  const [pkg, setPkg] = useState<DbPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/packages/${params.id}`)
      .then((r) => r.json())
      .then((d) => { if (d.package) setPkg(d.package); else setNotFound(true); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <InnerLayout>
        <div className="min-h-[60vh] flex items-center justify-center pt-24">
          <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </InnerLayout>
    );
  }

  if (notFound || !pkg) {
    return (
      <InnerLayout>
        <div className="min-h-[60vh] flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-bold text-midnight mb-4">Package Not Found</h1>
            <Link href="/packages" className="text-accent font-heading text-sm font-semibold no-underline hover:underline">
              ← Back to Packages
            </Link>
          </div>
        </div>
      </InnerLayout>
    );
  }

  const imgSrc = pkg.img || FALLBACK_IMG;

  return (
    <InnerLayout>
      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img src={imgSrc} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,22,40,0.85) 0%, rgba(11,22,40,0.25) 50%, rgba(11,22,40,0.5) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex gap-2 mb-3">
              {pkg.badge && <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-accent text-white">{pkg.badge}</span>}
              <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-white/90 text-midnight">{pkg.type}</span>
              {pkg.featured && <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-amber-400 text-white">★ Featured</span>}
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-2">{pkg.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <span>{pkg.nights}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>{pkg.hotel}</span>
              {pkg.dates && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="flex items-center gap-1.5"><CalendarIcon color="rgba(255,255,255,0.5)" />{pkg.dates}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 md:px-9 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">

          {/* ── Main Content ── */}
          <div>
            {pkg.overview && (
              <ScrollReveal>
                <div className="mb-12">
                  <h2 className="font-heading text-2xl font-bold text-midnight mb-4">Overview</h2>
                  <p className="text-base text-slate-500 leading-relaxed">{pkg.overview}</p>
                </div>
              </ScrollReveal>
            )}

            {pkg.includes?.length > 0 && (
              <ScrollReveal>
                <div className="mb-12">
                  <h2 className="font-heading text-2xl font-bold text-midnight mb-4">Package Highlights</h2>
                  <div className="flex flex-wrap gap-2">
                    {pkg.includes.map((f) => (
                      <span key={f} className="text-[13px] font-semibold text-accent bg-accent-pale px-3 py-1.5 rounded-lg">{f}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {pkg.itinerary?.length > 0 && (
              <ScrollReveal>
                <div className="mb-12">
                  <h2 className="font-heading text-2xl font-bold text-midnight mb-6">Itinerary</h2>
                  <div className="space-y-4">
                    {pkg.itinerary.map((item, i) => (
                      <div key={i} className="flex gap-4 p-5 bg-surface-alt rounded-2xl border border-slate-200">
                        <div className="w-16 shrink-0">
                          <div className="font-mono text-[10px] text-accent tracking-[1.5px] font-semibold">{item.day}</div>
                        </div>
                        <div>
                          <h4 className="font-heading text-[15px] font-bold text-midnight mb-1">{item.title}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {(pkg.included_items?.length > 0 || pkg.not_included?.length > 0) && (
              <ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {pkg.included_items?.length > 0 && (
                    <div className="p-6 bg-accent-pale/50 rounded-2xl border border-accent/10">
                      <h3 className="font-heading text-lg font-bold text-midnight mb-4">What&apos;s Included</h3>
                      <div className="space-y-3">
                        {pkg.included_items.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckIcon size={16} color="#4DA3E8" /><span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {pkg.not_included?.length > 0 && (
                    <div className="p-6 bg-surface-alt rounded-2xl border border-slate-200">
                      <h3 className="font-heading text-lg font-bold text-midnight mb-4">Not Included</h3>
                      <div className="space-y-3">
                        {pkg.not_included.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-slate-500">
                            <XIcon size={16} /><span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {pkg.gallery?.length > 0 && (
              <ScrollReveal>
                <div className="mb-12">
                  <h2 className="font-heading text-2xl font-bold text-midnight mb-6">Gallery</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {pkg.gallery.map((img, i) => (
                      <div key={i} className="rounded-xl overflow-hidden h-[180px] md:h-[220px] border border-slate-200 group cursor-pointer">
                        <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div>
            <div className="sticky top-28">
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                  <div className="font-mono text-[10px] text-slate-400 tracking-[1.5px] uppercase mb-1">Starting from</div>
                  <div className="font-heading text-3xl font-bold text-accent mb-1">{fmtPrice(pkg, currency)}</div>
                  <div className="text-sm text-slate-400 mb-6">per person</div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Duration</span>
                      <span className="font-heading font-semibold text-midnight">{pkg.nights}</span>
                    </div>
                    <div className="h-px bg-slate-100" />
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Hotel</span>
                      <span className="font-heading font-semibold text-midnight text-right text-[13px] max-w-[180px]">{pkg.hotel_short || pkg.hotel}</span>
                    </div>
                    {pkg.dates && (
                      <>
                        <div className="h-px bg-slate-100" />
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Dates</span>
                          <span className="font-heading font-semibold text-midnight text-[13px]">{pkg.dates}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <Link
                    href={`/booking?package=${pkg.id}`}
                    className="w-full bg-accent text-white py-3.5 rounded-lg font-heading text-sm font-semibold hover:bg-accent-dark transition-all hover:-translate-y-px hover:shadow-lg mb-3 block text-center no-underline"
                  >
                    Book This Package
                  </Link>
                  <button className="w-full bg-transparent text-midnight py-3.5 rounded-lg font-heading text-sm font-semibold border-[1.5px] border-slate-200 hover:border-accent hover:text-accent transition-all cursor-pointer flex items-center justify-center gap-2">
                    <PhoneIcon color="#4DA3E8" /> Call for Custom Quote
                  </button>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="mt-4 p-5 bg-surface-alt rounded-2xl border border-slate-200">
                  <div className="font-heading text-sm font-bold text-midnight mb-2">Need Help Choosing?</div>
                  <p className="text-[13px] text-slate-500 leading-relaxed mb-3">Our travel advisors can customize any package to fit your needs.</p>
                  <Link href="/contact" className="text-accent font-heading text-[13px] font-semibold no-underline flex items-center gap-1 hover:gap-2 transition-all">
                    Contact Us <ArrowIcon size={14} color="#4DA3E8" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </InnerLayout>
  );
}
