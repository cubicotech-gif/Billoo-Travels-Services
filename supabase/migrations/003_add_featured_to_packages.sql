-- ─────────────────────────────────────────────────────────────────────────────
-- BILLOO TRAVELS — Add featured column to packages
-- Run this in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE packages ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
