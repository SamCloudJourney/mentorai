// Domain types for the AI property deal-sourcing engine.
// These describe what an investor wants, what a listing looks like,
// the investment metrics we compute, and the scored deal / deal pack
// we ultimately hand to an investor.

export type Strategy = 'BTL' | 'HMO' | 'FLIP' | 'BRRR' | 'COMMERCIAL';

export type Tenure = 'freehold' | 'leasehold' | 'share_of_freehold' | 'unknown';

export type RefurbLevel = 'none' | 'cosmetic' | 'moderate' | 'heavy' | 'development';

// Everything an investor tells us about their buying box.
// The Investor Agent maintains one of these per investor.
export interface InvestorCriteria {
  id: string;
  investorName: string;
  strategies: Strategy[];
  areas: string[]; // free-text areas / postcodes / towns, e.g. ["Manchester", "M14"]
  minPrice: number;
  maxPrice: number;
  minBedrooms?: number;
  minGrossYield?: number; // e.g. 0.08 for 8%
  minRoi?: number; // return on cash invested, e.g. 0.15 for 15%
  maxRefurb?: RefurbLevel; // most work they'll take on
  allowLeasehold: boolean;
  maxDistanceToStationKm?: number;
  notes?: string;
}

// A normalised listing coming out of any data source (portal, auction,
// off-market lead, public record). Sources map their raw shape onto this.
export interface PropertyListing {
  id: string;
  source: string; // "rightmove" | "zoopla" | "auction" | "off-market" | ...
  url?: string;
  address: string;
  postcode?: string;
  area?: string;
  askingPrice: number;
  bedrooms?: number;
  tenure: Tenure;
  propertyType?: string; // "terraced" | "flat" | "semi-detached" | ...
  estimatedRefurb: RefurbLevel;
  // Optional market signals — the off-market / hunter agents fill these in.
  estimatedValue?: number; // comparable-derived market value
  estimatedMonthlyRent?: number;
  daysOnMarket?: number;
  priceReducedPct?: number; // e.g. 0.1 means cut 10% from original
  backOnMarket?: boolean;
  distanceToStationKm?: number;
  photos?: string[];
  raw?: unknown; // original payload from the source
}

// Deterministic investment metrics computed by the finance engine.
export interface DealMetrics {
  grossYield: number; // annual rent / purchase price
  netYield: number; // (annual rent - running costs) / total cash in
  monthlyCashflow: number; // after mortgage + costs
  annualCashflow: number;
  roi: number; // annual cashflow / cash left in deal
  equityPct: number; // (value - price) / value  (BMV upside)
  refurbEstimate: number; // £ cost of works
  cashInDeal: number; // deposit + refurb + fees
  belowMarketValue: boolean;
}

// Why a listing did or didn't match an investor's criteria.
export interface MatchResult {
  matches: boolean;
  reasons: string[]; // human-readable hits / misses
  hardFails: string[]; // criteria that disqualify outright
}

export interface ScoredDeal {
  listing: PropertyListing;
  metrics: DealMetrics;
  match: MatchResult;
  score: number; // 0–100
  scoreBreakdown: Record<string, number>;
  flags: string[]; // e.g. "stale-listing", "recent-price-reduction", "bmv"
}

// The investor-facing artefact the Pack Builder produces.
export interface DealPack {
  listing: PropertyListing;
  metrics: DealMetrics;
  score: number;
  flags: string[];
  purchasePrice: number;
  estimatedValue: number;
  estimatedMonthlyRent: number;
  refurbEstimate: number;
  exitStrategy: string;
  comparableEvidence: string[];
  risks: string[];
  photos: string[];
  generatedAt: string;
}
