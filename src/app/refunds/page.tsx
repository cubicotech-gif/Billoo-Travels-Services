"use client";

import PolicyPage from "@/components/PolicyPage";
import { REFUND_POLICY } from "@/lib/data-extended";

export default function RefundsPage() {
  return (
    <PolicyPage
      label="Legal"
      title="Refund"
      highlight="Policy"
      lastUpdated={REFUND_POLICY.lastUpdated}
      sections={REFUND_POLICY.sections}
    />
  );
}
