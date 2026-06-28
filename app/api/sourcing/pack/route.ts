import { NextResponse } from 'next/server';
import type { InvestorCriteria, PropertyListing } from '../../../../lib/property/types';
import { scoreDeal } from '../../../../lib/property/scoring';
import { buildDealPack } from '../../../../lib/property/pack';
import { ESTIMATE_DISCLAIMER } from '../../../../lib/property/compliance';

// POST /api/sourcing/pack
// Body: { listing: PropertyListing, criteria: InvestorCriteria }
// Returns: { pack, disclaimer } — an investor-ready deal pack.
//
// generatedAt is passed in by the route (Date is available in the request
// handler, unlike in the pure lib functions which stay deterministic).
export async function POST(request: Request) {
  let body: { listing?: PropertyListing; criteria?: InvestorCriteria };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.listing || !body.criteria) {
    return NextResponse.json({ error: 'Both listing and criteria are required' }, { status: 400 });
  }

  const deal = scoreDeal(body.listing, body.criteria);
  const pack = buildDealPack(deal, new Date().toISOString());

  return NextResponse.json({ pack, disclaimer: ESTIMATE_DISCLAIMER });
}
