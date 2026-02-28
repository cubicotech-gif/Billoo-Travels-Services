"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════
   DESTINATION DATA (static fallback)
══════════════════════════════════════════ */
const STATIC_DESTINATIONS = [
  {
    id: "umrah",
    label: "Umrah",
    city: "Makkah",
    code: "JED",
    country: "Saudi Arabia",
    tagline: "Your Sacred Journey, Elevated",
    description: "VIP pilgrimage · Five-star suites steps from Haram · Personal scholar guiding every ritual · Private SUV transfers · 99.8% visa success",
    price: "450,000",
    temp: "34°C",
    flight: "~4h 15m",
    tz: "AST",
    images: [
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=100&h=160&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=100&h=160&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565552643951-b2e152973b06?w=100&h=160&fit=crop&q=80",
    ],
    bgImage:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=85&w=2400",
    mapCoords: { x: 62, y: 46 },
    quote: {
      text: "Flawless logistics let us focus entirely on worship. Truly transcendent.",
      name: "Fatima H.",
      role: "Executive Hajj '24",
      initial: "F",
    },
  },
  {
    id: "hajj",
    label: "Hajj 2026",
    city: "Makkah",
    code: "JED",
    country: "Saudi Arabia",
    tagline: "The Journey of a Lifetime",
    description: "Premium Hajj packages · Palace suites at Abraj Al Bait · Dedicated scholar · VIP transfers · Priority visa processing",
    price: "1,250,000",
    temp: "38°C",
    flight: "~4h 15m",
    tz: "AST",
    images: [
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=100&h=160&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=100&h=160&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565552643951-b2e152973b06?w=100&h=160&fit=crop&q=80",
    ],
    bgImage:
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=85&w=2400",
    mapCoords: { x: 62, y: 46 },
    quote: {
      text: "The Clock Tower suite and VIP transfers exceeded all expectations.",
      name: "Khalid A.",
      role: "Royal Umrah '24",
      initial: "K",
    },
  },
  {
    id: "turkey",
    label: "Turkey",
    city: "Istanbul",
    code: "IST",
    country: "Turkey",
    tagline: "Where Continents Converge",
    description: "Ottoman heritage · Bosphorus cruises · Cappadocia balloon rides · Luxury boutique hotels · Halal dining curated",
    price: "380,000",
    temp: "18°C",
    flight: "~5h 40m",
    tz: "TRT",
    images: [
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=100&h=160&fit=crop&q=80",
      "https://images.unsplash.com/photo-1554535736-73565-4a1c?w=100&h=160&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=100&h=160&fit=crop&q=80",
    ],
    bgImage:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=85&w=2400",
    mapCoords: { x: 54, y: 30 },
    quote: {
      text: "Istanbul with Billoo felt like traveling with family. Incredible detail.",
      name: "Dr. Aisha S.",
      role: "Turkey Tour '24",
      initial: "A",
    },
  },
  {
    id: "dubai",
    label: "Dubai",
    city: "Dubai",
    code: "DXB",
    country: "UAE",
    tagline: "Beyond Extraordinary",
    description: "Desert safaris · Sky-high dining · Beachfront suites · Burj Khalifa access · Curated shopping tours",
    price: "320,000",
    temp: "30°C",
    flight: "~2h 30m",
    tz: "GST",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=100&h=160&fit=crop&q=80",
      "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=100&h=160&fit=crop&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=160&fit=crop&q=80",
    ],
    bgImage:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=85&w=2400",
    mapCoords: { x: 66, y: 43 },
    quote: {
      text: "Our family trip was seamless. The personal concierge was a game changer.",
      name: "Hasan R.",
      role: "Dubai Luxury '24",
      initial: "H",
    },
  },
];

type Destination = (typeof STATIC_DESTINATIONS)[0];

const KARACHI = { x: 70, y: 50 };

function buildBarcode() {
  return Array.from({ length: 20 }, () => 8 + Math.floor(Math.random() * 13));
}

