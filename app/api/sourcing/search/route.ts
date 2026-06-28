import { NextResponse } from 'next/server';
import type { InvestorCriteria } from '../../../../lib/property/types';
import { aggregateListings } from '../../../../lib/property/sources';
import { rankDeals } from '../../../../lib/property/scoring';

// A permissive default buying box so the route returns something useful even
// when called with a partial body.
const DEFAULT_CRITERIA: InvestorCriteria = {
  id: 'demo',
  investorName: 'Demo Investor',
  strategies: ['BTL', 'BRRR'],
  areas: ['Manchester'],
  minPrice: 100_000,
  maxPrice: 200_000,
  minBedrooms: 2,
  minGrossYield: 0.08,
  allowLeasehold: false,
  maxRefurb: 'moderate',
};

// POST /api/sourcing/search
// Body: { criteria?: Partial<InvestorCriteria> }
// Returns: { criteria, count, deals } — listings scored and ranked best-first.
export async function POST(request: Request) {
  let body: { criteria?: Partial<InvestorCriteria> } = {};
  try {
    body = await request.json();
  } catch {
    // empty / invalid body — fall back to defaults
  }

  const criteria: InvestorCriteria = { ...DEFAULT_CRITERIA, ...(body.criteria ?? {}) };
  const listings = await aggregateListings(criteria);
  const deals = rankDeals(listings, criteria);

  return NextResponse.json({ criteria, count: deals.length, deals });
}
