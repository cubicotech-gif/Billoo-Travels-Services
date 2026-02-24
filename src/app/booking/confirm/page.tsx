"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import InnerLayout from "@/components/InnerLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CheckIcon } from "@/components/ui/Icons";
import Link from "next/link";

function ConfirmContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id") || "BT-2501-XXXX";

  return (
    <InnerLayout>
      <section className="min-h-[80vh] flex items-center justify-center px-6 py-24 bg-surface">
        <ScrollReveal>
          <div className="max-w-[560px] mx-auto text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckIcon size={28} color="#10B981" />
              </div>
            </div>

            <h1 className="font-heading text-3xl font-bold text-midnight mb-2">Booking Confirmed!</h1>
            <p className="text-base text-slate-500 mb-6">Your sacred journey has been booked successfully.</p>

            {/* Booking Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7 text-left mb-6">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
                <div>
                  <div className="font-mono text-[10px] text-slate-400 tracking-[1.5px]">BOOKING ID</div>
                  <div className="font-mono text-lg font-bold text-accent">{bookingId}</div>
                </div>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-md bg-emerald-50 text-emerald-600">Confirmed</span>
              </div>

              <div className="space-y-3 text-sm">
                {[
                  { label: "Status", value: "Payment received — booking confirmed" },
                  { label: "Email", value: "Confirmation sent to your email" },
                  { label: "Invoice", value: "Invoice will be emailed within 24 hours" },
                  { label: "Next Steps", value: "Our team will contact you for document collection" },
                ].map((d, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckIcon size={14} color="#10B981" className="mt-0.5 shrink-0" />
                    <div>
                      <span className="text-slate-400">{d.label}: </span>
                      <span className="text-midnight">{d.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What's next */}
            <div className="bg-accent-pale/50 rounded-xl p-5 border border-accent/10 text-left mb-6">
              <h3 className="font-heading text-sm font-bold text-midnight mb-2">What Happens Next?</h3>
              <div className="space-y-2 text-sm text-slate-500">
                <p>1. You&apos;ll receive a confirmation email with your booking details.</p>
                <p>2. Our visa team will reach out within 48 hours for document collection.</p>
                <p>3. Your travel itinerary will be finalized 2 weeks before departure.</p>
                <p>4. A dedicated concierge will be assigned 1 week before your journey.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="bg-accent text-white px-7 py-3 rounded-lg font-heading text-sm font-semibold no-underline hover:bg-accent-dark transition-all">
                Back to Home
              </Link>
              <Link href="/packages" className="bg-transparent text-midnight px-7 py-3 rounded-lg font-heading text-sm font-semibold no-underline border border-slate-200 hover:border-accent hover:text-accent transition-all">
                Explore More Packages
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </InnerLayout>
  );
}

export default function BookingConfirmPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-slate-400">Loading...</div></div>}>
      <ConfirmContent />
    </Suspense>
  );
}
