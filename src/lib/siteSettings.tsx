"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type SiteSettings = {
  logo_url: string | null;
  logo_width: number;
  logo_height: number;
};

const defaults: SiteSettings = {
  logo_url: null,
  logo_width: 120,
  logo_height: 40,
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
