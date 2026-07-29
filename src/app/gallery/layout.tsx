import type { Metadata } from "next";
import { SITE } from "@/lib/seo";

const TITLE = `Gallery — ${SITE.shortName}`;
const DESCRIPTION = `A visual journey through Makkah, Madinah and the sacred pilgrimages arranged by ${SITE.shortName}.`;
const URL = `${SITE.url}/gallery`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
  alternates: { canonical: URL },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
