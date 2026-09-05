-- ─────────────────────────────────────────────────────────────────────────────
-- HAJJ 2027 · SAR PRICE LIST — CORRECTION AGAINST THE PRINTED BROCHURE
--
-- Source of truth: "Hajj Platinum — Makkah and Medinah Series (Non-Aziziya,
-- In Front of Haram)", brochure pages 14-23 + services page 27.
--
-- What this fixes, for the ten packages that brochure covers (UB 001-UB 010):
--   • every room price, which was between 3% and 28% above the brochure
--   • Quad prices under Package A that were showing as "not available"
--   • the Sharing Room rate the Makkah Tower packages offer but the site omitted
--   • the "from" price on each card, recomputed as the lowest quoted rate
--   • UB 008 and UB 010, which carried each other's package code
--   • UB 001, labelled 14 days against its own 13-day itinerary
-- And on all 23 SAR rows:
--   • Qurbani, quoted at SAR 720 where the brochure says approx SAR 750
--   • the room-retention note, dated 25-28 May instead of 14-18 May
--     (8-12 Zil Hajj 1449 falls on 14-18 May 2027)
--   • the Kaaba view supplement, absent from the add-ons
--
-- Safe to run more than once: every statement is idempotent and scoped to
-- currency = 'SAR', so the USD price list is untouched.
-- ─────────────────────────────────────────────────────────────────────────────

BEGIN;

-- ── 1 · UB 008 and UB 010 carry each other's code ────────────────────────────
-- Re-keyed by the itinerary each row actually holds, so this settles correctly
-- however many times it runs.
UPDATE packages SET code = 'UB 010'
 WHERE currency = 'SAR' AND hotel LIKE 'Makkah Tower%' AND hotel NOT LIKE '%Aziziya%'
   AND dates = '10 May – 19 May 2027';

UPDATE packages SET code = 'UB 008'
 WHERE currency = 'SAR' AND hotel LIKE 'Makkah Tower%' AND hotel NOT LIKE '%Aziziya%'
   AND dates = '7 May – 19 May 2027';

-- ── 2 · Room prices, "from" price and duration ───────────────────────────────

-- UB 001 · Intercontinental / Fairmont — 13-Day (Madinah First)
--   Quad NA/59500, Triple 82000/66000, Double 98000/76000
UPDATE packages SET
       pricing   = '{"tiers": [{"key": "A", "label": "Intercontinental"}, {"key": "B", "label": "Fairmont"}], "rooms": [{"room": "Quad", "A": null, "B": 59500}, {"room": "Triple", "A": 82000, "B": 66000}, {"room": "Double", "A": 98000, "B": 76000}]}'::jsonb,
       price_sar = 59500,
       nights    = '13 Days',
       title     = 'Intercontinental / Fairmont — 13-Day (Madinah First)'
 WHERE currency = 'SAR' AND code = 'UB 001';

-- UB 002 · Intercontinental / Fairmont — 14-Day (Makkah First)
--   Quad NA/59500, Triple 82000/66000, Double 98000/76000
UPDATE packages SET
       pricing   = '{"tiers": [{"key": "A", "label": "Intercontinental"}, {"key": "B", "label": "Fairmont"}], "rooms": [{"room": "Quad", "A": null, "B": 59500}, {"room": "Triple", "A": 82000, "B": 66000}, {"room": "Double", "A": 98000, "B": 76000}]}'::jsonb,
       price_sar = 59500,
       nights    = '14 Days',
       title     = 'Intercontinental / Fairmont — 14-Day (Makkah First)'
 WHERE currency = 'SAR' AND code = 'UB 002';

