"use client";

import { useState, useEffect } from "react";

interface Accreditation {
  name: string;
  logo?: string;
}

interface HomepageContent {
  accred_enabled: boolean;
  accred_label: string;
  accreditations: Accreditation[];
}

export default function AccreditationStrip() {
  const [data, setData] = useState<HomepageContent | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/homepage")
      .then((r) => r.json())
      .then((d) => setData(d.content || null))
      .catch(() => setData(null))
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || !data || !data.accred_enabled) return null;
  const items = Array.isArray(data.accreditations) ? data.accreditations.filter((a) => a.name || a.logo) : [];
  if (items.length === 0) return null;

  return (
    <section className="bg-surface border-y border-slate-200/70 py-10 px-6 md:px-9">
      <div className="max-w-[1280px] mx-auto">
        {data.accred_label && (
          <p className="text-center font-mono text-[10px] tracking-[2.5px] uppercase text-slate-400 mb-7">
            {data.accred_label}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
          {items.map((a, i) =>
            a.logo ? (
              <img
                key={i}
                src={a.logo}
                alt={a.name}
                title={a.name}
                className="h-9 md:h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
              />
            ) : (
              <span
                key={i}
                className="font-heading text-sm md:text-[15px] font-semibold text-slate-400 hover:text-midnight transition-colors"
              >
                {a.name}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
