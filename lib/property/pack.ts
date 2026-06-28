// Deal Pack builder — turns a scored deal into the investor-facing artefact.
//
// Keeps every estimate clearly an estimate and derives a strategy-appropriate
// exit narrative and risk list from the listing's own signals.

import type { ScoredDeal, DealPack, PropertyListing, DealMetrics } from './types';

function exitStrategy(listing: PropertyListing, metrics: DealMetrics): string {
  const heavyWork = listing.estimatedRefurb === 'heavy' || listing.estimatedRefurb === 'development';
  if (metrics.belowMarketValue && heavyWork) {
    return 'BRRR: buy below value, refurbish, refinance at the higher valuation to recycle the deposit, then hold and let.';
  }
  if (metrics.belowMarketValue) {
    return 'Buy below market value and either hold for cashflow or sell to bank the equity on completion of light works.';
  }
  if (metrics.monthlyCashflow > 0) {
    return 'Standard buy-to-let hold for monthly cashflow with long-term capital growth.';
  }
  return 'Hold for capital growth; revisit financing as rates move to improve cashflow.';
}

function risks(listing: PropertyListing, metrics: DealMetrics): string[] {
  const out: string[] = [];
  if (listing.tenure === 'leasehold') out.push('Leasehold — check lease length, ground rent and service charges.');
  if (listing.estimatedRefurb === 'heavy' || listing.estimatedRefurb === 'development') {
    out.push('Significant works — refurb cost and timeline could overrun; get builder quotes.');
  }
  if (metrics.monthlyCashflow <= 0) out.push('Thin or negative cashflow at modelled rate — sensitive to interest rises.');
  if (listing.estimatedValue == null) out.push('No independent valuation yet — equity figure is indicative.');
  if (listing.estimatedMonthlyRent == null) out.push('Rent estimate unconfirmed — verify with local letting agents.');
  if (listing.source === 'auction') out.push('Auction purchase — non-refundable deposit and tight completion timescale.');
  if (out.length === 0) out.push('No major flags identified; standard due diligence still required.');
  return out;
}

export function buildDealPack(deal: ScoredDeal, generatedAt: string): DealPack {
  const { listing, metrics, score, flags } = deal;
  return {
    listing,
    metrics,
    score,
    flags,
    purchasePrice: listing.askingPrice,
    estimatedValue: listing.estimatedValue ?? listing.askingPrice,
    estimatedMonthlyRent: listing.estimatedMonthlyRent ?? 0,
    refurbEstimate: metrics.refurbEstimate,
    exitStrategy: exitStrategy(listing, metrics),
    comparableEvidence: [
      `Estimated value £${(listing.estimatedValue ?? listing.askingPrice).toLocaleString()} vs asking £${listing.askingPrice.toLocaleString()}.`,
      'Comparable sales/lettings to be attached by the Valuation and Rental agents.',
    ],
    risks: risks(listing, metrics),
    photos: listing.photos ?? [],
    generatedAt,
  };
}
