-- ─────────────────────────────────────────────────────────────────────────────
-- 011 · PACKAGE CODE + ROOM-TYPE PRICING MATRIX
-- Hajj packages (e.g. the Executive Platinum SAR series) carry a PKG code and a
-- price matrix: each room type (Quad/Triple/Double) has a price for one or two
-- hotel tiers (Package A / Package B). We store that matrix as JSONB so the
-- detail page, PDF brochure and social card can render the full table, while
-- price_sar / price_usd continues to hold the "From" (lowest) price for cards
-- and sorting.
--
-- pricing shape:
-- {
--   "tiers": [ { "key": "A", "label": "Dar Al Tawhid Intercontinental" },
--              { "key": "B", "label": "Fairmont Clock Tower" } ],
--   "rooms": [ { "room": "Quad",   "A": null,   "B": 63500 },
--              { "room": "Triple", "A": 94600,  "B": 70200 },
--              { "room": "Double", "A": 118500, "B": 85500 } ]
-- }
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE packages ADD COLUMN IF NOT EXISTS code    TEXT;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS pricing JSONB DEFAULT '{}'::jsonb;
