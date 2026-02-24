"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

const invoices = [
  { id: "INV-2025-4821", booking: "BT-2501-4821", client: "Ahmad Khan", package: "Royal Umrah Retreat", date: "Jan 28, 2025", due: "Feb 15, 2025", amount: "PKR 2,500,000", paid: "PKR 2,500,000", balance: "PKR 0", status: "paid" },
  { id: "INV-2025-5932", booking: "BT-2501-5932", client: "Fatima Noor", package: "Executive Hajj", date: "Jan 27, 2025", due: "Feb 28, 2025", amount: "PKR 14,000,000", paid: "PKR 4,200,000", balance: "PKR 9,800,000", status: "partial" },
  { id: "INV-2025-6043", booking: "BT-2501-6043", client: "Khalid Raza", package: "Premium Umrah", date: "Jan 26, 2025", due: "Feb 10, 2025", amount: "PKR 850,000", paid: "PKR 850,000", balance: "PKR 0", status: "paid" },
  { id: "INV-2025-7154", booking: "BT-2501-7154", client: "Sara Ahmed", package: "Royal Umrah Retreat", date: "Jan 25, 2025", due: "Feb 25, 2025", amount: "PKR 3,750,000", paid: "PKR 1,500,000", balance: "PKR 2,250,000", status: "partial" },
  { id: "INV-2025-8265", booking: "BT-2501-8265", client: "Usman Ali", package: "Executive Hajj", date: "Jan 24, 2025", due: "Feb 24, 2025", amount: "PKR 7,000,000", paid: "PKR 0", balance: "PKR 7,000,000", status: "unpaid" },
  { id: "INV-2025-9376", booking: "BT-2501-9376", client: "Zainab Malik", package: "Premium Umrah", date: "Jan 20, 2025", due: "Feb 5, 2025", amount: "PKR 1,700,000", paid: "PKR 1,700,000", balance: "PKR 0", status: "refunded" },
];

const statusStyle: Record<string, { label: string; color: string }> = {
  paid: { label: "Paid", color: "bg-emerald-50 text-emerald-600" },
  partial: { label: "Partial", color: "bg-amber-50 text-amber-600" },
  unpaid: { label: "Unpaid", color: "bg-red-50 text-red-500" },
  overdue: { label: "Overdue", color: "bg-red-100 text-red-600" },
  refunded: { label: "Refunded", color: "bg-purple-50 text-purple-600" },
};

