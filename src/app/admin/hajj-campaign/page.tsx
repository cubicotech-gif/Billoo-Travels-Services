"use client";

import { useMemo, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { SITE } from "@/lib/seo";
import { HAJJ, HAJJ_BENEFITS } from "@/lib/hajj";
import { CONTACT } from "@/lib/data";

// The public campaign link people click from social posts
const BASE_LINK = `${SITE.url}${HAJJ.landingPath}`;

const HASHTAGS = `#Hajj${HAJJ.year} #Hajj #Umrah #BillooTravels #HajjRegistration #Makkah #Madinah #Pakistan #Karachi #HajjPackages`;

interface Channel {
  key: string;
  label: string;
  emoji: string;
  utm: string;
  caption: string;
  hasShareIntent: boolean;
}

const CHANNELS: Channel[] = [
  {
    key: "facebook",
    label: "Facebook",
    emoji: "📘",
    utm: "utm_source=facebook&utm_medium=social&utm_campaign=hajj2027",
    hasShareIntent: true,
    caption: `🕋 Hajj ${HAJJ.year} Registration is NOW OPEN! (${HAJJ.hijri})

Reserve your place for the sacred journey with Billoo Travels — a government-approved Hajj operator serving pilgrims since 1969.

✅ ${HAJJ_BENEFITS[0]}
✅ ${HAJJ_BENEFITS[2]}
✅ ${HAJJ_BENEFITS[1]}
✅ ${HAJJ_BENEFITS[3]}

Registration is FREE and takes under a minute — no payment required. Seats are limited, so reserve yours today 👇

👉 Register now: {LINK}
📞 Or call us: ${CONTACT.phone}

${HASHTAGS}`,
  },
  {
    key: "instagram",
    label: "Instagram",
    emoji: "📸",
    utm: "utm_source=instagram&utm_medium=social&utm_campaign=hajj2027",
    hasShareIntent: false,
    caption: `🕋 Hajj ${HAJJ.year} Registration — NOW OPEN

Your journey to the House of Allah begins here. Register free with Billoo Travels, trusted since 1969.

✨ 5-star hotels steps from the Haram
✨ VIP Mina & Arafat camps
✨ Full visa & Nusuk support
✨ 15,000+ pilgrims guided

No payment to register. Limited seats.
🔗 Link in bio to register today.

${HASHTAGS}`,
  },
  {
    key: "whatsapp",
    label: "WhatsApp / Status",
    emoji: "💬",
    utm: "utm_source=whatsapp&utm_medium=social&utm_campaign=hajj2027",
    hasShareIntent: true,
    caption: `🕋 *Hajj ${HAJJ.year} Registration is Open!*

Assalamu Alaikum. Billoo Travels (approved operator since 1969) has opened Hajj ${HAJJ.year} registration.

✅ 5-star hotels near the Haram
✅ VIP Mina & Arafat camps
✅ Complete visa & Nusuk support

Registration is *free* and takes a minute — no payment required. Seats are limited.

Register here 👉 {LINK}
Or reply to this message and our advisor will call you back.`,
  },
  {
    key: "twitter",
    label: "X (Twitter)",
    emoji: "🐦",
    utm: "utm_source=twitter&utm_medium=social&utm_campaign=hajj2027",
    hasShareIntent: true,
    caption: `🕋 Hajj ${HAJJ.year} Registration is now OPEN.

Register free with Billoo Travels — approved operator since 1969. 5-star hotels near the Haram, VIP Mina & Arafat camps, full visa support.

No payment to register. Limited seats 👇
{LINK}

${HASHTAGS}`,
  },
];

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked — no-op
    }
  }
  return (
    <button
      onClick={copy}
      className={`px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer border transition-all ${
        copied
          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
          : "bg-[#0B1628] text-white border-none hover:bg-[#1a3054]"
      }`}
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      {copied ? "✓ Copied!" : `⧉ ${label}`}
    </button>
  );
}