-- UB 003 · Intercontinental / Fairmont — 10-Day (Madinah First)
--   Quad NA/58000, Triple 79000/63000, Double 95000/73000
UPDATE packages SET
       pricing   = '{"tiers": [{"key": "A", "label": "Intercontinental"}, {"key": "B", "label": "Fairmont"}], "rooms": [{"room": "Quad", "A": null, "B": 58000}, {"room": "Triple", "A": 79000, "B": 63000}, {"room": "Double", "A": 95000, "B": 73000}]}'::jsonb,
       price_sar = 58000,
       nights    = '10 Days',
       title     = 'Intercontinental / Fairmont — 10-Day (Madinah First)'
 WHERE currency = 'SAR' AND code = 'UB 003';

-- UB 004 · Swissotel — 14-Day (Madinah First)
--   Quad 54500/51900, Triple 59500/56900, Double 70500/66900
UPDATE packages SET
       pricing   = '{"tiers": [{"key": "A", "label": "Dar Al Taqwa / Hilton (Madinah)"}, {"key": "B", "label": "Taibah Front (Madinah)"}], "rooms": [{"room": "Quad", "A": 54500, "B": 51900}, {"room": "Triple", "A": 59500, "B": 56900}, {"room": "Double", "A": 70500, "B": 66900}]}'::jsonb,
       price_sar = 51900,
       nights    = '14 Days',
       title     = 'Swissotel — 14-Day (Madinah First)'
 WHERE currency = 'SAR' AND code = 'UB 004';

-- UB 005 · Swissotel — 14-Day (Makkah First)
--   Quad 54500/51900, Triple 59500/56900, Double 70500/66900
UPDATE packages SET
       pricing   = '{"tiers": [{"key": "A", "label": "Dar Al Taqwa / Hilton (Madinah)"}, {"key": "B", "label": "Taibah Front (Madinah)"}], "rooms": [{"room": "Quad", "A": 54500, "B": 51900}, {"room": "Triple", "A": 59500, "B": 56900}, {"room": "Double", "A": 70500, "B": 66900}]}'::jsonb,
       price_sar = 51900,
       nights    = '14 Days',
       title     = 'Swissotel — 14-Day (Makkah First)'
 WHERE currency = 'SAR' AND code = 'UB 005';

-- UB 006 · Swissotel — 10-Day (Madinah First)
--   Quad 56000/50500, Triple 57500/55500, Double 67500/65500
UPDATE packages SET
       pricing   = '{"tiers": [{"key": "A", "label": "Dar Al Taqwa (Madinah)"}, {"key": "B", "label": "Taibah Front (Madinah)"}], "rooms": [{"room": "Quad", "A": 56000, "B": 50500}, {"room": "Triple", "A": 57500, "B": 55500}, {"room": "Double", "A": 67500, "B": 65500}]}'::jsonb,
       price_sar = 50500,
       nights    = '10 Days',
       title     = 'Swissotel — 10-Day (Madinah First)'
 WHERE currency = 'SAR' AND code = 'UB 006';

-- UB 007 · Swissotel — 9-Day (Makkah First)
--   Quad 50500, Triple 55500, Double 65500
UPDATE packages SET
       pricing   = '{"tiers": [{"key": "A", "label": "Swissotel"}], "rooms": [{"room": "Quad", "A": 50500}, {"room": "Triple", "A": 55500}, {"room": "Double", "A": 65500}]}'::jsonb,
       price_sar = 50500,
       nights    = '9 Days',
       title     = 'Swissotel — 9-Day (Makkah First)'
 WHERE currency = 'SAR' AND code = 'UB 007';

-- UB 010 · Makkah Tower — 10-Day (Madinah First)
--   Sharing Room NA/46500, Quad 49500/46500, Triple 53500/52500, Double 63500/61500
UPDATE packages SET
       pricing   = '{"tiers": [{"key": "A", "label": "Dar Al Taqwa (Madinah)"}, {"key": "B", "label": "Taibah Front (Madinah)"}], "rooms": [{"room": "Sharing Room", "A": null, "B": 46500}, {"room": "Quad", "A": 49500, "B": 46500}, {"room": "Triple", "A": 53500, "B": 52500}, {"room": "Double", "A": 63500, "B": 61500}]}'::jsonb,
       price_sar = 46500,
       nights    = '10 Days',
       title     = 'Makkah Tower — 10-Day (Madinah First)'
 WHERE currency = 'SAR' AND code = 'UB 010';

