"use client";

import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";

interface ContactMessage {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  destination: string;
  package_interest: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
}

const statusStyle: Record<string, string> = {
  new: "bg-blue-50 text-blue-600",
  read: "bg-slate-100 text-slate-500",
  replied: "bg-emerald-50 text-emerald-600",
};

const statusLabel: Record<string, string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
};

export default function AdminCRM() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/contact");
    const data = await res.json();
    setMessages(data.messages || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const filtered = messages.filter((m) => {
    const matchSearch =
      m.full_name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.message || "").toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || m.status === filter;
    return matchSearch && matchFilter;
  });

  async function markStatus(id: number, status: string) {
    setUpdating(true);
    await fetch("/api/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await fetchMessages();
    if (selected?.id === id) {
      setSelected((prev) => prev ? { ...prev, status: status as ContactMessage["status"] } : null);
    }
    setUpdating(false);
  }

  function exportCSV() {
    const rows = [
      ["ID", "Name", "Email", "Phone", "Destination", "Package Interest", "Message", "Status", "Date"],
      ...messages.map((m) => [
        m.id, m.full_name, m.email, m.phone || "", m.destination || "",
        m.package_interest || "", (m.message || "").replace(/,/g, " "), m.status,
        new Date(m.created_at).toLocaleDateString(),
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contact-messages.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const newCount = messages.filter((m) => m.status === "new").length;

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Contact Messages</h1>
          <p className="text-sm text-slate-400 mt-1">
            {messages.length} total · {newCount} new
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="bg-[#4DA3E8] text-white px-5 py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all flex items-center gap-2"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          ↓ Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Messages", value: String(messages.length), color: "#4DA3E8" },
          { label: "New / Unread", value: String(newCount), color: "#F59E0B" },
          { label: "Read", value: String(messages.filter((m) => m.status === "read").length), color: "#64748B" },
          { label: "Replied", value: String(messages.filter((m) => m.status === "replied").length), color: "#10B981" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-[11px] tracking-[1px] text-slate-400 uppercase mb-2 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
            <div className="text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Message List */}
        <div>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or message..."
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm bg-white flex-1 max-w-xs focus:outline-none focus:border-[#4DA3E8] placeholder:text-slate-300"
            />
            <div className="flex gap-2 flex-wrap">
              {["All", "new", "read", "replied"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${
                    filter === f ? "bg-[#0B1628] text-white border-[#0B1628]" : "bg-white text-slate-500 border-slate-200 hover:border-[#4DA3E8]"
                  }`}
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {f === "All" ? "All" : statusLabel[f]}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {loading ? (
              <div className="p-6 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-14 bg-slate-50 rounded animate-pulse" />)}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      {["Name", "Contact", "Interest", "Date", "Status"].map((h) => (
                        <th key={h} className="px-5 py-3 text-[10px] tracking-[1.5px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((m) => (
                      <tr
                        key={m.id}
                        onClick={() => { setSelected(m); if (m.status === "new") markStatus(m.id, "read"); }}
                        className={`border-b border-slate-50 cursor-pointer transition-colors ${selected?.id === m.id ? "bg-[#EBF5FF]" : "hover:bg-slate-50/50"} ${m.status === "new" ? "font-semibold" : ""}`}
                      >
                        <td className="px-5 py-3.5">
                          <div className="text-sm font-semibold text-[#1E293B]">{m.full_name}</div>
                          {m.status === "new" && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 inline-block mr-1.5" />
                          )}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="text-xs text-slate-500">{m.email}</div>
                          {m.phone && <div className="text-[11px] text-slate-400">{m.phone}</div>}
                        </td>
                        <td className="px-5 py-3.5 text-sm text-slate-500">{m.package_interest || m.destination || "—"}</td>
                        <td className="px-5 py-3.5 text-sm text-slate-400 whitespace-nowrap">{new Date(m.created_at).toLocaleDateString()}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md ${statusStyle[m.status]}`}>
                            {statusLabel[m.status]}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-400 text-sm">No messages found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="sticky top-20">
          {selected ? (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-full bg-[#0B1628] flex items-center justify-center text-[#4DA3E8] font-bold text-lg">
                  {selected.full_name.charAt(0)}
                </div>
                <div>
                  <div className="text-base font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>{selected.full_name}</div>
                  <div className="text-xs text-slate-400">{new Date(selected.created_at).toLocaleString()}</div>
                </div>
                <span className={`ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-md ${statusStyle[selected.status]}`}>
                  {statusLabel[selected.status]}
                </span>
              </div>

              <div className="space-y-3 mb-5">
                {[
                  { label: "Email", value: selected.email },
                  { label: "Phone", value: selected.phone || "—" },
                  { label: "Destination", value: selected.destination || "—" },
                  { label: "Package Interest", value: selected.package_interest || "—" },
                ].map((f, i) => (
                  <div key={i} className="flex justify-between pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                    <span className="text-xs text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{f.label}</span>
                    <span className="text-sm font-semibold text-[#1E293B] text-right max-w-[200px]">{f.value}</span>
                  </div>
                ))}
              </div>

              {selected.message && (
                <div className="bg-slate-50 rounded-lg p-4 mb-5">
                  <div className="text-[10px] tracking-[1px] text-slate-400 uppercase font-semibold mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Message</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{selected.message}</p>
                </div>
              )}

              <div className="space-y-2 mb-4">
                <div className="text-[10px] tracking-[1px] text-slate-400 uppercase font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Update Status</div>
                <div className="flex gap-2">
                  {(["new", "read", "replied"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => markStatus(selected.id, s)}
                      disabled={updating || selected.status === s}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold cursor-pointer border transition-all disabled:opacity-50 ${
                        selected.status === s ? "bg-[#0B1628] text-white border-[#0B1628]" : "bg-white text-slate-500 border-slate-200 hover:border-[#4DA3E8]"
                      }`}
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {statusLabel[s]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${selected.email}?subject=Re: Your Inquiry — Billoo Travels&body=Assalamu Alaikum ${selected.full_name},%0A%0AThank you for reaching out to Billoo Travels Services.%0A%0A`}
                  className="w-full bg-[#4DA3E8] text-white py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#2B7CC4] transition-all text-center block no-underline"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  Reply via Email
                </a>
                {selected.phone && (
                  <a
                    href={`https://wa.me/${selected.phone.replace(/\D/g, "")}?text=Assalamu%20Alaikum%20${encodeURIComponent(selected.full_name)},%20this%20is%20Billoo%20Travels.%20We%20received%20your%20inquiry%20and%20would%20like%20to%20assist%20you.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] text-white py-2.5 rounded-lg font-semibold text-sm cursor-pointer border-none hover:bg-[#1DA851] transition-all text-center block no-underline"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
              <div className="text-slate-300 text-4xl mb-3">✉</div>
              <div className="text-sm text-slate-400">Select a message to view details</div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