export default function AdminHajjCampaign() {
  const [active, setActive] = useState(CHANNELS[0].key);
  const channel = CHANNELS.find((c) => c.key === active)!;

  const link = useMemo(() => `${BASE_LINK}?${channel.utm}`, [channel]);
  const caption = useMemo(() => channel.caption.replace(/\{LINK\}/g, link), [channel, link]);

  function shareIntent() {
    const encoded = encodeURIComponent(caption);
    const encodedLink = encodeURIComponent(link);
    let url = "";
    if (channel.key === "facebook") {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}&quote=${encoded}`;
    } else if (channel.key === "whatsapp") {
      url = `https://wa.me/?text=${encoded}`;
    } else if (channel.key === "twitter") {
      url = `https://twitter.com/intent/tweet?text=${encoded}`;
    }
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]" style={{ fontFamily: "'Sora', sans-serif" }}>
            Hajj {HAJJ.year} Campaign
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Ready-to-share posts for your social media campaign — copy, tweak, and publish.
          </p>
        </div>
        <a
          href={HAJJ.landingPath}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#4DA3E8] text-white px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer border-none no-underline hover:bg-[#2B7CC4] transition-all"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          ↗ View Landing Page
        </a>
      </div>

      {/* Campaign link */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
        <div className="text-[11px] tracking-[1.5px] uppercase text-slate-400 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Campaign Link
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <code className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-[13px] text-[#1E293B] break-all">
            {link}
          </code>
          <CopyButton text={link} label="Copy Link" />
        </div>
        <p className="text-[12px] text-slate-400 mt-2.5">
          This link tracks which channel your visitors came from (via UTM tags). Share the version that
          matches where you&apos;re posting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Left: post composer */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          {/* Channel tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {CHANNELS.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer border transition-all ${
                  active === c.key
                    ? "bg-[#0B1628] text-white border-[#0B1628]"
                    : "bg-white text-slate-500 border-slate-200 hover:border-[#4DA3E8]"
                }`}
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="text-[11px] tracking-[1.5px] uppercase text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {channel.label} Post
            </div>
            <span className="text-[11px] text-slate-400">{caption.length} characters</span>
          </div>

          <textarea
            readOnly
            value={caption}
            rows={16}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-[13.5px] text-[#1E293B] leading-relaxed resize-none focus:outline-none focus:border-[#4DA3E8]"
          />

          <div className="flex flex-wrap gap-2.5 mt-4">
            <CopyButton text={caption} label="Copy Post" />
            <CopyButton text={HASHTAGS} label="Copy Hashtags" />
            {channel.hasShareIntent && (
              <button
                onClick={shareIntent}
                className="px-4 py-2 rounded-lg font-semibold text-xs cursor-pointer border border-[#4DA3E8]/30 bg-[#EBF5FF] text-[#2B7CC4] hover:bg-[#d9ecfb] transition-all"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                ↗ Open {channel.label} Share
              </button>
            )}
          </div>

          {channel.key === "instagram" && (
            <p className="text-[12px] text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3.5 py-2.5 mt-4">
              💡 Instagram doesn&apos;t allow clickable links in captions. Copy this caption, then set your
              bio link to the campaign link above (or use a link-in-bio tool).
            </p>
          )}
        </div>

        {/* Right: shareable promo card preview */}
        <div>
          <div className="text-[11px] tracking-[1.5px] uppercase text-slate-400 mb-2.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Shareable Card — screenshot to post
          </div>
          <div
            className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-square"
            style={{
              backgroundImage:
                "linear-gradient(160deg, rgba(11,22,40,0.94), rgba(21,37,69,0.92)), url('" + HAJJ.heroImage + "')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 p-7 flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#4DA3E8] flex items-center justify-center text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>B</div>
                  <div>
                    <div className="text-[11px] font-bold tracking-[1.5px]" style={{ fontFamily: "'Sora', sans-serif" }}>BILLOO TRAVELS</div>
                    <div className="text-[7px] tracking-[2px] text-[#7EC8FF]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>PVT LTD · EST. 1969</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 bg-emerald-400/15 border border-emerald-400/40 text-emerald-300 text-[9px] font-semibold tracking-[1px] px-2.5 py-1 rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  OPEN
                </span>
              </div>

              <div>
                <div className="text-[10px] tracking-[3px] uppercase text-[#7EC8FF] mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Hajj {HAJJ.year} · {HAJJ.hijri}
                </div>
                <div className="text-[34px] leading-[1.02] font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Registration
                  <br />
                  <span className="italic text-[#7EC8FF]">Now Open</span>
                </div>
                <div className="text-[12px] text-white/70 mt-3 leading-snug max-w-[240px]">
                  Reserve your place for the sacred journey. Free registration — no payment required.
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/15 pt-4">
                <div className="text-[11px] text-white/80 font-semibold" style={{ fontFamily: "'Sora', sans-serif" }}>
                  billootravels.com/hajj
                </div>
                <div className="text-[11px] text-[#7EC8FF]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {CONTACT.phone}
                </div>
              </div>
            </div>
          </div>
          <p className="text-[12px] text-slate-400 mt-3 leading-relaxed">
            Take a screenshot of this card to use as your post image, or design your own in Canva using
            the same details. Pair it with the caption on the left.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
