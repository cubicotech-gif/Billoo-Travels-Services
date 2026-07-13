"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type SiteSettings = {
  logo_url: string | null;
  logo_width: number;
  logo_height: number;
  // ─── Google reviews widget ───
  google_reviews_enabled: boolean;
  google_reviews_embed: string | null;
  google_reviews_script: string | null;
  google_reviews_url: string | null;
  google_rating: string | null;
  google_reviews_count: string | null;
};

const defaults: SiteSettings = {
  logo_url: null,
  logo_width: 120,
  logo_height: 40,
  google_reviews_enabled: true,
  google_reviews_embed: null,
  google_reviews_script: null,
  google_reviews_url: null,
  google_rating: null,
  google_reviews_count: null,
};

const SiteSettingsContext = createContext<SiteSettings>(defaults);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaults);

  useEffect(() => {
    fetch("/api/site-settings")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setSettings({
            logo_url: data.logo_url ?? null,
            logo_width: data.logo_width ?? 120,
            logo_height: data.logo_height ?? 40,
            google_reviews_enabled: data.google_reviews_enabled ?? true,
            google_reviews_embed: data.google_reviews_embed ?? null,
            google_reviews_script: data.google_reviews_script ?? null,
            google_reviews_url: data.google_reviews_url ?? null,
            google_rating: data.google_rating ?? null,
            google_reviews_count: data.google_reviews_count ?? null,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export const useSiteSettings = () => useContext(SiteSettingsContext);
