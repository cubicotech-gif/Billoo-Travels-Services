-- ─────────────────────────────────────────────────────────────────────────────
-- BILLOO TRAVELS — ACCREDITATION STRIP (homepage trust/partner logos)
-- Extends the homepage_content singleton. Edit from Admin → Homepage.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE homepage_content ADD COLUMN IF NOT EXISTS accred_enabled BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE homepage_content ADD COLUMN IF NOT EXISTS accred_label   TEXT    NOT NULL DEFAULT 'Accredited & Trusted';
ALTER TABLE homepage_content ADD COLUMN IF NOT EXISTS accreditations JSONB   NOT NULL DEFAULT '[]'::jsonb;

-- Seed example accreditations (name-only — upload real logos from Admin → Homepage).
UPDATE homepage_content
SET accreditations = '[
  {"name": "IATA Accredited", "logo": ""},
  {"name": "Nusuk Authorised", "logo": ""},
  {"name": "Ministry of Hajj & Umrah", "logo": ""},
  {"name": "Saudi Tourism Partner", "logo": ""},
  {"name": "DTS / TDAP Registered", "logo": ""}
]'::jsonb
WHERE id = 1 AND (accreditations IS NULL OR accreditations = '[]'::jsonb);
