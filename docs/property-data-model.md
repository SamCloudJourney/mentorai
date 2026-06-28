# Property Sourcing — Data Model

Persistence-ready shape for the deal-sourcing engine. The TypeScript source of
truth is `lib/property/types.ts`; these tables mirror it for Supabase.

## investors
id (PK), name, created_at

## criteria
id (PK), investor_id (FK), strategies (text[]), areas (text[]),
min_price, max_price, min_bedrooms, min_gross_yield, min_roi,
max_refurb (enum), allow_leasehold (bool), max_distance_to_station_km, notes

## listings
id (PK), source, url, address, postcode, area, asking_price, bedrooms,
tenure (enum), property_type, estimated_refurb (enum), estimated_value,
estimated_monthly_rent, days_on_market, price_reduced_pct, back_on_market,
distance_to_station_km, photos (text[]), raw (jsonb), created_at

## deals
id (PK), listing_id (FK), criteria_id (FK), score (0-100),
metrics (jsonb), match (jsonb), flags (text[]), scored_at

## packs
id (PK), deal_id (FK), purchase_price, estimated_value, estimated_monthly_rent,
refurb_estimate, exit_strategy, comparable_evidence (text[]), risks (text[]),
photos (text[]), generated_at

## leads  (off-market)
id (PK), source, public_record_ref, record_date, address, postcode,
status (enum: new/contacted/qualified/dead), notes, created_at

## crm_events
id (PK), investor_id (FK), deal_id (FK nullable), type
(shown/feedback/follow_up), detail (jsonb), created_at

## Enums

- **strategy**: BTL, HMO, FLIP, BRRR, COMMERCIAL
- **tenure**: freehold, leasehold, share_of_freehold, unknown
- **refurb_level**: none, cosmetic, moderate, heavy, development