export default function AdminInvoices() {
  const [showCreate, setShowCreate] = useState(false);
  const [filter, setFilter] = useState("All");
  const [preview, setPreview] = useState<string | null>(null);

  const filtered = invoices.filter((inv) => filter === "All" || inv.status === filter);
  const previewInv = invoices.find((inv) => inv.id === preview);

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Invoices</h1>
          <p className="text-sm text-slate-400 mt-1">{invoices.length} invoices · {invoices.filter(i => i.status === "unpaid" || i.status === "partial").length} pending</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)} className="bg-[#4DA3E8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>
          ＋ Create Invoice
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Invoiced", value: "PKR 29.8M" },
          { label: "Total Collected", value: "PKR 10.75M" },
          { label: "Outstanding", value: "PKR 12.05M" },
          { label: "Overdue", value: "PKR 0" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-[11px] tracking-[1px] text-slate-400 uppercase mb-2 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
            <div className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Create Form */}
      {showCreate && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Create Invoice</h3>
            <button onClick={() => setShowCreate(false)} className="text-slate-400 bg-transparent border-none cursor-pointer hover:text-slate-600 text-lg">✕</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Booking ID</label>
              <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white cursor-pointer focus:outline-none focus:border-[#4DA3E8]">
                <option value="">Select booking...</option>
                <option>BT-2501-4821 — Ahmad Khan</option>
                <option>BT-2501-5932 — Fatima Noor</option>
                <option>BT-2501-8265 — Usman Ali</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Due Date</label>
              <input type="date" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#4DA3E8]" />
            </div>
            <div>
              <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-1.5 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Currency</label>
              <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm bg-white cursor-pointer focus:outline-none focus:border-[#4DA3E8]">
                <option>PKR</option><option>USD</option><option>SAR</option>
              </select>
            </div>
          </div>

          {/* Line Items */}
          <div className="mt-5">
            <label className="block text-[11px] tracking-[1px] text-slate-400 uppercase mb-2 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Line Items</label>
            <div className="space-y-2">
              {[
                { desc: "Package: Royal Umrah Retreat (14 Nights)", qty: 2, price: 1250000 },
                { desc: "Visa Processing Fee", qty: 2, price: 15000 },
              ].map((item, i) => (
                <div key={i} className="grid grid-cols-[1fr_80px_120px_120px_40px] gap-2 items-center">
                  <input defaultValue={item.desc} className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#4DA3E8]" />
                  <input type="number" defaultValue={item.qty} className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-center focus:outline-none focus:border-[#4DA3E8]" />
                  <input type="number" defaultValue={item.price} className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-right focus:outline-none focus:border-[#4DA3E8]" />
                  <div className="text-sm font-semibold text-right text-[#1E293B]">PKR {(item.qty * item.price).toLocaleString()}</div>
                  <button className="text-red-400 text-xs bg-transparent border-none cursor-pointer hover:text-red-600">✕</button>
                </div>
              ))}
            </div>
            <button className="mt-2 text-[#4DA3E8] text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">＋ Add Line Item</button>
          </div>

          <div className="flex gap-3 mt-5">
            <button className="bg-[#4DA3E8] text-white px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Create & Send</button>
            <button className="bg-transparent text-slate-500 px-6 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-slate-200 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Save Draft</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {["All", "paid", "partial", "unpaid", "refunded"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all border capitalize ${filter === f ? "bg-[#0B1628] text-white border-[#0B1628]" : "bg-white text-slate-500 border-slate-200 hover:border-[#4DA3E8]"}`} style={{ fontFamily: "'Sora', sans-serif" }}>{f === "All" ? "All" : statusStyle[f]?.label || f}</button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                {["Invoice", "Client", "Package", "Date", "Due", "Amount", "Paid", "Balance", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-[10px] tracking-[1.5px] text-slate-400 uppercase font-semibold whitespace-nowrap" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => {
                const st = statusStyle[inv.status];
                return (
                  <tr key={inv.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3 text-xs font-bold text-[#4DA3E8]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{inv.id}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#1E293B] whitespace-nowrap">{inv.client}</td>
                    <td className="px-4 py-3 text-sm text-slate-500 max-w-[130px] truncate">{inv.package}</td>
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{inv.date}</td>
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{inv.due}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-[#1E293B] whitespace-nowrap">{inv.amount}</td>
                    <td className="px-4 py-3 text-sm text-emerald-600 whitespace-nowrap">{inv.paid}</td>
                    <td className="px-4 py-3 text-sm font-semibold whitespace-nowrap" style={{ color: inv.balance === "PKR 0" ? "#94A3B8" : "#EF4444" }}>{inv.balance}</td>
                    <td className="px-4 py-3"><span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${st?.color}`}>{st?.label}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setPreview(inv.id)} className="text-[#4DA3E8] text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">View</button>
                        <button className="text-slate-400 text-xs font-semibold bg-transparent border-none cursor-pointer hover:underline">Resend</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Preview Modal */}
      {previewInv && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6" onClick={() => setPreview(null)}>
          <div className="bg-white rounded-2xl max-w-[600px] w-full max-h-[90vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-[10px] tracking-[2px] text-slate-400 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>INVOICE</div>
                <div className="text-xl font-bold text-[#4DA3E8]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{previewInv.id}</div>
              </div>
              <button onClick={() => setPreview(null)} className="text-slate-400 bg-transparent border-none cursor-pointer text-xl hover:text-slate-600">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-slate-100">
              <div>
                <div className="text-[10px] text-slate-400 tracking-[1px] mb-1 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>FROM</div>
                <div className="text-sm font-semibold text-[#1E293B]">Billoo Travels Services Pvt Ltd</div>
                <div className="text-xs text-slate-400 mt-1">M2 Mezzanine, Plot 41c<br />DHA Phase 5, Karachi<br />021-32313461-63</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 tracking-[1px] mb-1 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>TO</div>
                <div className="text-sm font-semibold text-[#1E293B]">{previewInv.client}</div>
                <div className="text-xs text-slate-400 mt-1">Booking: {previewInv.booking}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
              <div><span className="text-slate-400 text-xs">Date</span><div className="font-semibold text-[#1E293B]">{previewInv.date}</div></div>
              <div><span className="text-slate-400 text-xs">Due</span><div className="font-semibold text-[#1E293B]">{previewInv.due}</div></div>
              <div><span className="text-slate-400 text-xs">Status</span><div><span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${statusStyle[previewInv.status]?.color}`}>{statusStyle[previewInv.status]?.label}</span></div></div>
            </div>

            <table className="w-full text-left mb-6">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 text-[10px] text-slate-400 tracking-[1px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Description</th>
                  <th className="py-2 text-[10px] text-slate-400 tracking-[1px] text-right" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3 text-sm text-[#1E293B]">{previewInv.package}</td>
                  <td className="py-3 text-sm font-semibold text-[#1E293B] text-right">{previewInv.amount}</td>
                </tr>
              </tbody>
            </table>

            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between"><span className="text-slate-400">Subtotal</span><span className="font-semibold text-[#1E293B]">{previewInv.amount}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Amount Paid</span><span className="text-emerald-600 font-semibold">{previewInv.paid}</span></div>
              <div className="h-px bg-slate-200" />
              <div className="flex justify-between"><span className="font-bold text-[#1E293B]">Balance Due</span><span className="font-bold text-xl" style={{ color: previewInv.balance === "PKR 0" ? "#10B981" : "#EF4444" }}>{previewInv.balance}</span></div>
            </div>

            <div className="flex gap-3">
              <button className="bg-[#4DA3E8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Download PDF</button>
              <button className="bg-transparent text-[#1E293B] px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border border-slate-200 hover:bg-slate-50 transition-all" style={{ fontFamily: "'Sora', sans-serif" }}>Send to Client</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