/* ══════════════════════════════════════════
   ROUTE MAP SVG
══════════════════════════════════════════ */
function RouteMap({ dest, flightTime, temp, tz }: {
  dest: Destination;
  flightTime: string;
  temp: string;
  tz: string;
}) {
  const from = KARACHI;
  const to = dest.mapCoords;
  const midX = (from.x + to.x) / 2;
  const midY = Math.min(from.y, to.y) - 14;
  const pathD = `M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`;

  const dots: { cx: number; cy: number }[] = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 10; col++) {
      dots.push({ cx: 5 + col * 10, cy: 5 + row * 9 });
    }
  }

  return (
    <div className="icard-inner" style={{ padding: "14px", height: "100%" }}>
      {/* Live tag */}
      <div
        className="live-tag"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "rgba(77,163,232,.1)",
          border: "1px solid rgba(77,163,232,.2)",
          borderRadius: 4,
          padding: "2px 7px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 7,
          color: "var(--sky)",
          letterSpacing: "1px",
        }}
      >
        LIVE ROUTE
      </div>

      <svg
        viewBox="0 0 100 75"
        style={{ width: "100%", height: "100%" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid dots */}
        {dots.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={0.35} fill="rgba(77,163,232,.06)" />
        ))}

        {/* Route path */}
        <path
          d={pathD}
          fill="none"
          stroke="var(--light)"
          strokeWidth={0.6}
          strokeDasharray={200}
          strokeDashoffset={0}
          opacity={0.35}
          style={{
            animation: "routeDraw 2s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        />

        {/* Flying dot */}
        <circle
          r={1.1}
          fill="var(--light)"
          filter="url(#glow)"
          style={{
            offsetPath: `path('${pathD}')`,
            animation: "planeFly 2.5s cubic-bezier(0.16,1,0.3,1) infinite",
          } as React.CSSProperties}
        />

        {/* Karachi marker */}
        <circle cx={from.x} cy={from.y} r={1.3} fill="var(--light)" opacity={0.5} />
        <circle cx={from.x} cy={from.y} r={3} fill="none" stroke="var(--light)" strokeWidth={0.4} opacity={0.3}>
          <animate attributeName="r" values="3;6.5;3" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <text
          x={from.x}
          y={from.y + 4}
          textAnchor="middle"
          fontSize={3}
          fill="var(--light)"
          opacity={0.6}
          fontFamily="JetBrains Mono"
        >
          KHI
        </text>

        {/* Destination marker */}
        <circle cx={to.x} cy={to.y} r={1.3} fill="var(--sky)" opacity={0.7} />
        <circle cx={to.x} cy={to.y} r={3} fill="none" stroke="var(--sky)" strokeWidth={0.4} opacity={0.3}>
          <animate attributeName="r" values="3;6.5;3" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <text
          x={to.x}
          y={to.y + 4}
          textAnchor="middle"
          fontSize={3}
          fill="var(--sky)"
          opacity={0.7}
          fontFamily="JetBrains Mono"
        >
          {dest.code}
        </text>
      </svg>

      {/* Bottom info */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 14,
          right: 14,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 7.5,
          color: "rgba(123,196,245,.5)",
          letterSpacing: "0.5px",
        }}
      >
        <span>Flight: {flightTime}</span>
        <span>{temp} · {tz}</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN HERO COMPONENT
══════════════════════════════════════════ */
export default function Hero() {
  const [destinations, setDestinations] = useState<Destination[]>(STATIC_DESTINATIONS);
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [clockStr, setClockStr] = useState("");
  const [barcode, setBarcode] = useState(buildBarcode());
  const [stripKey, setStripKey] = useState(0);
  const [mapKey, setMapKey] = useState(0);
  // ref keeps destinations.length always current inside stale-closure setInterval
  const destLengthRef = useRef(STATIC_DESTINATIONS.length);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── keep destLengthRef current & reset active when destinations swap ── */
  useEffect(() => {
    destLengthRef.current = destinations.length;
    setActive((prev) => (prev < destinations.length ? prev : 0));
  }, [destinations]);

  /* ── fetch live destinations from API, map to expected shape ── */
  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then((json) => {
        if (json.destinations && json.destinations.length > 0) {
          const mapped: Destination[] = json.destinations
            .filter((d: Record<string, unknown>) => d.active)
            .map((d: Record<string, unknown>) => ({
              id: String(d.id),
              label: d.label as string,
              city: d.city as string,
              code: d.code as string,
              country: d.country as string,
              tagline: d.tagline as string,
              description: d.description as string,
              price: d.price as string,
              temp: d.temp as string,
              flight: d.flight as string,
              tz: d.tz as string,
              images: (d.images as string[]) || [],
              bgImage: d.bg_image as string,
              mapCoords: { x: d.map_x as number, y: d.map_y as number },
              quote: {
                text: d.quote_text as string,
                name: d.quote_name as string,
                role: d.quote_role as string,
                initial: d.quote_initial as string,
              },
            }));
          if (mapped.length > 0) setDestinations(mapped);
        }
      })
      .catch(() => { /* keep static fallback */ });
  }, []);

  const dest = destinations[active];

  /* ── live clock ── */
  useEffect(() => {
    function tick() {
      const now = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" })
      );
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      setClockStr(`${hh}:${mm}:${ss}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── destination switch ── */
  const switchTo = useCallback((idx: number) => {
    if (idx === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(idx);
      setBarcode(buildBarcode());
      setStripKey((k) => k + 1);
      setMapKey((k) => k + 1);
      setFading(false);
    }, 280);
  }, [active]);

  /* ── auto-rotate ── */
  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % destLengthRef.current;
        setFading(true);
        setTimeout(() => {
          setBarcode(buildBarcode());
          setStripKey((k) => k + 1);
          setMapKey((k) => k + 1);
          setFading(false);
        }, 280);
        return next;
      });
    }, 7000);
  }, []);

  useEffect(() => {
    startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [startAuto]);

  /* ── 3D tilt ── */
  useEffect(() => {
    const handlers: (() => void)[] = [];
    cardRefs.current.forEach((card) => {
      if (!card) return;
      function onMove(e: MouseEvent) {
        const rect = card!.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const x = (e.clientX - cx) / (rect.width / 2);
        const y = (e.clientY - cy) / (rect.height / 2);
        card!.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
        // spotlight
        const inner = card!.querySelector(".icard-spotlight") as HTMLElement | null;
        if (inner) {
          const lx = e.clientX - rect.left;
          const ly = e.clientY - rect.top;
          inner.style.background = `radial-gradient(circle at ${lx}px ${ly}px, rgba(77,163,232,.06), transparent 50%)`;
        }
      }
      function onLeave() {
        card!.style.transform = "";
      }
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      handlers.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => handlers.forEach((h) => h());
  }, []);

  /* ── ticker items ── */
  const tickerItems = [
    "✦ Hajj 2026 Bookings Open",
    "✦ Licensed Agent ID 1251",
    "✦ 15,000+ Pilgrims Since 1969",
    "✦ 99.8% Visa Approval",
    "✦ 5-Star Hotels Near Haram",
    "✦ Istanbul Heritage Tours",
    "✦ Dubai Packages from PKR 320K",
    "✦ 24/7 Concierge Service",
  ];

  /* ── guard: dest must exist before we spread images ── */
  if (!dest) return null;

  /* ── strip images: 4x3=12 tiles ── */
  const stripImages = [
    ...dest.images,
    ...dest.images,
    ...dest.images,
    ...dest.images,
  ];

  /* ── progress bar restart helper ── */
  const progressKey = `${active}`;

  return (
    <section id="home" className="hero-root">

      {/* ══ Background images with diagonal mask ══ */}
      <div className="hero-bg">
        {destinations.map((d, i) => (
          <img
            key={d.id}
            src={d.bgImage}
            alt={d.city}
            className={i === active ? "active" : "inactive"}
          />
        ))}
      </div>

      {/* ══ Overlay system (5 layers) ══ */}
      {/* 1. Diagonal gradient — keeps left dark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(100deg, var(--deep) 0%, var(--deep) 38%, rgba(6,15,27,.5) 50%, rgba(6,15,27,.15) 65%, rgba(6,15,27,.08) 80%, rgba(6,15,27,.2) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* 2. Bottom fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, var(--deep) 0%, transparent 30%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
      {/* 3. Top fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, var(--deep) 0%, transparent 15%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />
      {/* 4. Blue light bleed */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          left: "calc(38% - 90px)",
          width: 180,
          background:
            "linear-gradient(90deg, transparent, rgba(77,163,232,.04), transparent)",
          zIndex: 4,
          pointerEvents: "none",
        }}
      />
      {/* 5. SVG diagonal line */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 4,
          pointerEvents: "none",
        }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="diagLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(77,163,232,0)" />
            <stop offset="35%" stopColor="rgba(77,163,232,.15)" />
            <stop offset="65%" stopColor="rgba(77,163,232,.08)" />
            <stop offset="100%" stopColor="rgba(77,163,232,0)" />
          </linearGradient>
        </defs>
        <line
          x1="40%"
          y1="0"
          x2="54%"
          y2="100%"
          stroke="url(#diagLine)"
          strokeWidth="1"
        />
      </svg>

      {/* ══ Scanline on image area ══ */}
      <div className="hero-scanline-wrap" style={{ zIndex: 5 }}>
        <div className="hero-scanline-bar" />
      </div>

      {/* ══ Morphing ambient blob ══ */}
      <div className="hero-blob" style={{ zIndex: 1 }} />

      {/* ══ Film grain ══ */}
      <div className="hero-grain" style={{ zIndex: 6 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════
          TICKER BAR
      ══════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 0,
          right: 0,
          height: 28,
          background: "rgba(6,15,27,.5)",
          borderTop: "1px solid rgba(77,163,232,.05)",
          borderBottom: "1px solid rgba(77,163,232,.05)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        <div className="hero-ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: "1px",
                color: "rgba(123,196,245,.3)",
                marginRight: 48,
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MAIN 3-COLUMN LAYOUT
      ══════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1520,
          margin: "0 auto",
          padding: "108px 40px 50px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >

        {/* ── Column 1: Vertical Filmstrip ── */}
        <div
          style={{
            width: 95,
            flexShrink: 0,
            position: "relative",
            height: "70%",
            overflow: "hidden",
            borderRadius: 5,
          }}
        >
          {/* Top fade */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 60,
              background: "linear-gradient(to bottom, var(--deep), transparent)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 60,
              background: "linear-gradient(to top, var(--deep), transparent)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          {/* Scrolling column */}
          <div
            key={stripKey}
            className="strip-scroll"
            style={{ display: "flex", flexDirection: "column", gap: 6 }}
          >
            {stripImages.map((src, i) => (
              <div
                key={i}
                style={{
                  width: "100%",
                  height: 160,
                  borderRadius: 3,
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
          {/* Side label */}
          <div
            style={{
              position: "absolute",
              left: -20,
              top: "50%",
              transform: "translateY(-50%) rotate(-90deg)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 7.5,
              letterSpacing: "4px",
              color: "rgba(77,163,232,.12)",
              whiteSpace: "nowrap",
              zIndex: 3,
            }}
          >
            GALLERY
          </div>
        </div>

        {/* ── Column 2: Text Content ── */}
        <div
          className={`hero-text-fade${fading ? " fading" : ""}`}
          style={{
            flex: 1,
            maxWidth: 460,
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {/* Destination Tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 20 }}>
            {destinations.map((d, i) => (
              <button
                key={d.id}
                onClick={() => { switchTo(i); startAuto(); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 14px",
                  background: i === active ? "rgba(77,163,232,.1)" : "rgba(255,255,255,.015)",
                  border: `1px solid ${i === active ? "rgba(77,163,232,.22)" : "rgba(255,255,255,.04)"}`,
                  borderRadius: 4,
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: i === active ? "var(--light)" : "rgba(255,255,255,.1)",
                    boxShadow: i === active ? "0 0 6px var(--light)" : "none",
                    transition: "all 0.3s",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 10,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: i === active ? "var(--sky)" : "rgba(255,255,255,.3)",
                  }}
                >
                  {d.label}
                </span>
              </button>
            ))}
          </div>

          {/* Route code */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "var(--light)",
              opacity: 0.5,
              letterSpacing: "2px",
              marginBottom: 10,
            }}
          >
            KHI → {dest.code}
          </div>

          {/* City name */}
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 72,
              fontWeight: 400,
              lineHeight: 0.92,
              color: "#fff",
              margin: "0 0 14px 0",
            }}
          >
            {dest.city}
          </h1>

          {/* Country line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 28,
                height: 1,
                background: "linear-gradient(90deg, gold, transparent)",
              }}
            />
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 10,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "var(--sky)",
              }}
            >
              {dest.country}
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontStyle: "italic",
              fontSize: 18,
              color: "rgba(123,196,245,.5)",
              margin: "0 0 12px 0",
            }}
          >
            {dest.tagline}
          </p>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 12.5,
              fontWeight: 300,
              lineHeight: 1.85,
              color: "rgba(255,255,255,.26)",
              maxWidth: 400,
              margin: 0,
            }}
          >
            {dest.description}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
            <button
              className="hero-btn-primary"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#fff",
                background: "linear-gradient(135deg, var(--light), var(--sky))",
                border: "none",
                borderRadius: 3,
                padding: "13px 34px",
                cursor: "pointer",
                boxShadow: "0 4px 18px rgba(77,163,232,.15)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(77,163,232,.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 18px rgba(77,163,232,.15)";
              }}
            >
              Explore Package
            </button>
            <button
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "var(--sky)",
                background: "transparent",
                border: "1px solid rgba(77,163,232,.18)",
                borderRadius: 3,
                padding: "13px 34px",
                cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(77,163,232,.45)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(77,163,232,.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(77,163,232,.18)";
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              View All
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 28, marginTop: 32 }}>
            {[
              { value: "15,000+", label: "Pilgrims" },
              { value: "55+", label: "Years" },
              { value: "50+", label: "Cities" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="grad-text"
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 22,
                    lineHeight: 1.1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 9,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(123,196,245,.2)",
                    marginTop: 3,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Column 3: Info Cards ── */}
        <div
          style={{
            width: 340,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >

          {/* ── Card 1: Boarding Pass ── */}
          <div
            className="icard"
            ref={(el) => { cardRefs.current[0] = el; }}
          >
            <div className="icard-spotlight" />
            <div className="icard-inner" style={{ padding: "16px" }}>
              <div style={{ display: "flex", gap: 0 }}>

                {/* Left section: airport codes */}
                <div
                  style={{
                    width: 48,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexShrink: 0,
                    paddingRight: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 7.5,
                      color: "rgba(123,196,245,.3)",
                      letterSpacing: "1px",
                      marginBottom: 4,
                    }}
                  >
                    FROM
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: 26,
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    KHI
                  </span>
                  <span style={{ fontSize: 14, opacity: 0.4, margin: "8px 0" }}>✈</span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 7.5,
                      color: "rgba(123,196,245,.3)",
                      letterSpacing: "1px",
                      marginBottom: 4,
                    }}
                  >
                    TO
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: 26,
                      color: "var(--light)",
                      lineHeight: 1,
                    }}
                  >
                    {dest.code}
                  </span>
                </div>

                {/* Perforated divider */}
                <div
                  style={{
                    width: 1,
                    borderLeft: "1px dashed rgba(77,163,232,.08)",
                    marginRight: 12,
                    alignSelf: "stretch",
                  }}
                />

                {/* Right section */}
                <div style={{ flex: 1, position: "relative" }}>
                  {/* Barcode top-right */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      display: "flex",
                      gap: 1.5,
                      alignItems: "flex-end",
                    }}
                  >
                    {barcode.map((h, i) => (
                      <div
                        key={i}
                        className="bc-bar"
                        style={{
                          width: 2,
                          height: h,
                          background: "rgba(123,196,245,.12)",
                          transition: "background 0.3s",
                        }}
                      />
                    ))}
                  </div>

                  {/* Header */}
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 7.5,
                      color: "rgba(123,196,245,.2)",
                      letterSpacing: "2px",
                      marginBottom: 6,
                    }}
                  >
                    BILLOO TRAVELS · BOARDING PASS
                  </div>

                  {/* City + country */}
                  <div
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: 20,
                      color: "#fff",
                      lineHeight: 1.1,
                    }}
                  >
                    {dest.city}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 11,
                      color: "rgba(255,255,255,.3)",
                      marginBottom: 10,
                    }}
                  >
                    {dest.country}
                  </div>

                  {/* Flight info row */}
                  <div style={{ display: "flex", gap: 18 }}>
                    {[
                      { label: "FLIGHT", value: dest.flight },
                      { label: "TEMP", value: dest.temp },
                      { label: "FROM PKR", value: dest.price },
                    ].map((info) => (
                      <div key={info.label}>
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 7,
                            color: "rgba(123,196,245,.3)",
                            letterSpacing: "1px",
                            marginBottom: 2,
                          }}
                        >
                          {info.label}
                        </div>
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 13,
                            color: "#fff",
                            fontWeight: 500,
                          }}
                        >
                          {info.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Hover reveal */}
                  <div className="boarding-reveal">
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        className="hero-btn-primary"
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: 8.5,
                          fontWeight: 600,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: "#fff",
                          background: "linear-gradient(135deg, var(--light), var(--sky))",
                          border: "none",
                          borderRadius: 3,
                          padding: "7px 16px",
                          cursor: "pointer",
                        }}
                      >
                        Book This Package
                      </button>
                      <button
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontSize: 8.5,
                          fontWeight: 600,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: "var(--sky)",
                          background: "transparent",
                          border: "1px solid rgba(77,163,232,.2)",
                          borderRadius: 3,
                          padding: "7px 16px",
                          cursor: "pointer",
                        }}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Card 2: Route Map ── */}
          <div
            className="icard"
            ref={(el) => { cardRefs.current[1] = el; }}
            style={{ height: 150 }}
          >
            <div className="icard-spotlight" />
            <RouteMap
              key={mapKey}
              dest={dest}
              flightTime={dest.flight}
              temp={dest.temp}
              tz={dest.tz}
            />
          </div>

          {/* ── Card 3: Testimonial ── */}
          <div
            className="icard"
            ref={(el) => { cardRefs.current[2] = el; }}
          >
            <div className="icard-spotlight" />
            <div className="icard-inner" style={{ padding: "14px 16px" }}>
              {/* Top row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 8,
                }}
              >
                {/* Quote mark */}
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 28,
                    color: "var(--light)",
                    opacity: 0.12,
                    lineHeight: 1,
                  }}
                >
                  &ldquo;
                </span>
                {/* Stars */}
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="star-box"
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 3,
                        background:
                          i < 4
                            ? "linear-gradient(135deg, var(--light), var(--sky))"
                            : "linear-gradient(135deg, var(--light) 50%, rgba(77,163,232,.2) 50%)",
                      }}
                    />
                  ))}
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "var(--sky)",
                      marginLeft: 3,
                    }}
                  >
                    4.9
                  </span>
                </div>
              </div>

              {/* Quote text */}
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,.4)",
                  margin: "0 0 12px 0",
                }}
              >
                {dest.quote.text}
              </p>

              {/* Bottom row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Avatar + name */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--blue), var(--light))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: 14,
                      color: "#fff",
                    }}
                  >
                    {dest.quote.initial}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 12,
                        color: "#fff",
                        fontWeight: 500,
                      }}
                    >
                      {dest.quote.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 8.5,
                        color: "rgba(123,196,245,.4)",
                      }}
                    >
                      {dest.quote.role}
                    </div>
                  </div>
                </div>
                {/* Verified badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    background: "rgba(34,197,94,.06)",
                    border: "1px solid rgba(34,197,94,.15)",
                    borderRadius: 20,
                    padding: "3px 8px",
                  }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#22C55E",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 7.5,
                      color: "#4ade80",
                      letterSpacing: "0.5px",
                    }}
                  >
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Card 4: Clock + License (side by side) ── */}
          <div style={{ display: "flex", gap: 10 }}>
            {/* Clock card */}
            <div
              className="icard"
              ref={(el) => { cardRefs.current[3] = el; }}
              style={{ flex: 1 }}
            >
              <div className="icard-spotlight" />
              <div className="icard-inner" style={{ padding: "12px 14px" }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 7,
                    color: "rgba(123,196,245,.22)",
                    letterSpacing: "1px",
                    marginBottom: 6,
                    textTransform: "uppercase",
                  }}
                >
                  Local Time · Karachi
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 18,
                    color: "#fff",
                    fontWeight: 500,
                    fontVariantNumeric: "tabular-nums",
                    display: "flex",
                    alignItems: "baseline",
                    gap: 1,
                  }}
                >
                  {clockStr ? (
                    <>
                      <span>{clockStr.slice(0, 2)}</span>
                      <span className="clock-colon">:</span>
                      <span>{clockStr.slice(3, 5)}</span>
                      <span
                        style={{ fontSize: "72%", opacity: 0.35 }}
                      >
                        <span className="clock-colon">:</span>
                        {clockStr.slice(6, 8)}
                      </span>
                    </>
                  ) : (
                    <span>--:--</span>
                  )}
                </div>
              </div>
            </div>

            {/* License card */}
            <div
              className="icard"
              ref={(el) => { cardRefs.current[4] = el; }}
              style={{ flex: 1 }}
            >
              <div className="icard-spotlight" />
              <div className="icard-inner" style={{ padding: "12px 14px" }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 7,
                    color: "rgba(123,196,245,.22)",
                    letterSpacing: "1px",
                    marginBottom: 6,
                    textTransform: "uppercase",
                  }}
                >
                  License Status
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    className="license-dot"
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#22C55E",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      color: "#fff",
                      fontWeight: 500,
                    }}
                  >
                    ID 1251
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* End Column 3 */}
      </div>
      {/* End 3-column layout */}

      {/* ══════════════════════════════════════════
          BOTTOM BAR
      ══════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "0 40px 18px",
        }}
      >
        {/* Left: slide progress */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 18,
              color: "var(--light)",
              lineHeight: 1,
            }}
          >
            {String(active + 1).padStart(2, "0")}
          </span>
          <div style={{ display: "flex", gap: 4, alignItems: "center", paddingBottom: 3 }}>
            {destinations.map((_, i) => (
              <div
                key={i}
                style={{
                  width: 28,
                  height: 3,
                  borderRadius: 2,
                  background: "rgba(255,255,255,.04)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {i < active && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(77,163,232,.18)",
                    }}
                  />
                )}
                {i === active && (
                  <div
                    key={progressKey}
                    className="progress-fill"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(90deg, var(--light), var(--sky))",
                      width: 0,
                      animation: "progressFill 7s linear forwards",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
          <span
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 10,
              color: "rgba(255,255,255,.1)",
              paddingBottom: 1,
            }}
          >
            / 04
          </span>
        </div>

        {/* Center: scroll indicator */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 7.5,
              letterSpacing: "3px",
              color: "rgba(123,196,245,.13)",
            }}
          >
            SCROLL
          </span>
          <div
            style={{
              width: 1,
              height: 18,
              background: "linear-gradient(to bottom, rgba(77,163,232,.2), transparent)",
            }}
          />
        </div>

        {/* Right: social links */}
        <div style={{ display: "flex", gap: 18, paddingBottom: 2 }}>
          {["Facebook", "Instagram", "YouTube"].map((s) => (
            <a
              key={s}
              href="#"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 9,
                letterSpacing: "1.5px",
                color: "rgba(255,255,255,.12)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "var(--sky)")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,.12)")}
            >
              {s}
            </a>
          ))}
        </div>
      </div>

    </section>
  );
}
