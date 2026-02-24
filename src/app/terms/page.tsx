"use client";

import PolicyPage from "@/components/PolicyPage";
import { TERMS_OF_SERVICE } from "@/lib/data-extended";

export default function TermsPage() {
  return (
    <PolicyPage
      label="Legal"
      title="Terms of"
      highlight="Service"
      lastUpdated={TERMS_OF_SERVICE.lastUpdated}
      sections={TERMS_OF_SERVICE.sections}
    />
  );
}
