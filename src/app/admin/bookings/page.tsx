"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { formatBookingStatus, formatPaymentStatus, type BookingStatus, type PaymentStatus } from "@/lib/payments";

const bookings = [
  { id: "BT-2501-4821", client: "Ahmad Khan", email: "ahmad.khan@email.com", phone: "+92 300 1234567", package: "Royal Umrah Retreat", tier: "Business", travelers: 2, departure: "Mar 15, 2025", amount: "PKR 2,500,000", booking: "confirmed" as BookingStatus, payment: "paid" as PaymentStatus, created: "Jan 28, 2025" },
  { id: "BT-2501-5932", client: "Fatima Noor", email: "fatima.noor@email.com", phone: "+92 321 9876543", package: "Executive Hajj", tier: "First Class", travelers: 4, departure: "Jun 5, 2025", amount: "PKR 14,000,000", booking: "confirmed" as BookingStatus, payment: "deposit_paid" as PaymentStatus, created: "Jan 27, 2025" },
  { id: "BT-2501-6043", client: "Khalid Raza", email: "khalid.raza@email.com", phone: "+92 333 4567890", package: "Premium Umrah", tier: "Economy", travelers: 1, departure: "Feb 20, 2025", amount: "PKR 850,000", booking: "confirmed" as BookingStatus, payment: "paid" as PaymentStatus, created: "Jan 26, 2025" },
  { id: "BT-2501-7154", client: "Sara Ahmed", email: "sara.ahmed@email.com", phone: "+92 312 3456789", package: "Royal Umrah Retreat", tier: "Business", travelers: 3, departure: "Apr 10, 2025", amount: "PKR 3,750,000", booking: "processing" as BookingStatus, payment: "partially_paid" as PaymentStatus, created: "Jan 25, 2025" },
  { id: "BT-2501-8265", client: "Usman Ali", email: "usman.ali@email.com", phone: "+92 345 6789012", package: "Executive Hajj", tier: "First Class", travelers: 2, departure: "Jun 5, 2025", amount: "PKR 7,000,000", booking: "pending" as BookingStatus, payment: "unpaid" as PaymentStatus, created: "Jan 24, 2025" },
  { id: "BT-2501-9376", client: "Zainab Malik", email: "zainab.malik@email.com", phone: "+92 301 2345678", package: "Premium Umrah", tier: "Economy", travelers: 2, departure: "Mar 1, 2025", amount: "PKR 1,700,000", booking: "cancelled" as BookingStatus, payment: "refunded" as PaymentStatus, created: "Jan 20, 2025" },
];

export default function AdminBookings() {
  const [search, setSearch] = useState("");
  const [filterBooking, setFilterBooking] = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = bookings.filter((b) => {
    const matchSearch = b.client.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
    const matchBooking = filterBooking === "All" || b.booking === filterBooking;
    const matchPayment = filterPayment === "All" || b.payment === filterPayment;
    return matchSearch && matchBooking && matchPayment;
  });

  const detail = bookings.find((b) => b.id === selected);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Bookings</h1>
          <p className="text-sm text-slate-400 mt-1">{bookings.length} total · {bookings.filter(b => b.booking === "confirmed").length} confirmed</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#0B1628] text-white px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer border-none" style={{ fontFamily: "'Sora', sans-serif" }}>↓ Export</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Revenue", value: "PKR 29.8M", sub: "This month" },
          { label: "Pending Payments", value: "PKR 7.0M", sub: "2 bookings" },
          { label: "Avg. Booking", value: "PKR 4.97M", sub: "Per booking" },
          { label: "Upcoming Departures", value: "4", sub: "Next 30 days" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-[11px] tracking-[1px] text-slate-400 uppercase mb-2 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
            <div className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{s.value}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or ID..." className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-white flex-1 max-w-xs focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300" />
        <div className="flex gap-2 flex-wrap">
          <select value={filterBooking} onChange={(e) => setFilterBooking(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white cursor-pointer focus:outline-none">
            <option value="All">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select value={filterPayment} onChange={(e) => setFilterPayment(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white cursor-pointer focus:outline-none">
            <option value="All">All Payments</option>
            <option value="paid">Paid</option>
            <option value="deposit_paid">Deposit Paid</option>
            <option value="partially_paid">Partial</option>
            <option value="unpaid">Unpaid</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Booking ID", "Client", "Package", "Travelers", "Departure", "Amount", "Status", "Payment"].map((h) => (
                    <th key={h} className="px-4 py-3 text-[10px] tracking-[1.5px] text-slate-400 uppercase font-semibold whitespace-nowrap" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => {
                  const bs = formatBookingStatus(b.booking);
                  const ps = formatPaymentStatus(b.payment);
                  return (
                    <tr key={b.id} onClick={() => setSelected(b.id)} className={`border-b border-slate-50 cursor-pointer transition-colors ${selected === b.id ? "bg-[#EBF5FF]" : "hover:bg-slate-50/50"}`}>
                      <td className="px-4 py-3 text-xs font-bold text-[#4DA3E8]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{b.id}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-[#1E293B] whitespace-nowrap">{b.client}</td>
                      <td className="px-4 py-3 text-sm text-slate-500 max-w-[140px] truncate">{b.package}</td>
                      <td className="px-4 py-3 text-sm text-slate-500 text-center">{b.travelers}</td>
                      <td className="px-4 py-3 text-sm text-slate-400 whitespace-nowrap">{b.departure}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-[#1E293B] whitespace-nowrap">{b.amount}</td>
                      <td className="px-4 py-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md whitespace-nowrap ${bs.color}`}>{bs.label}</span></td>
                      <td className="px-4 py-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md whitespace-nowrap ${ps.color}`}>{ps.label}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Sidebar */}
        <div className="sticky top-20">
          {detail ? (
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div>
                  <div className="text-[10px] tracking-[1.5px] text-slate-400 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>BOOKING</div>
                  <div className="text-base font-bold text-[#4DA3E8]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{detail.id}</div>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-md ${formatBookingStatus(detail.booking).color}`}>{formatBookingStatus(detail.booking).label}</span>
              </div>

              <div className="space-y-2.5 mb-5 text-sm">
                {[
                  { label: "Client", value: detail.client },
                  { label: "Email", value: detail.email },
                  { label: "Phone", value: detail.phone },
                  { label: "Package", value: detail.package },
                  { label: "Tier", value: detail.tier },
                  { label: "Travelers", value: String(detail.travelers) },
                  { label: "Departure", value: detail.departure },
                  { label: "Amount", value: detail.amount },
                  { label: "Payment", value: formatPaymentStatus(detail.payment).label },
                  { label: "Booked On", value: detail.created },
                ].map((f, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-slate-400 text-xs">{f.label}</span>
                    <span className="font-semibold text-[#1E293B] text-xs text-right">{f.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <button className="w-full bg-[#4DA3E8] text-white py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Send Invoice</button>
                <button className="w-full bg-[#25D366] text-white py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#1DA851] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>WhatsApp Client</button>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-transparent text-[#1E293B] py-2 rounded-lg font-semibold text-xs cursor-pointer border border-slate-200 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Edit</button>
                  <button className="bg-transparent text-red-400 py-2 rounded-lg font-semibold text-xs cursor-pointer border border-red-200 hover:bg-red-50 transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Cancel</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
              <div className="text-slate-300 text-4xl mb-3">📋</div>
              <div className="text-sm text-slate-400">Select a booking to view details</div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
