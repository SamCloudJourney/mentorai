import Link from 'next/link';
import { AGENTS } from '../../lib/property/agents';
import { COMPLIANCE_CHECKLIST } from '../../lib/property/compliance';

// Engine overview: the value proposition, the agent line-up, and the UK
// compliance scaffolding — the differentiator is an AI deal-discovery engine,
// not manual portal browsing.
export default function SourcingPage() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">AI Property Deal-Sourcing Engine</h1>
      <p className="text-gray-600 mb-6">
        A deal-discovery engine that searches portals and public data, scores every property on yield, ROI,
        cashflow and equity, and surfaces only the opportunities matching each investor&apos;s exact buying criteria.
      </p>

      <Link
        href="/sourcing/deals"
        className="inline-block bg-[var(--color-teal)] text-white font-medium rounded px-4 py-2 mb-8"
      >
        Run a deal hunt →
      </Link>

      <h2 className="text-xl font-semibold mb-3">The agents</h2>
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {AGENTS.map((a) => (
          <div key={a.id} className="bg-white rounded-lg shadow p-3">
            <h3 className="font-semibold">{a.name}</h3>
            <p className="text-sm text-gray-600">{a.job}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-3">UK compliance (built in from day one)</h2>
      <ul className="space-y-2 mb-4">
        {COMPLIANCE_CHECKLIST.map((c) => (
          <li key={c.id} className="bg-white rounded-lg shadow p-3">
            <div className="font-medium">{c.requirement}</div>
            <div className="text-sm text-gray-600">{c.detail}</div>
            <div className="text-xs text-gray-400 mt-1">Applies: {c.appliesWhen}</div>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-400">
        This is an operational checklist, not legal advice. Confirm specifics with a qualified adviser.
      </p>
    </div>
  );
}
