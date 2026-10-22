"use client";

import { useEffect, useState } from "react";

// ─── HAJJ PHOTO LIBRARY ───
// Photos are uploaded once per hotel / service in Admin → Hajj Photos (table
// `hajj_photos`) and matched to packages from the hotel names a package lists,
// so nobody has to upload the same Fairmont picture onto six packages.

export type PhotoMap = Record<string, string>;

export interface PkgPhotoSource {
  hotel?: string | null;
  hotel_short?: string | null;
  img?: string | null;
  gallery?: string[] | null;
  badge?: string | null;
}

// Which library keys a hotel string mentions. Order matters: the first match
// that has a photo becomes the card cover.
const HOTEL_RULES: [RegExp, string][] = [
  [/intercontinental/i, "intercontinental"],
  [/fairmont/i, "fairmont"],
  [/dar al tawhid ihg/i, "dar-al-tawhid-ihg"],
  [/swissotel/i, "swissotel"],
  [/abraj|makkah hotel & tower/i, "abraj-tower"],
  [/makkah tower/i, "makkah-tower"],
  [/pullman|zamzam/i, "pullman-zamzam"],
  [/voco/i, "voco"],
  [/dar al taqwa/i, "dar-al-taqwa"],
  [/dallah/i, "dallah-taibah"],
  [/hilton/i, "hilton-madinah"],
  [/aqeeq/i, "al-aqeeq"],
];

export function hotelKeys(p: PkgPhotoSource): string[] {
  const text = `${p.hotel || ""} ${p.hotel_short || ""}`;
  const keys: string[] = [];
  for (const [re, key] of HOTEL_RULES) {
    if (re.test(text) && !keys.includes(key)) keys.push(key);
  }
  if (/aziziya/i.test(text) || /aziziya/i.test(p.badge || "")) keys.push("aziziya-exterior");
  return keys;
}

/** The card / hero image: the package's own photo, else its Makkah hotel, else Aziziya, else the Kaaba. */
export function coverFor(p: PkgPhotoSource, photos: PhotoMap): string | null {
  if (p.img) return p.img;
  for (const k of hotelKeys(p)) if (photos[k]) return photos[k];
  return photos["kaaba"] || null;
}

export interface GalleryPhoto {
  url: string;
  label: string;
}

/** Everything worth showing on a detail page: own gallery, hotels, Aziziya, Mina, Arafat, transport. */
export function galleryFor(p: PkgPhotoSource, photos: PhotoMap, labels: Record<string, string>): GalleryPhoto[] {
  const out: GalleryPhoto[] = (p.gallery || []).filter(Boolean).map((url) => ({ url, label: "" }));
  const keys = [...hotelKeys(p)];
  if (keys.includes("aziziya-exterior")) keys.push("aziziya-room", "aziziya-dining", "aziziya-lobby");
  keys.push("mina-camp", "arafat-camp", "luxury-bus", "bullet-train");
  const seen = new Set(out.map((g) => g.url));
  for (const k of keys) {
    const url = photos[k];
    if (url && !seen.has(url)) {
      seen.add(url);
      out.push({ url, label: labels[k] || "" });
    }
  }
  return out;
}

// One fetch shared by every component on the page.
let cache: Promise<{ photos: PhotoMap; labels: Record<string, string> }> | null = null;

function load() {
  if (!cache) {
    cache = fetch("/api/hajj-photos")
      .then((r) => r.json())
      .then((d) => {
        const photos: PhotoMap = {};
        const labels: Record<string, string> = {};
        (d.photos || []).forEach((row: { key: string; label: string; image_url: string | null }) => {
          labels[row.key] = row.label;
          if (row.image_url) photos[row.key] = row.image_url;
        });
        return { photos, labels };
      })
      .catch(() => ({ photos: {}, labels: {} }));
  }
  return cache;
}

export function useHajjPhotos() {
  const [state, setState] = useState<{ photos: PhotoMap; labels: Record<string, string> }>({
    photos: {},
    labels: {},
  });
  useEffect(() => {
    let alive = true;
    load().then((s) => alive && setState(s));
    return () => {
      alive = false;
    };
  }, []);
  return state;
}
