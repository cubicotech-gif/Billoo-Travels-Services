"use client";

import PolicyPage from "@/components/PolicyPage";
import { PRIVACY_POLICY } from "@/lib/data-extended";

export default function PrivacyPage() {
  return (
    <PolicyPage
      label="Legal"
      title="Privacy"
      highlight="Policy"
      lastUpdated={PRIVACY_POLICY.lastUpdated}
      sections={PRIVACY_POLICY.sections}
    />
  );
}
