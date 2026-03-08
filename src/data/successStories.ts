import { SuccessStory } from '../types';

export const successStories: SuccessStory[] = [
  {
    id: 'ss-001',
    industry: 'food_beverage',
    businessSize: 'micro',
    challenge:
      'A family-owned restaurant faced complete closure during a city-wide lockdown with no delivery infrastructure and 3 weeks of cash reserves.',
    strategiesUsed: ['delivery_partnerships', 'cash_reserve_fund', 'cross_training', 'supplier_diversification'],
    outcome:
      'Pivoted to ghost kitchen model within 2 weeks. Partnered with 3 delivery platforms and reduced menu to highest-margin items. Retained 80% of revenue.',
    resilienceGain: 47,
    timeToRecover: 3,
    tags: ['pivot', 'delivery', 'ghost kitchen', 'lockdown'],
    anonymous: true,
  },
  {
    id: 'ss-002',
    industry: 'retail',
    businessSize: 'small',
    challenge:
      'A boutique clothing store lost its primary supplier overnight due to international trade sanctions, leaving $40K in unfulfilled orders.',
    strategiesUsed: ['omnichannel_presence', 'inventory_diversification', 'loyalty_program'],
    outcome:
      'Activated 3 backup suppliers within 72 hours (pre-identified in resilience blueprint). Customer loyalty program kept 90% of clients through transparent communication.',
    resilienceGain: 38,
    timeToRecover: 6,
    tags: ['supply chain', 'backup suppliers', 'customer loyalty', 'trade disruption'],
    anonymous: true,
  },
  {
    id: 'ss-003',
    industry: 'technology',
    businessSize: 'solo',
    challenge:
      'A solo freelance developer had their primary client (70% of revenue) go bankrupt with $15K in unpaid invoices.',
    strategiesUsed: ['client_diversification', 'retainer_contracts', 'knowledge_documentation'],
    outcome:
      'Emergency client pipeline activated from network built during low-risk periods. Escaped the 6-month "valley of death" in just 5 weeks due to pre-positioned relationships.',
    resilienceGain: 55,
    timeToRecover: 5,
    tags: ['client concentration', 'solo founder', 'pipeline', 'bankruptcy'],
    anonymous: true,
  },
  {
    id: 'ss-004',
    industry: 'construction',
    businessSize: 'micro',
    challenge:
      'A 4-person plumbing business faced material cost inflation of 60% mid-contract, threatening $80K in committed fixed-price jobs.',
    strategiesUsed: ['fixed_price_contracts', 'material_hedging', 'liability_insurance'],
    outcome:
      'Price escalation clauses (added during resilience planning) activated legally. Negotiated 40% of materials pre-purchased at locked rates for future projects.',
    resilienceGain: 42,
    timeToRecover: 0,
    tags: ['inflation', 'contracts', 'hedging', 'material costs'],
    anonymous: true,
  },
  {
    id: 'ss-005',
    industry: 'healthcare',
    businessSize: 'small',
    challenge:
      'A physiotherapy clinic lost 3 of 5 therapists to burnout within 6 months, halving capacity during peak demand.',
    strategiesUsed: ['staff_wellness', 'hipaa_compliance', 'telehealth_expansion'],
    outcome:
      'Telehealth expansion (planned 6 months prior) absorbed 35% of demand. Wellness program overhaul reduced further turnover. Hired 2 part-time practitioners within 4 weeks.',
    resilienceGain: 33,
    timeToRecover: 8,
    tags: ['burnout', 'telehealth', 'staff retention', 'capacity'],
    anonymous: true,
  },
  {
    id: 'ss-006',
    industry: 'agriculture',
    businessSize: 'small',
    challenge:
      'A family farm lost 40% of its crop to an unexpected frost event, with no crop insurance and peak loan repayment due.',
    strategiesUsed: ['crop_insurance', 'market_diversification', 'water_conservation'],
    outcome:
      'After this event, farm implemented resilience blueprint. Next season: 3-crop diversification meant only 15% loss in a similar event. Crop insurance covered 80% of losses.',
    resilienceGain: 61,
    timeToRecover: 12,
    tags: ['natural disaster', 'insurance', 'crop diversification', 'farming'],
    anonymous: true,
  },
  {
    id: 'ss-007',
    industry: 'professional_services',
    businessSize: 'solo',
    challenge:
      'A management consultant\'s laptop containing all client IP and unbacked project work was stolen days before a major deliverable.',
    strategiesUsed: ['processes_documentation', 'reputation_management', 'retainer_contracts'],
    outcome:
      'Cloud-first documentation policy (implemented via resilience blueprint) meant 95% recovery within 4 hours. Client delivered on time. Zero reputation damage.',
    resilienceGain: 29,
    timeToRecover: 0,
    tags: ['data loss', 'cloud backup', 'solo consultant', 'IP protection'],
    anonymous: true,
  },
  {
    id: 'ss-008',
    industry: 'manufacturing',
    businessSize: 'micro',
    challenge:
      'A custom furniture maker\'s primary CNC machine broke down with a 6-week lead time for parts, halting all production.',
    strategiesUsed: ['preventive_maintenance', 'supplier_contracts', 'energy_efficiency'],
    outcome:
      'Maintenance log flagged machine stress 3 weeks prior (from resilience monitoring). Pre-ordered critical components. Downtime reduced to 4 days instead of projected 6 weeks.',
    resilienceGain: 51,
    timeToRecover: 1,
    tags: ['equipment failure', 'preventive maintenance', 'manufacturing', 'downtime'],
    anonymous: true,
  },
];

export const getStoriesByIndustry = (industry: string): SuccessStory[] =>
  successStories.filter((s) => s.industry === industry);

export const getStoriesByTag = (tag: string): SuccessStory[] =>
  successStories.filter((s) => s.tags.includes(tag));
