import { CONTACT } from "@/lib/data";
import { WhatsAppIcon } from "@/components/ui/Icons";

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Billoo-Travels-Services-Pvt-Ltd/61573636793379/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/billootravels",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@billootravels",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

// ─── FOOTER ───
export function Footer() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Packages", href: "/packages" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];
  const serviceLinks = [
    { label: "Hajj Packages", href: "/packages" },
    { label: "Umrah Packages", href: "/packages" },
    { label: "Visa Processing", href: "/#services" },
    { label: "Luxury Tours", href: "/packages" },
    { label: "Group Bookings", href: "/contact" },
  ];

  return (
    <footer className="bg-charcoal pt-16 pb-7 px-6 md:px-9">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.5fr_1fr_1fr_1.5fr] gap-10 lg:gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-accent rounded-[10px] flex items-center justify-center font-display font-bold text-lg text-white">B</div>
            <div className="font-heading text-base font-bold text-white tracking-wide">BILLOO TRAVELS</div>
          </div>
          <p className="text-[13px] text-white/40 leading-relaxed max-w-[280px] mb-5">
            Pakistan&apos;s premier travel agency for luxury Hajj, Umrah and international tours since 1969.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-accent hover:bg-white/[0.10] hover:border-accent/30 transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div>
          <h4 className="font-mono text-[10px] text-white/30 tracking-[2px] mb-5">NAVIGATE</h4>
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="block text-white/40 no-underline text-[13px] mb-2.5 hover:text-accent transition-colors">{l.label}</a>
          ))}
        </div>

        {/* Services */}
        <div>
          <h4 className="font-mono text-[10px] text-white/30 tracking-[2px] mb-5">SERVICES</h4>
          {serviceLinks.map((l) => (
            <a key={l.label} href={l.href} className="block text-white/40 no-underline text-[13px] mb-2.5 hover:text-accent transition-colors">{l.label}</a>
          ))}
        </div>

        {/* Ministry Badge */}
        <div>
          <a
            href="https://www.mora.gov.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 bg-white/[0.03] rounded-[14px] border border-white/[0.06] no-underline hover:border-accent/30 hover:bg-white/[0.05] transition-all group"
          >
            {/* Shield icon + verified label */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4DA3E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div className="font-mono text-[9px] text-accent tracking-[1.5px] leading-tight">VERIFIED OPERATOR</div>
            </div>
            <div className="text-[11px] text-white/50 leading-relaxed mb-3">
              Verified &amp; Licensed by the Ministry of Religious Affairs &amp; Hajj, Government of Pakistan
            </div>
            <div className="font-heading text-[26px] font-bold text-accent leading-none">
              ID {CONTACT.agentId}
            </div>
            <div className="text-[10px] text-white/25 mt-1.5 group-hover:text-accent/60 transition-colors">
              mora.gov.pk ↗
            </div>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1280px] mx-auto mt-12 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between gap-3">
        <span className="text-xs text-white/25">© 2025 Billoo Travels Services Pvt Ltd. All Rights Reserved.</span>
        <div className="flex gap-5">
          {[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }, { label: "Refunds", href: "/refunds" }].map((l) => (
            <a key={l.label} href={l.href} className="text-white/25 no-underline text-xs hover:text-accent transition-colors">{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── WHATSAPP WIDGET ───
export function WhatsAppWidget() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-7 right-7 w-[54px] h-[54px] rounded-[14px] bg-[#25D366] flex items-center justify-center z-50 shadow-[0_6px_20px_rgba(37,211,102,0.25)] transition-all hover:-translate-y-1 hover:rounded-full no-underline"
    >
      <WhatsAppIcon />
    </a>
  );
}
