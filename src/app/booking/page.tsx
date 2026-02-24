"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import InnerLayout from "@/components/InnerLayout";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useCurrency } from "@/lib/currency";
import { PACKAGES, formatPrice, type Currency } from "@/lib/data";
import { generateBookingId, calculateBookingPrice } from "@/lib/payments";
import { CheckIcon, ShieldIcon } from "@/components/ui/Icons";

function BookingContent() {
  const searchParams = useSearchParams();
  const pkgId = searchParams.get("package");
  const { currency } = useCurrency();
  const pkg = PACKAGES.find((p) => String(p.id) === pkgId) || PACKAGES[0];

  const [step, setStep] = useState(1);
  const [travelers, setTravelers] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const pricing = calculateBookingPrice(pkg.price, currency, travelers);
  const bookingId = generateBookingId();

  return (
    <InnerLayout>
      {/* Header */}
      <section className="bg-midnight pt-28 pb-12 px-6 md:px-9">
        <div className="max-w-[1100px] mx-auto">
          <div className="font-mono text-[11px] tracking-[1.5px] uppercase text-accent-soft mb-3">Secure Booking</div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white">Complete Your <span className="font-display italic text-accent font-normal">Booking</span></h1>
          {/* Steps */}
          <div className="flex items-center gap-3 mt-8">
            {["Travelers", "Payment", "Confirm"].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > i + 1 ? "bg-emerald-500 text-white" : step === i + 1 ? "bg-accent text-white" : "bg-white/10 text-white/30"}`} style={{ fontFamily: "'Sora', sans-serif" }}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span className={`text-sm font-medium ${step === i + 1 ? "text-white" : "text-white/30"}`} style={{ fontFamily: "'Sora', sans-serif" }}>{s}</span>
                {i < 2 && <div className="w-8 h-px bg-white/10 mx-1" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 md:px-9 bg-surface">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Main Form */}
          <div>
            {/* Step 1: Travelers */}
            {step === 1 && (
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-slate-200 p-7">
                  <h2 className="font-heading text-xl font-bold text-midnight mb-5">Traveler Information</h2>
                  <div className="mb-6">
                    <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold font-mono">Number of Travelers</label>
                    <select value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} className="w-full max-w-[200px] px-4 py-3 rounded-lg border border-slate-200 text-sm bg-white cursor-pointer focus:outline-none focus:border-accent">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => <option key={n} value={n}>{n} {n === 1 ? "Person" : "People"}</option>)}
                    </select>
                  </div>

                  {Array.from({ length: travelers }).map((_, i) => (
                    <div key={i} className="mb-6 pb-6 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
                      <h3 className="font-heading text-base font-semibold text-midnight mb-3">Traveler {i + 1} {i === 0 && "(Lead)"}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input placeholder="Full Name (as on passport)" className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-lg text-sm focus:outline-none focus:border-accent placeholder:text-slate-300" />
                        <input placeholder="Passport Number" className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-lg text-sm focus:outline-none focus:border-accent placeholder:text-slate-300" />
                        <input type="date" placeholder="Date of Birth" className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-lg text-sm focus:outline-none focus:border-accent text-slate-400" />
                        <select className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-lg text-sm focus:outline-none focus:border-accent text-slate-400" defaultValue="">
                          <option value="" disabled>Gender</option>
                          <option>Male</option><option>Female</option>
                        </select>
                      </div>
                    </div>
                  ))}

                  <h3 className="font-heading text-base font-semibold text-midnight mb-3 mt-6">Contact Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input placeholder="Contact Name" className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-lg text-sm focus:outline-none focus:border-accent placeholder:text-slate-300" />
                    <input placeholder="Email Address" type="email" className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-lg text-sm focus:outline-none focus:border-accent placeholder:text-slate-300" />
                    <input placeholder="Phone Number" className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-lg text-sm focus:outline-none focus:border-accent placeholder:text-slate-300" />
                    <input type="date" placeholder="Preferred Departure" className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-lg text-sm focus:outline-none focus:border-accent text-slate-400" />
                  </div>
                  <textarea placeholder="Special requests (dietary, accessibility, room preferences...)" rows={3} className="w-full mt-3 px-4 py-3 border-[1.5px] border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:border-accent placeholder:text-slate-300" />

                  <button onClick={() => setStep(2)} className="mt-6 bg-accent text-white px-8 py-3.5 rounded-lg font-heading text-sm font-semibold hover:bg-accent-dark transition-all border-none cursor-pointer">
                    Continue to Payment →
                  </button>
                </div>
              </ScrollReveal>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-slate-200 p-7">
                  <h2 className="font-heading text-xl font-bold text-midnight mb-5">Payment Method</h2>

                  <div className="space-y-3 mb-6">
                    {[
                      { id: "bank", label: "BankAlfalah Online", desc: "Secure payment via credit/debit card", icon: "💳" },
                      { id: "transfer", label: "Bank Transfer", desc: "Direct deposit to our bank account", icon: "🏦" },
                      { id: "office", label: "Pay at Office", desc: "Cash or cheque at our DHA office", icon: "🏢" },
                      { id: "installment", label: "Installment Plan", desc: "Split into 3 monthly payments", icon: "📅" },
                    ].map((m) => (
                      <label key={m.id} onClick={() => setPaymentMethod(m.id)} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === m.id ? "border-accent bg-accent-pale/30" : "border-slate-200 hover:border-accent/30"}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === m.id ? "border-accent" : "border-slate-300"}`}>
                          {paymentMethod === m.id && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                        </div>
                        <span className="text-2xl">{m.icon}</span>
                        <div>
                          <div className="font-heading text-sm font-semibold text-midnight">{m.label}</div>
                          <div className="text-xs text-slate-400">{m.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Bank Transfer Details */}
                  {paymentMethod === "transfer" && (
                    <div className="bg-surface-alt rounded-xl p-5 mb-6 border border-slate-200">
                      <h4 className="font-heading text-sm font-bold text-midnight mb-3">Bank Transfer Details</h4>
                      <div className="space-y-2 text-sm">
                        {[
                          { label: "Bank", value: "Bank Alfalah Ltd" },
                          { label: "Account Title", value: "Billoo Travels Services Pvt Ltd" },
                          { label: "Account No", value: "0123-4567890123" },
                          { label: "IBAN", value: "PK36ALFH0123456789012345" },
                          { label: "Branch", value: "DHA Phase 5, Karachi" },
                        ].map((d, i) => (
                          <div key={i} className="flex justify-between">
                            <span className="text-slate-400">{d.label}</span>
                            <span className="font-semibold text-midnight font-mono text-xs">{d.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* BankAlfalah Card Form */}
                  {paymentMethod === "bank" && (
                    <div className="bg-surface-alt rounded-xl p-5 mb-6 border border-slate-200">
                      <h4 className="font-heading text-sm font-bold text-midnight mb-3">Card Details</h4>
                      <div className="space-y-3">
                        <input placeholder="Card Number" className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-lg text-sm focus:outline-none focus:border-accent placeholder:text-slate-300" />
                        <div className="grid grid-cols-2 gap-3">
                          <input placeholder="MM/YY" className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-lg text-sm focus:outline-none focus:border-accent placeholder:text-slate-300" />
                          <input placeholder="CVV" className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-lg text-sm focus:outline-none focus:border-accent placeholder:text-slate-300" />
                        </div>
                        <input placeholder="Cardholder Name" className="w-full px-4 py-3 border-[1.5px] border-slate-200 rounded-lg text-sm focus:outline-none focus:border-accent placeholder:text-slate-300" />
                      </div>
                      <div className="flex items-center gap-2 mt-3 text-xs text-slate-400">
                        <ShieldIcon size={14} color="#10B981" />
                        <span>256-bit SSL encrypted · Powered by BankAlfalah</span>
                      </div>
                    </div>
                  )}

                  {/* Installment */}
                  {paymentMethod === "installment" && (
                    <div className="bg-surface-alt rounded-xl p-5 mb-6 border border-slate-200">
                      <h4 className="font-heading text-sm font-bold text-midnight mb-3">Installment Plan</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-slate-400">1st Payment (Now)</span><span className="font-semibold text-accent">{formatPrice({ PKR: Math.round(pricing.total * 0.4), USD: Math.round(pricing.total * 0.4), SAR: Math.round(pricing.total * 0.4) } as Record<Currency, number>, currency)}</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">2nd Payment (30 days)</span><span className="font-semibold text-midnight">{formatPrice({ PKR: Math.round(pricing.total * 0.3), USD: Math.round(pricing.total * 0.3), SAR: Math.round(pricing.total * 0.3) } as Record<Currency, number>, currency)}</span></div>
                        <div className="flex justify-between"><span className="text-slate-400">3rd Payment (60 days)</span><span className="font-semibold text-midnight">{formatPrice({ PKR: Math.round(pricing.total * 0.3), USD: Math.round(pricing.total * 0.3), SAR: Math.round(pricing.total * 0.3) } as Record<Currency, number>, currency)}</span></div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="bg-transparent text-slate-500 px-6 py-3 rounded-lg font-heading text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer">
                      ← Back
                    </button>
                    <button onClick={() => setStep(3)} className="bg-accent text-white px-8 py-3.5 rounded-lg font-heading text-sm font-semibold hover:bg-accent-dark transition-all border-none cursor-pointer">
                      Review Booking →
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-slate-200 p-7">
                  <h2 className="font-heading text-xl font-bold text-midnight mb-5">Review & Confirm</h2>

                  <div className="bg-surface-alt rounded-xl p-5 mb-5 border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] text-accent tracking-[1.5px] font-semibold">BOOKING ID</span>
                      <span className="font-mono text-sm font-bold text-midnight">{bookingId}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-slate-400">Package</span><span className="font-semibold text-midnight">{pkg.title}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Duration</span><span className="text-midnight">{pkg.nights}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Hotel</span><span className="text-midnight">{pkg.hotelShort}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Travelers</span><span className="text-midnight">{travelers}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Payment</span><span className="text-midnight capitalize">{paymentMethod === "bank" ? "BankAlfalah Online" : paymentMethod === "transfer" ? "Bank Transfer" : paymentMethod === "office" ? "Pay at Office" : "Installment Plan"}</span></div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 mb-5">
                    <input type="checkbox" id="terms" className="mt-1 cursor-pointer" />
                    <label htmlFor="terms" className="text-sm text-slate-500 cursor-pointer">
                      I agree to the <a href="/terms" className="text-accent no-underline hover:underline">Terms of Service</a> and <a href="/refunds" className="text-accent no-underline hover:underline">Refund Policy</a>.
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="bg-transparent text-slate-500 px-6 py-3 rounded-lg font-heading text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer">
                      ← Back
                    </button>
                    <a href={`/booking/confirm?id=${bookingId}`} className="bg-accent text-white px-8 py-3.5 rounded-lg font-heading text-sm font-semibold hover:bg-accent-dark transition-all no-underline inline-flex items-center gap-2">
                      <ShieldIcon size={16} color="#fff" /> Confirm & Pay {formatPrice(pkg.price, currency)}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar — Order Summary */}
          <div className="sticky top-28">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_6px_24px_rgba(0,0,0,0.04)]">
              <div className="relative h-[140px] rounded-xl overflow-hidden mb-5">
                <img src={pkg.placeholder} alt={pkg.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/50 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="font-mono text-[10px] font-semibold tracking-[1px] px-2 py-0.5 rounded-md bg-accent text-white">{pkg.badge}</span>
                </div>
              </div>

              <h3 className="font-heading text-lg font-bold text-midnight mb-0.5">{pkg.title}</h3>
              <div className="text-xs text-slate-400 mb-4">{pkg.nights} · {pkg.hotelShort}</div>

              <div className="space-y-2.5 text-sm border-t border-slate-100 pt-4">
                <div className="flex justify-between"><span className="text-slate-400">Per person</span><span className="text-midnight">{formatPrice(pkg.price, currency)}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Travelers</span><span className="text-midnight">× {travelers}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Subtotal</span><span className="font-semibold text-midnight">{currency} {pricing.subtotal.toLocaleString()}</span></div>
                {pricing.tax > 0 && <div className="flex justify-between"><span className="text-slate-400">Tax</span><span className="text-midnight">{currency} {pricing.tax.toLocaleString()}</span></div>}
                <div className="h-px bg-slate-100" />
                <div className="flex justify-between">
                  <span className="font-heading font-bold text-midnight">Total</span>
                  <span className="font-heading text-xl font-bold text-accent">{currency} {pricing.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                {["Visa processing included", "24/7 concierge support", "Free cancellation (30+ days)"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-slate-500">
                    <CheckIcon size={12} color="#10B981" />{t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </InnerLayout>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-slate-400">Loading...</div></div>}>
      <BookingContent />
    </Suspense>
  );
}
