# AI Property Deal-Sourcing Engine — Brief

**What it is:** an AI-powered deal-discovery engine that searches portals and
public data, scores every property on the numbers that matter to investors, and
surfaces only the opportunities matching each investor's exact buying criteria.

**The proposition:** not "I'm a property sourcer" but *"I built an AI deal-discovery
engine that searches thousands of properties every day — including public and
off-market opportunities where available — and only sends investors deals matching
their exact buying criteria."* You sell time and deal flow, not property.

## Workflow

```
Investor → buying box → AI workflow searches sources → scores every property
        → builds investor deal pack → investor likes it → introduction
        → deal completes → sourcing fee invoiced
```

## The agents (`lib/property/agents.ts`)

Each agent is single-purpose so it can be tested, swapped and rate-limited
independently:

- **Investor Agent** — maintains each investor's buying criteria.
- **Property Hunter** — searches portals and public datasets.
- **Off-Market Agent** — lawful direct-to-vendor leads from public records.
- **Valuation Agent** — estimates market value from comparable sales.
- **Rental Agent** — estimates achievable rent and demand.
- **Deal Scorer** — ranks every opportunity 0–100.
- **Pack Builder** — generates the investor deal pack.
- **CRM Agent** — tracks investors, conversations and follow-ups.
- **Outreach Agent** — drafts agent/vendor emails for human review (never auto-sends).

## The engine (deterministic core)

The differentiator is reproducible, auditable maths — no AI call needed:

- `lib/property/finance.ts` — yield, cashflow, ROI, equity, stamp duty, refurb
  bands, with UK-typical financing assumptions that can be overridden per deal.
- `lib/property/scoring.ts` — `matchCriteria` (does it fit the buying box?) and
  `scoreDeal` (0–100 blend of yield, ROI, equity/BMV, cashflow and opportunity
  signals such as stale listings, price reductions and off-market origin).
- `lib/property/sources.ts` — pluggable `PropertySource` adapters; a sample
  source ships fixtures so the engine runs end-to-end before real connectors and
  API keys are wired in.
- `lib/property/pack.ts` — assembles the investor deal pack with exit strategy
  and risks derived from the listing's own signals.
- `lib/property/compliance.ts` — UK regulatory checklist surfaced in-product.

## API

- `POST /api/sourcing/search` — `{ criteria? }` → ranked `ScoredDeal[]`.
- `POST /api/sourcing/score` — `{ listing, criteria }` → one `ScoredDeal`.
- `POST /api/sourcing/pack` — `{ listing, criteria }` → investor `DealPack`.

## UI

- `/sourcing` — engine overview, agent line-up, compliance checklist.
- `/sourcing/deals` — investor criteria intake + ranked deal feed + deal pack view.

## Revenue model

- Sourcing fee per completed purchase.
- Retainer for priority access to new deals.
- Success fees on larger commercial transactions.
- Subscription for premium deal alerts.

## UK compliance (built in from day one)

HMRC AML supervision, approved redress scheme, ICO registration, professional
indemnity insurance, written sourcing agreements, client due diligence (KYC),
and clear fee disclosure. See `lib/property/compliance.ts`. This is an
operational checklist, not legal advice.
