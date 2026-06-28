import React from 'react';
import type { ScoredDeal } from '../lib/property/types';

interface DealCardProps {
  deal: ScoredDeal;
  onBuildPack?: (deal: ScoredDeal) => void;
}

const FLAG_LABELS: Record<string, string> = {
  bmv: 'Below market value',
  'stale-listing': 'Stale listing',
  'recent-price-reduction': 'Price reduced',
  'back-on-market': 'Back on market',
  'off-market': 'Off-market',
  'strong-cashflow': 'Strong cashflow',
};

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

const DealCard: React.FC<DealCardProps> = ({ deal, onBuildPack }) => {
  const { listing, metrics, match, score, flags } = deal;
  const scoreColor = score >= 75 ? 'text-[var(--color-teal)]' : score >= 50 ? 'text-amber-500' : 'text-gray-400';

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold">{listing.address}</h3>
          <p className="text-sm text-gray-500">
            {listing.source} · {listing.bedrooms ?? '?'} bed · {listing.tenure} ·{' '}
            £{listing.askingPrice.toLocaleString()}
          </p>
        </div>
        <div className={`text-3xl font-bold ${scoreColor}`}>{score}</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm my-3">
        <Metric label="Gross yield" value={pct(metrics.grossYield)} />
        <Metric label="ROI" value={pct(metrics.roi)} />
        <Metric label="Cashflow/mo" value={`£${metrics.monthlyCashflow.toLocaleString()}`} />
        <Metric label="Equity" value={pct(metrics.equityPct)} />
      </div>

      {flags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {flags.map((f) => (
            <span key={f} className="text-xs bg-[var(--color-yellow)] text-[var(--color-charcoal)] rounded px-2 py-0.5">
              {FLAG_LABELS[f] ?? f}
            </span>
          ))}
        </div>
      )}

      {!match.matches && (
        <p className="text-xs text-red-500 mb-2">Does not fully match: {match.hardFails.join('; ')}</p>
      )}

      {onBuildPack && (
        <button
          className="text-sm font-medium text-[var(--color-teal)] hover:underline"
          onClick={() => onBuildPack(deal)}
        >
          Build deal pack →
        </button>
      )}
    </div>
  );
};

const Metric: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div className="text-gray-400 text-xs">{label}</div>
    <div className="font-semibold">{value}</div>
  </div>
);

export default DealCard;
