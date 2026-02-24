"use client";

import { useParams } from "next/navigation";
import InnerLayout from "@/components/InnerLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useCurrency } from "@/lib/currency";
import { PACKAGES_DETAILED } from "@/lib/data-extended";
import { formatPrice } from "@/lib/data";
import { CheckIcon, XIcon, CalendarIcon, ArrowIcon, PhoneIcon } from "@/components/ui/Icons";
import Link from "next/link";

export default function PackageDetailPage() {
  const params = useParams();
  const { currency } = useCurrency();
  const pkg = PACKAGES_DETAILED.find((p) => String(p.id) === params.id);

  if (!pkg) {
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

  return (
    <InnerLayout>
      {/* Hero Image */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img src={pkg.placeholder} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,22,40,0.8) 0%, rgba(11,22,40,0.3) 50%, rgba(11,22,40,0.5) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex gap-2 mb-3">
              <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-accent text-white">{pkg.badge}</span>
              <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2.5 py-1 rounded-md bg-white/90 text-midnight">{pkg.type}</span>
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-2">{pkg.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <span>{pkg.nights}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>{pkg.hotel}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="flex items-center gap-1"><CalendarIcon color="rgba(255,255,255,0.5)" />{pkg.dates}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 md:px-9 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          {/* Main Content */}
          <div>
            {/* Overview */}
            <ScrollReveal>
              <div className="mb-12">
                <h2 className="font-heading text-2xl font-bold text-midnight mb-4">Overview</h2>
                <p className="text-base text-slate-500 leading-relaxed">{pkg.overview}</p>
              </div>
            </ScrollReveal>

            {/* Itinerary */}
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

            {/* Included / Not Included */}
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-accent-pale/50 rounded-2xl border border-accent/10">
                  <h3 className="font-heading text-lg font-bold text-midnight mb-4">What&apos;s Included</h3>
                  <div className="space-y-3">
                    {pkg.included.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckIcon size={16} color="#4DA3E8" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-surface-alt rounded-2xl border border-slate-200">
                  <h3 className="font-heading text-lg font-bold text-midnight mb-4">Not Included</h3>
                  <div className="space-y-3">
                    {pkg.notIncluded.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-slate-500">
                        <XIcon size={16} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Gallery */}
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
          </div>

          {/* Sidebar — Booking Card */}
          <div>
            <div className="sticky top-28">
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                  <div className="font-mono text-[10px] text-slate-400 tracking-[1.5px] uppercase mb-1">Starting from</div>
                  <div className="font-heading text-3xl font-bold text-accent mb-1">{formatPrice(pkg.price, currency)}</div>
                  <div className="text-sm text-slate-400 mb-6">per person</div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Duration</span>
                      <span className="font-heading font-semibold text-midnight">{pkg.nights}</span>
                    </div>
                    <div className="h-px bg-slate-100" />
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Hotel</span>
                      <span className="font-heading font-semibold text-midnight text-right text-[13px]">{pkg.hotelShort}</span>
                    </div>
                    <div className="h-px bg-slate-100" />
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Dates</span>
                      <span className="font-heading font-semibold text-midnight text-[13px]">{pkg.dates}</span>
                    </div>
                  </div>

                  <a href={`/booking?package=${pkg.id}`} className="w-full bg-accent text-white py-3.5 rounded-lg font-heading text-sm font-semibold hover:bg-accent-dark transition-all hover:-translate-y-px hover:shadow-lg border-none cursor-pointer mb-3 block text-center no-underline">
                    Book This Package
                  </a>
                  <button className="w-full bg-transparent text-midnight py-3.5 rounded-lg font-heading text-sm font-semibold border-[1.5px] border-slate-200 hover:border-accent hover:text-accent transition-all cursor-pointer flex items-center justify-center gap-2">
                    <PhoneIcon color="#4DA3E8" /> Call for Custom Quote
                  </button>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="mt-4 p-5 bg-surface-alt rounded-2xl border border-slate-200">
                  <div className="font-heading text-sm font-bold text-midnight mb-2">Need Help Choosing?</div>
                  <p className="text-[13px] text-slate-500 leading-relaxed mb-3">Our travel advisors can customize any package to fit your needs.</p>
                  <a href="/contact" className="text-accent font-heading text-[13px] font-semibold no-underline flex items-center gap-1 hover:gap-2 transition-all">
                    Contact Us <ArrowIcon size={14} color="#4DA3E8" />
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </InnerLayout>
  );
}
