// Data-source adapter layer.
//
// Every source (Rightmove, Zoopla, OnTheMarket, auctions, off-market public
// records, ...) implements the same `PropertySource` interface and maps its
// raw payload onto the normalised PropertyListing shape. Real connectors need
// API keys / lawful access and must respect each site's terms; until those are
// wired in, a sample source provides realistic fixtures so the scoring engine,
// API routes and UI work end-to-end.

import type { InvestorCriteria, PropertyListing } from './types';

export interface PropertySource {
  name: string;
  // Return listings roughly matching the criteria. Heavy filtering/scoring
  // happens downstream — a source just needs to fetch and normalise.
  search(criteria: InvestorCriteria): Promise<PropertyListing[]>;
}

// A handful of realistic Manchester fixtures spanning the signals the engine
// reacts to: BMV, stale listings, price reductions, off-market, leasehold.
const SAMPLE_LISTINGS: PropertyListing[] = [
  {
    id: 'rm-1001',
    source: 'rightmove',
    url: 'https://example.com/rm-1001',
    address: '14 Brideoak Street, Manchester',
    postcode: 'M8 0HY',
    area: 'Manchester',
    askingPrice: 150_000,
    bedrooms: 3,
    tenure: 'freehold',
    propertyType: 'terraced',
    estimatedRefurb: 'cosmetic',
    estimatedValue: 180_000,
    estimatedMonthlyRent: 1_150,
    daysOnMarket: 138,
    priceReducedPct: 0.06,
    distanceToStationKm: 0.7,
    photos: ['https://example.com/rm-1001/1.jpg'],
  },
  {
    id: 'zp-2002',
    source: 'zoopla',
    url: 'https://example.com/zp-2002',
    address: '8 Heald Place, Rusholme, Manchester',
    postcode: 'M14 5QA',
    area: 'Manchester',
    askingPrice: 175_000,
    bedrooms: 4,
    tenure: 'freehold',
    propertyType: 'terraced',
    estimatedRefurb: 'moderate',
    estimatedValue: 205_000,
    estimatedMonthlyRent: 1_600,
    daysOnMarket: 41,
    distanceToStationKm: 1.2,
    photos: ['https://example.com/zp-2002/1.jpg'],
  },
  {
    id: 'otm-3003',
    source: 'onthemarket',
    url: 'https://example.com/otm-3003',
    address: '22 Wilbraham Road, Fallowfield, Manchester',
    postcode: 'M14 6FS',
    area: 'Manchester',
    askingPrice: 168_000,
    bedrooms: 2,
    tenure: 'leasehold',
    propertyType: 'flat',
    estimatedRefurb: 'none',
    estimatedValue: 172_000,
    estimatedMonthlyRent: 950,
    daysOnMarket: 23,
    distanceToStationKm: 0.5,
    photos: [],
  },
  {
    id: 'auc-4004',
    source: 'auction',
    url: 'https://example.com/auc-4004',
    address: '5 Clarendon Road, Whalley Range, Manchester',
    postcode: 'M16 8LD',
    area: 'Manchester',
    askingPrice: 120_000,
    bedrooms: 3,
    tenure: 'freehold',
    propertyType: 'semi-detached',
    estimatedRefurb: 'heavy',
    estimatedValue: 195_000,
    estimatedMonthlyRent: 1_250,
    daysOnMarket: 9,
    distanceToStationKm: 1.8,
    photos: [],
  },
  {
    id: 'off-5005',
    source: 'off-market',
    address: '31 Stovell Avenue, Longsight, Manchester',
    postcode: 'M12 4NN',
    area: 'Manchester',
    askingPrice: 135_000,
    bedrooms: 3,
    tenure: 'freehold',
    propertyType: 'terraced',
    estimatedRefurb: 'cosmetic',
    estimatedValue: 165_000,
    estimatedMonthlyRent: 1_100,
    backOnMarket: true,
    distanceToStationKm: 0.9,
    photos: [],
  },
];

export class SampleSource implements PropertySource {
  name = 'sample';
  async search(criteria: InvestorCriteria): Promise<PropertyListing[]> {
    // Light pre-filter on area only; the scorer does the real work.
    if (criteria.areas.length === 0) return SAMPLE_LISTINGS;
    const wanted = criteria.areas.map((a) => a.toLowerCase());
    return SAMPLE_LISTINGS.filter((l) => {
      const hay = `${l.area ?? ''} ${l.postcode ?? ''} ${l.address}`.toLowerCase();
      return wanted.some((w) => hay.includes(w));
    });
  }
}

// The default registry. Swap/extend with real connectors as they are built.
export const DEFAULT_SOURCES: PropertySource[] = [new SampleSource()];

// Fan out across every source and merge results, de-duplicating by id.
export async function aggregateListings(
  criteria: InvestorCriteria,
  sources: PropertySource[] = DEFAULT_SOURCES,
): Promise<PropertyListing[]> {
  const batches = await Promise.all(sources.map((s) => s.search(criteria)));
  const byId = new Map<string, PropertyListing>();
  for (const batch of batches) {
    for (const listing of batch) {
      if (!byId.has(listing.id)) byId.set(listing.id, listing);
    }
  }
  return Array.from(byId.values());
}
