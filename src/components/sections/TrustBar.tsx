"use client";

import { useState, useEffect } from "react";

interface TrustItem {
  value: string;
  label: string;
}

interface HomepageContent {
  trust_enabled: boolean;
  trust_items: TrustItem[];
}

export default function TrustBar() {
  const [data, setData] = useState<HomepageContent | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/homepage")
      .then((r) => r.json())
      .then((d) => setData(d.content || null))
      .catch(() => setData(null))
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || !data || !data.trust_enabled) return null;
  const items = Array.isArray(data.trust_items) ? data.trust_items : [];
  if (items.length === 0) return null;

  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-6 md:px-9 py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
          {items.map((it, i) => (
            <div key={i} className="flex items-center gap-3">
              {i > 0 && <span className="hidden md:block w-px h-9 bg-slate-200 -ml-6 md:-ml-9" />}
              <div className="text-center md:text-left">
                <div className="font-heading text-lg md:text-xl font-bold text-midnight leading-none">
                  {it.value}
                </div>
                <div className="font-mono text-[9px] md:text-[10px] tracking-[1.5px] uppercase text-slate-400 mt-1">
                  {it.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