-- UB 009 · Makkah Tower — 14-Day (Makkah First)
--   Sharing Room NA/47500, Quad 50500/47500, Triple 55500/53500, Double 66500/63500
UPDATE packages SET
       pricing   = '{"tiers": [{"key": "A", "label": "Dar Al Taqwa / Hilton (Madinah)"}, {"key": "B", "label": "Taibah Front (Madinah)"}], "rooms": [{"room": "Sharing Room", "A": null, "B": 47500}, {"room": "Quad", "A": 50500, "B": 47500}, {"room": "Triple", "A": 55500, "B": 53500}, {"room": "Double", "A": 66500, "B": 63500}]}'::jsonb,
       price_sar = 47500,
       nights    = '14 Days',
       title     = 'Makkah Tower — 14-Day (Makkah First)'
 WHERE currency = 'SAR' AND code = 'UB 009';

-- UB 008 · Makkah Tower — 14-Day (Madinah First)
--   Sharing Room NA/47500, Quad 50500/47500, Triple 55500/53500, Double 66500/63500
UPDATE packages SET
       pricing   = '{"tiers": [{"key": "A", "label": "Dar Al Taqwa / Hilton (Madinah)"}, {"key": "B", "label": "Taibah Front (Madinah)"}], "rooms": [{"room": "Sharing Room", "A": null, "B": 47500}, {"room": "Quad", "A": 50500, "B": 47500}, {"room": "Triple", "A": 55500, "B": 53500}, {"room": "Double", "A": 66500, "B": 63500}]}'::jsonb,
       price_sar = 47500,
       nights    = '14 Days',
       title     = 'Makkah Tower — 14-Day (Madinah First)'
 WHERE currency = 'SAR' AND code = 'UB 008';

-- ── 3 · Figures that were wrong on every SAR row ─────────────────────────────
UPDATE packages
   SET not_included = array_replace(not_included,
         'Qurbani (approx SAR 720 per person)',
         'Qurbani (approx SAR 750 per person)')
 WHERE currency = 'SAR'
   AND 'Qurbani (approx SAR 720 per person)' = ANY(not_included);

-- 8-12 Zil Hajj 1449 is 14-18 May 2027, not 25-28 May.
UPDATE packages
   SET notes = array_replace(notes,
         'Rooms are retained 25–28 May (the 5 days of Hajj) in the Makkah accommodation.',
         'Rooms are retained 14–18 May (8–12 Zil Hajj, the 5 days of Hajj) in the Makkah accommodation.')
 WHERE currency = 'SAR';

UPDATE packages
   SET notes = array_replace(notes,
         'Rooms are retained 25–28 May (the 5 days of Hajj) in the Aziziya accommodation.',
         'Rooms are retained 14–18 May (8–12 Zil Hajj, the 5 days of Hajj) in the Aziziya accommodation.')
 WHERE currency = 'SAR';

-- ── 4 · Kaaba view supplement, on the packages whose brochure page states it ──
UPDATE packages
   SET add_ons = add_ons || ARRAY['Kaaba view supplement (+ SAR 8,000 per person)']
 WHERE currency = 'SAR'
   AND code IN ('UB 003', 'UB 004', 'UB 005', 'UB 006', 'UB 007', 'UB 010', 'UB 009', 'UB 008')
   AND NOT ('Kaaba view supplement (+ SAR 8,000 per person)' = ANY(add_ons));

COMMIT;

-- ── Check the result ─────────────────────────────────────────────────────────
-- SELECT code, nights, dates, price_sar, pricing->'rooms' AS rooms
--   FROM packages WHERE currency = 'SAR' ORDER BY code;
