'use client';

import { useState } from 'react';
import DealCard from '../../../components/DealCard';
import type { ScoredDeal, DealPack, InvestorCriteria } from '../../../lib/property/types';

// Investor criteria intake + ranked deal feed. Submitting the buying box runs
// the hunt (POST /api/sourcing/search); each card can generate a deal pack.
export default function DealsPage() {
  const [criteria, setCriteria] = useState<Partial<InvestorCriteria>>({
    investorName: 'Demo Investor',
    areas: ['Manchester'],
    minPrice: 100_000,
    maxPrice: 200_000,
    minBedrooms: 2,
    minGrossYield: 0.08,
    allowLeasehold: false,
    maxRefurb: 'moderate',
  });
  const [deals, setDeals] = useState<ScoredDeal[]>([]);
  const [pack, setPack] = useState<DealPack | null>(null);
  const [loading, setLoading] = useState(false);

  async function runHunt() {
    setLoading(true);
    setPack(null);
    try {
      const res = await fetch('/api/sourcing/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ criteria }),
      });
      const data = await res.json();
      setDeals(data.deals ?? []);
    } finally {
      setLoading(false);
    }
  }

  async function buildPack(deal: ScoredDeal) {
    const res = await fetch('/api/sourcing/pack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listing: deal.listing, criteria }),
    });
    const data = await res.json();
    setPack(data.pack ?? null);
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Deal hunt</h1>

      <div className="bg-white rounded-lg shadow p-4 mb-6 grid sm:grid-cols-2 gap-3">
        <Field label="Area">
          <input
            className="border rounded px-2 py-1 w-full"
            value={(criteria.areas ?? []).join(', ')}
            onChange={(e) => setCriteria({ ...criteria, areas: e.target.value.split(',').map((s) => s.trim()) })}
          />
        </Field>
        <Field label="Min beds">
          <input
            type="number"
            className="border rounded px-2 py-1 w-full"
            value={criteria.minBedrooms ?? 0}
            onChange={(e) => setCriteria({ ...criteria, minBedrooms: Number(e.target.value) })}
          />
        </Field>
        <Field label="Min price (£)">
          <input
            type="number"
            className="border rounded px-2 py-1 w-full"
            value={criteria.minPrice ?? 0}
            onChange={(e) => setCriteria({ ...criteria, minPrice: Number(e.target.value) })}
          />
        </Field>
        <Field label="Max price (£)">
          <input
            type="number"
            className="border rounded px-2 py-1 w-full"
            value={criteria.maxPrice ?? 0}
            onChange={(e) => setCriteria({ ...criteria, maxPrice: Number(e.target.value) })}
          />
        </Field>
        <Field label="Min gross yield (%)">
          <input
            type="number"
            className="border rounded px-2 py-1 w-full"
            value={((criteria.minGrossYield ?? 0) * 100).toString()}
            onChange={(e) => setCriteria({ ...criteria, minGrossYield: Number(e.target.value) / 100 })}
          />
        </Field>
        <Field label="Allow leasehold">
          <input
            type="checkbox"
            checked={criteria.allowLeasehold ?? false}
            onChange={(e) => setCriteria({ ...criteria, allowLeasehold: e.target.checked })}
          />
        </Field>
      </div>

      <button
        className="bg-[var(--color-teal)] text-white font-medium rounded px-4 py-2 mb-6"
        onClick={runHunt}
        disabled={loading}
      >
        {loading ? 'Hunting…' : 'Run deal hunt'}
      </button>

      {deals.map((deal) => (
        <DealCard key={deal.listing.id} deal={deal} onBuildPack={buildPack} />
      ))}

      {deals.length === 0 && !loading && (
        <p className="text-gray-400">No deals yet — set your criteria and run a hunt.</p>
      )}

      {pack && <DealPackView pack={pack} />}
    </div>
  );
}

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="text-sm">
    <span className="block text-gray-500 mb-1">{label}</span>
    {children}
  </label>
);

const DealPackView: React.FC<{ pack: DealPack }> = ({ pack }) => (
  <div className="bg-white rounded-lg shadow p-4 mt-6 border-2 border-[var(--color-teal)]">
    <h2 className="text-xl font-bold mb-2">Deal Pack — {pack.listing.address}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm mb-3">
      <PackRow label="Purchase price" value={`£${pack.purchasePrice.toLocaleString()}`} />
      <PackRow label="Estimated value" value={`£${pack.estimatedValue.toLocaleString()}`} />
      <PackRow label="Estimated rent/mo" value={`£${pack.estimatedMonthlyRent.toLocaleString()}`} />
      <PackRow label="Refurb estimate" value={`£${pack.refurbEstimate.toLocaleString()}`} />
      <PackRow label="Gross yield" value={`${(pack.metrics.grossYield * 100).toFixed(1)}%`} />
      <PackRow label="ROI" value={`${(pack.metrics.roi * 100).toFixed(1)}%`} />
    </div>
    <p className="text-sm mb-2">
      <span className="font-semibold">Exit strategy:</span> {pack.exitStrategy}
    </p>
    <div className="text-sm mb-2">
      <span className="font-semibold">Risks:</span>
      <ul className="list-disc list-inside text-gray-600">
        {pack.risks.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
    <p className="text-xs text-gray-400 mt-2">Generated {pack.generatedAt}</p>
  </div>
);

const PackRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div className="text-gray-400 text-xs">{label}</div>
    <div className="font-semibold">{value}</div>
  </div>
);
