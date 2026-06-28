// Criteria matching and the 0–100 Deal Score.
//
// `matchCriteria` answers "does this listing fit what the investor asked for?"
// and explains why. `scoreDeal` then ranks how good the opportunity is, blending
// the deterministic finance metrics with market signals (BMV, stale listing,
// price reductions, transport). Both are pure functions so a deal always scores
// the same way given the same inputs.

import type {
  InvestorCriteria,
  PropertyListing,
  DealMetrics,
  MatchResult,
  ScoredDeal,
  RefurbLevel,
} from './types';
import { computeMetrics, DEFAULT_ASSUMPTIONS } from './finance';
import type { FinanceAssumptions } from './finance';

const REFURB_ORDER: RefurbLevel[] = ['none', 'cosmetic', 'moderate', 'heavy', 'development'];

function refurbRank(level: RefurbLevel): number {
  return REFURB_ORDER.indexOf(level);
}

export function matchCriteria(
  listing: PropertyListing,
  criteria: InvestorCriteria,
  metrics: DealMetrics,
): MatchResult {
  const reasons: string[] = [];
  const hardFails: string[] = [];

  // Budget — a hard constraint.
  if (listing.askingPrice < criteria.minPrice || listing.askingPrice > criteria.maxPrice) {
    hardFails.push(
      `Price £${listing.askingPrice.toLocaleString()} outside budget £${criteria.minPrice.toLocaleString()}–£${criteria.maxPrice.toLocaleString()}`,
    );
  } else {
    reasons.push('Within budget');
  }

  // Area — substring match against any requested area / postcode.
  const haystack = `${listing.area ?? ''} ${listing.postcode ?? ''} ${listing.address}`.toLowerCase();
  if (criteria.areas.length > 0) {
    const hit = criteria.areas.some((a) => haystack.includes(a.toLowerCase()));
    if (hit) reasons.push('In target area');
    else hardFails.push('Outside target area');
  }

  // Leasehold tolerance.
  if (!criteria.allowLeasehold && listing.tenure === 'leasehold') {
    hardFails.push('Leasehold excluded by investor');
  }

  // Bedrooms.
  if (criteria.minBedrooms != null && listing.bedrooms != null) {
    if (listing.bedrooms < criteria.minBedrooms) {
      hardFails.push(`Only ${listing.bedrooms} beds, needs ${criteria.minBedrooms}+`);
    } else {
      reasons.push(`${listing.bedrooms} bedrooms`);
    }
  }

  // Refurb tolerance.
  if (criteria.maxRefurb && refurbRank(listing.estimatedRefurb) > refurbRank(criteria.maxRefurb)) {
    hardFails.push(`Needs ${listing.estimatedRefurb} works, beyond ${criteria.maxRefurb}`);
  }

  // Yield / ROI thresholds — treated as hard fails when specified.
  if (criteria.minGrossYield != null) {
    if (metrics.grossYield >= criteria.minGrossYield) {
      reasons.push(`Yield ${(metrics.grossYield * 100).toFixed(1)}%`);
    } else {
      hardFails.push(
        `Yield ${(metrics.grossYield * 100).toFixed(1)}% below target ${(criteria.minGrossYield * 100).toFixed(1)}%`,
      );
    }
  }
  if (criteria.minRoi != null) {
    if (metrics.roi >= criteria.minRoi) reasons.push(`ROI ${(metrics.roi * 100).toFixed(1)}%`);
    else hardFails.push(`ROI ${(metrics.roi * 100).toFixed(1)}% below target`);
  }

  // Distance to station.
  if (
    criteria.maxDistanceToStationKm != null &&
    listing.distanceToStationKm != null &&
    listing.distanceToStationKm > criteria.maxDistanceToStationKm
  ) {
    hardFails.push(`${listing.distanceToStationKm}km to station, over limit`);
  }

  return { matches: hardFails.length === 0, reasons, hardFails };
}

// Surface non-scoring signals an investor cares about.
export function dealFlags(listing: PropertyListing, metrics: DealMetrics): string[] {
  const flags: string[] = [];
  if (metrics.belowMarketValue) flags.push('bmv');
  if ((listing.daysOnMarket ?? 0) >= 120) flags.push('stale-listing');
  if ((listing.priceReducedPct ?? 0) >= 0.05) flags.push('recent-price-reduction');
  if (listing.backOnMarket) flags.push('back-on-market');
  if (listing.source === 'off-market') flags.push('off-market');
  if (metrics.monthlyCashflow > 0 && metrics.roi >= 0.15) flags.push('strong-cashflow');
  return flags;
}

// Map a value onto 0..max using a soft cap.
function band(value: number, target: number, max: number): number {
  if (target <= 0) return 0;
  return Math.max(0, Math.min(max, (value / target) * max));
}

// 0–100 score weighting yield, ROI/cashflow, equity/BMV, signals and risk.
export function scoreDeal(
  listing: PropertyListing,
  criteria: InvestorCriteria,
  assumptions: FinanceAssumptions = DEFAULT_ASSUMPTIONS,
): ScoredDeal {
  const metrics = computeMetrics(listing, assumptions);
  const match = matchCriteria(listing, criteria, metrics);
  const flags = dealFlags(listing, metrics);

  const breakdown: Record<string, number> = {
    // Yield vs an 8% reference, up to 30 pts.
    yield: band(metrics.grossYield, 0.08, 30),
    // ROI vs a 15% reference, up to 25 pts.
    roi: band(metrics.roi, 0.15, 25),
    // Equity / BMV upside vs 15%, up to 20 pts.
    equity: band(metrics.equityPct, 0.15, 20),
    // Positive cashflow, up to 15 pts (capped at £400/mo reference).
    cashflow: band(Math.max(0, metrics.monthlyCashflow), 400, 15),
    // Opportunity signals (stale, reduced, off-market), up to 10 pts.
    signals: Math.min(10, flags.filter((f) => f !== 'strong-cashflow').length * 4),
  };

  let score = Object.values(breakdown).reduce((a, b) => a + b, 0);

  // Hard fails crater the score so they sort to the bottom but stay visible.
  if (!match.matches) score = Math.min(score, 20);

  return {
    listing,
    metrics,
    match,
    score: Math.round(score),
    scoreBreakdown: breakdown,
    flags,
  };
}

// Score and rank a batch, best first.
export function rankDeals(
  listings: PropertyListing[],
  criteria: InvestorCriteria,
  assumptions: FinanceAssumptions = DEFAULT_ASSUMPTIONS,
): ScoredDeal[] {
  return listings
    .map((l) => scoreDeal(l, criteria, assumptions))
    .sort((a, b) => b.score - a.score);
}
