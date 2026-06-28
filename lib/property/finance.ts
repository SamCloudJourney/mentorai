// Deterministic property investment maths.
//
// This is the heart of the engine and the real differentiator: given a
// listing and a set of financing assumptions, it computes yield, cashflow,
// ROI and equity in a way that is reproducible and auditable. No external
// API or AI call is involved — these are plain financial formulas with
// UK-typical defaults that can be overridden per investor or per deal.

import type { PropertyListing, DealMetrics, RefurbLevel } from './types';

export interface FinanceAssumptions {
  depositPct: number; // share of purchase price funded by cash
  mortgageRate: number; // annual interest rate on the loan (interest-only)
  annualRunningCostPct: number; // mgmt, maintenance, insurance, voids as % of rent
  buyingCostsPct: number; // legals, broker, survey as % of price (ex stamp duty)
}

export const DEFAULT_ASSUMPTIONS: FinanceAssumptions = {
  depositPct: 0.25, // 75% LTV BTL mortgage
  mortgageRate: 0.055,
  annualRunningCostPct: 0.28, // ~28% of rent to costs/voids is a common BTL rule of thumb
  buyingCostsPct: 0.03,
};

// Indicative refurbishment cost bands (£). Rough, deliberately conservative
// figures the Deal Scorer can refine with real quotes later.
export const REFURB_COST: Record<RefurbLevel, number> = {
  none: 0,
  cosmetic: 8_000,
  moderate: 25_000,
  heavy: 55_000,
  development: 120_000,
};

// Simplified England/NI second-home / BTL stamp duty (SDLT) including the
// 5% additional-property surcharge across the standard bands. Indicative only.
export function stampDuty(price: number): number {
  const bands: Array<{ upTo: number; rate: number }> = [
    { upTo: 125_000, rate: 0.05 },
    { upTo: 250_000, rate: 0.07 },
    { upTo: 925_000, rate: 0.1 },
    { upTo: 1_500_000, rate: 0.15 },
    { upTo: Infinity, rate: 0.17 },
  ];
  let duty = 0;
  let lower = 0;
  for (const band of bands) {
    if (price <= lower) break;
    const taxable = Math.min(price, band.upTo) - lower;
    duty += taxable * band.rate;
    lower = band.upTo;
  }
  return Math.round(duty);
}

function round(n: number, dp = 2): number {
  const f = 10 ** dp;
  return Math.round(n * f) / f;
}

// Compute the full metric set for a listing. `purchasePrice` defaults to the
// asking price but can be lowered to model an offer / BMV purchase.
export function computeMetrics(
  listing: PropertyListing,
  assumptions: FinanceAssumptions = DEFAULT_ASSUMPTIONS,
  purchasePrice: number = listing.askingPrice,
): DealMetrics {
  const refurbEstimate = REFURB_COST[listing.estimatedRefurb] ?? 0;
  const estimatedValue = listing.estimatedValue ?? purchasePrice;
  const monthlyRent = listing.estimatedMonthlyRent ?? 0;
  const annualRent = monthlyRent * 12;

  // Cash deployed into the deal.
  const deposit = purchasePrice * assumptions.depositPct;
  const buyingCosts = purchasePrice * assumptions.buyingCostsPct;
  const sdlt = stampDuty(purchasePrice);
  const cashInDeal = deposit + refurbEstimate + buyingCosts + sdlt;

  // Financing & running costs.
  const loan = purchasePrice - deposit;
  const annualMortgage = loan * assumptions.mortgageRate; // interest-only
  const annualRunningCosts = annualRent * assumptions.annualRunningCostPct;

  const annualCashflow = annualRent - annualMortgage - annualRunningCosts;
  const monthlyCashflow = annualCashflow / 12;

  const grossYield = purchasePrice > 0 ? annualRent / purchasePrice : 0;
  const netYield = cashInDeal > 0 ? (annualRent - annualRunningCosts) / (purchasePrice + refurbEstimate) : 0;
  const roi = cashInDeal > 0 ? annualCashflow / cashInDeal : 0;
  const equityPct = estimatedValue > 0 ? (estimatedValue - purchasePrice) / estimatedValue : 0;

  return {
    grossYield: round(grossYield, 4),
    netYield: round(netYield, 4),
    monthlyCashflow: round(monthlyCashflow),
    annualCashflow: round(annualCashflow),
    roi: round(roi, 4),
    equityPct: round(equityPct, 4),
    refurbEstimate,
    cashInDeal: round(cashInDeal),
    belowMarketValue: equityPct >= 0.1, // >=10% under estimated value
  };
}
