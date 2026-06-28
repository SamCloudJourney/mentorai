import { NextResponse } from 'next/server';
import type { InvestorCriteria, PropertyListing } from '../../../../lib/property/types';
import { scoreDeal } from '../../../../lib/property/scoring';

// POST /api/sourcing/score
// Body: { listing: PropertyListing, criteria: InvestorCriteria }
// Returns: a single ScoredDeal (metrics, match, score, breakdown, flags).
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
  return NextResponse.json({ deal });
}
