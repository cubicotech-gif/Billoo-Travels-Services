"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Admin sidebar icons
const icons = {
  Dashboard: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  Packages: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  Blog: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"/><path d="M6 8h12M6 12h8M6 16h10"/></svg>,
  Testimonials: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  Media: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>,
  Bookings: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M9 16h6"/></svg>,
  Invoices: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>,
  Notifications: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>,
  CRM: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  Reports: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
  Email: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>,
  Analytics: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Settings: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  Menu: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  Close: (c: string) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  Back: (c: string) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>,
};

const NAV = [
  { label: "Dashboard", href: "/admin", icon: "Dashboard" },
  { label: "Bookings", href: "/admin/bookings", icon: "Bookings" },
  { label: "Invoices", href: "/admin/invoices", icon: "Invoices" },
  { label: "Packages", href: "/admin/packages", icon: "Packages" },
  { label: "Blog Posts", href: "/admin/blog", icon: "Blog" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "Testimonials" },
  { label: "Media", href: "/admin/media", icon: "Media" },
  { label: "CRM", href: "/admin/crm", icon: "CRM" },
  { label: "Reports", href: "/admin/reports", icon: "Reports" },
  { label: "Email", href: "/admin/email", icon: "Email" },
  { label: "Analytics", href: "/admin/analytics", icon: "Analytics" },
  { label: "Notifications", href: "/admin/notifications", icon: "Notifications" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-body" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-[260px] bg-[#0B1628] z-50 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-6 pb-4 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 rounded-lg bg-[#4DA3E8] flex items-center justify-center text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>B</div>
            <div>
              <div className="text-white font-semibold text-sm tracking-wide" style={{ fontFamily: "'Sora', sans-serif" }}>BILLOO ADMIN</div>
              <div className="text-white/30 text-[9px] tracking-[2px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>CONTROL PANEL</div>
            </div>
          </Link>
          <button className="lg:hidden bg-transparent border-none cursor-pointer" onClick={() => setSidebarOpen(false)}>
            {icons.Close("rgba(255,255,255,0.4)")}
          </button>
        </div>

        <nav className="px-3 mt-4">
          <div className="text-[10px] tracking-[2px] text-white/20 px-3 mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>MAIN MENU</div>
          {NAV.map((item) => {
            const active = isActive(item.href);
            const iconFn = icons[item.icon as keyof typeof icons];
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 no-underline transition-all text-sm ${
                  active
                    ? "bg-[#4DA3E8]/10 text-[#7EC8FF]"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
                }`}
                style={{ fontFamily: "'Sora', sans-serif", fontWeight: active ? 600 : 500 }}
              >
                {iconFn(active ? "#4DA3E8" : "rgba(255,255,255,0.35)")}
                {item.label}
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4DA3E8]" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Link href="/" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-white/30 no-underline hover:text-white/50 hover:bg-white/[0.03] transition-all text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>
            {icons.Back("rgba(255,255,255,0.3)")}
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-[260px] min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <button className="lg:hidden bg-transparent border-none cursor-pointer" onClick={() => setSidebarOpen(true)}>
            {icons.Menu("#1E293B")}
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-semibold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>Billoo Admin</div>
              <div className="text-[11px] text-slate-400">Agent ID 1251</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#0B1628] flex items-center justify-center text-[#4DA3E8] font-bold text-sm">BA</div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
