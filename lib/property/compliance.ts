// UK property-sourcing compliance scaffolding.
//
// Operating as a property sourcer in the UK carries real regulatory
// obligations. These constants keep the requirements visible in-product so
// compliance is built in from day one rather than bolted on. This is an
// operational checklist, not legal advice — confirm specifics with a
// qualified adviser.

export interface ComplianceItem {
  id: string;
  requirement: string;
  detail: string;
  appliesWhen: string;
}

export const COMPLIANCE_CHECKLIST: ComplianceItem[] = [
  {
    id: 'aml',
    requirement: 'HMRC Anti-Money-Laundering supervision',
    detail: 'Register for AML supervision as an estate agency / property sourcing business and run customer due diligence.',
    appliesWhen: 'Sourcing property as a business / intermediary.',
  },
  {
    id: 'redress',
    requirement: 'Approved property redress scheme',
    detail: 'Join an approved redress scheme (e.g. The Property Ombudsman or PRS) so clients have recourse.',
    appliesWhen: 'Carrying out estate-agency / sourcing work.',
  },
  {
    id: 'ico',
    requirement: 'ICO registration (data protection)',
    detail: 'Register with the ICO and handle investor and vendor personal data lawfully under UK GDPR.',
    appliesWhen: 'Holding personal data on investors or vendors.',
  },
  {
    id: 'insurance',
    requirement: 'Professional indemnity insurance',
    detail: 'Hold appropriate PI and public liability cover for the sourcing activity.',
    appliesWhen: 'Always recommended.',
  },
  {
    id: 'agreements',
    requirement: 'Written sourcing agreements',
    detail: 'Use clear written terms with each investor covering scope, fees and liabilities.',
    appliesWhen: 'Before charging any sourcing fee.',
  },
  {
    id: 'cdd',
    requirement: 'Client due diligence (KYC)',
    detail: 'Verify identity and source of funds for investors and vendors as part of AML obligations.',
    appliesWhen: 'On every transaction.',
  },
  {
    id: 'fees',
    requirement: 'Clear fee disclosure',
    detail: 'Disclose sourcing fees and any commissions transparently and in advance.',
    appliesWhen: 'On every engagement.',
  },
];

// Convenience: a one-line disclaimer to surface on investor-facing artefacts.
export const ESTIMATE_DISCLAIMER =
  'All figures are AI-generated estimates for initial screening only and are not a formal valuation, survey or financial advice. Verify independently before transacting.';
