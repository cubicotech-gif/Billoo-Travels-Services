"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";
import { formatBookingStatus, formatPaymentStatus, type BookingStatus, type PaymentStatus } from "@/lib/payments";

interface Booking {
  id: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  package_title: string;
  tier: string;
  travelers: { id: number; name: string; passport: string }[];
  departure_date: string;
  total_price: number;
  currency: string;
  booking_status: BookingStatus;
  payment_status: PaymentStatus;
  created_at: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterBooking, setFilterBooking] = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterBooking !== "All") params.set("status", filterBooking);
    if (filterPayment !== "All") params.set("payment", filterPayment);
    if (search) params.set("search", search);

    const res = await fetch(`/api/bookings?${params.toString()}`);
    const data = await res.json();
    setBookings(data.bookings || []);
    setLoading(false);
  }, [filterBooking, filterPayment, search]);

  useEffect(() => {
    const t = setTimeout(fetchBookings, 300);
    return () => clearTimeout(t);
  }, [fetchBookings]);

  const detail = bookings.find((b) => b.id === selected);

  async function updateStatus(field: "booking_status" | "payment_status", value: string) {
    if (!selected) return;
    setUpdating(true);
    await fetch(`/api/bookings/${selected}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    await fetchBookings();
    setUpdating(false);
  }

  const totalRevenue = bookings.reduce((s, b) => s + (b.payment_status !== "refunded" ? b.total_price : 0), 0);
  const pendingPayments = bookings.filter((b) => b.payment_status === "unpaid" || b.payment_status === "deposit_paid");
  const pendingAmount = pendingPayments.reduce((s, b) => s + b.total_price, 0);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Bookings</h1>
          <p className="text-sm text-slate-400 mt-1">{bookings.length} total · {bookings.filter((b) => b.booking_status === "confirmed").length} confirmed</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Revenue", value: `PKR ${(totalRevenue / 1_000_000).toFixed(1)}M`, sub: "All bookings" },
          { label: "Pending Payments", value: `PKR ${(pendingAmount / 1_000_000).toFixed(1)}M`, sub: `${pendingPayments.length} bookings` },
          { label: "Avg. Booking", value: bookings.length > 0 ? `PKR ${Math.round(totalRevenue / bookings.length).toLocaleString()}` : "—", sub: "Per booking" },
          { label: "Total Travelers", value: String(bookings.reduce((s, b) => s + (b.travelers?.length || 1), 0)), sub: "Across all bookings" },
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
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, ID, or email..."
          className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-white flex-1 max-w-xs focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300"
        />
        <div className="flex gap-2 flex-wrap">
          <select value={filterBooking} onChange={(e) => setFilterBooking(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white cursor-pointer focus:outline-none">
            <option value="All">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
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
          {loading ? (
            <div className="p-6 space-y-3">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-10 bg-slate-50 rounded animate-pulse" />)}</div>
          ) : (
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
                  {bookings.map((b) => {
                    const bs = formatBookingStatus(b.booking_status);
                    const ps = formatPaymentStatus(b.payment_status);
                    return (
                      <tr key={b.id} onClick={() => setSelected(b.id === selected ? null : b.id)} className={`border-b border-slate-50 cursor-pointer transition-colors ${selected === b.id ? "bg-[#EBF5FF]" : "hover:bg-slate-50/50"}`}>
                        <td className="px-4 py-3 text-xs font-bold text-[#4DA3E8]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{b.id}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#1E293B] whitespace-nowrap">{b.contact_name}</td>
                        <td className="px-4 py-3 text-sm text-slate-500 max-w-[140px] truncate">{b.package_title}</td>
                        <td className="px-4 py-3 text-sm text-slate-500 text-center">{b.travelers?.length || 1}</td>
                        <td className="px-4 py-3 text-sm text-slate-400 whitespace-nowrap">{b.departure_date || "—"}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#1E293B] whitespace-nowrap">{b.currency} {b.total_price.toLocaleString()}</td>
                        <td className="px-4 py-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md whitespace-nowrap ${bs.color}`}>{bs.label}</span></td>
                        <td className="px-4 py-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md whitespace-nowrap ${ps.color}`}>{ps.label}</span></td>
                      </tr>
                    );
                  })}
                  {bookings.length === 0 && <tr><td colSpan={8} className="px-4 py-10 text-center text-slate-400 text-sm">No bookings found.</td></tr>}
                </tbody>
              </table>
            </div>
          )}
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
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-md ${formatBookingStatus(detail.booking_status).color}`}>
                  {formatBookingStatus(detail.booking_status).label}
                </span>
              </div>

              <div className="space-y-2.5 mb-5 text-sm">
                {[
                  { label: "Client", value: detail.contact_name },
                  { label: "Email", value: detail.contact_email },
                  { label: "Phone", value: detail.contact_phone },
                  { label: "Package", value: detail.package_title },
                  { label: "Travelers", value: String(detail.travelers?.length || 1) },
                  { label: "Departure", value: detail.departure_date || "—" },
                  { label: "Amount", value: `${detail.currency} ${detail.total_price.toLocaleString()}` },
                  { label: "Payment", value: formatPaymentStatus(detail.payment_status).label },
                  { label: "Booked On", value: new Date(detail.created_at).toLocaleDateString() },
                ].map((f, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-slate-400 text-xs">{f.label}</span>
                    <span className="font-semibold text-[#1E293B] text-xs text-right">{f.value}</span>
                  </div>
                ))}
              </div>

              {/* Status Update */}
              <div className="space-y-2 mb-3">
                <label className="text-[10px] tracking-[1px] text-slate-400 uppercase font-semibold block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Update Status</label>
                <select
                  value={detail.booking_status}
                  onChange={(e) => updateStatus("booking_status", e.target.value)}
                  disabled={updating}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white cursor-pointer focus:outline-none focus:border-[#4DA3E8] disabled:opacity-50"
                >
                  {["pending","confirmed","processing","completed","cancelled"].map((s) => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
                <select
                  value={detail.payment_status}
                  onChange={(e) => updateStatus("payment_status", e.target.value)}
                  disabled={updating}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white cursor-pointer focus:outline-none focus:border-[#4DA3E8] disabled:opacity-50"
                >
                  {["unpaid","deposit_paid","partially_paid","paid","refunded"].map((s) => <option key={s} value={s}>{formatPaymentStatus(s as PaymentStatus).label}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <a
                  href={`https://wa.me/${detail.contact_phone.replace(/\D/g, "")}?text=Assalamu%20Alaikum%20${encodeURIComponent(detail.contact_name)},%20this%20is%20Billoo%20Travels%20regarding%20your%20booking%20${detail.id}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#1DA851] transition-all text-center block no-underline"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  WhatsApp Client
                </a>
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
