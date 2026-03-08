import { RiskFactor, Strategy, RiskCategory } from '../types';
import { calculateRiskScore } from './riskCalculator';

const strategyLibrary: Strategy[] = [
  // Financial strategies
  {
    id: 'strat-cash-reserve',
    title: 'Emergency Cash Reserve Fund',
    description: 'Build a dedicated cash reserve covering 3-6 months of operating expenses.',
    category: 'financial',
    priority: 'immediate',
    effort: 'medium',
    impact: 'high',
    timelineWeeks: 12,
    actions: [
      'Calculate monthly burn rate precisely',
      'Open separate high-yield savings account',
      'Auto-transfer 10% of monthly revenue',
      'Set drawdown rules (only for true emergencies)',
    ],
    relatedRiskIds: [],
    resources: ['Business savings account', 'Accounting software'],
    kpis: ['Months of runway funded', 'Reserve growth rate'],
  },
  {
    id: 'strat-revenue-diversification',
    title: 'Revenue Stream Diversification',
    description: 'Develop multiple income streams so no single source exceeds 40% of revenue.',
    category: 'financial',
    priority: 'short_term',
    effort: 'high',
    impact: 'high',
    timelineWeeks: 24,
    actions: [
      'Audit current revenue concentration',
      'Identify 2-3 adjacent service/product opportunities',
      'Pilot lowest-effort new stream first',
      'Set 40% max concentration target per stream',
    ],
    relatedRiskIds: [],
    resources: ['Market research', 'Customer interviews'],
    kpis: ['Revenue per stream %', 'Total active revenue streams'],
  },
  // Operational
  {
    id: 'strat-business-continuity',
    title: 'Business Continuity Plan',
    description: 'Document procedures to maintain operations during disruptions.',
    category: 'operational',
    priority: 'immediate',
    effort: 'medium',
    impact: 'high',
    timelineWeeks: 4,
    actions: [
      'Map all critical business processes',
      'Identify single points of failure',
      'Write step-by-step continuity procedures',
      'Test plan with tabletop exercise quarterly',
    ],
    relatedRiskIds: [],
    resources: ['Process documentation tool', 'Staff time'],
    kpis: ['Processes documented', 'Test exercises completed per year'],
  },
  {
    id: 'strat-cross-training',
    title: 'Staff Cross-Training Program',
    description: 'Ensure every critical role has at least one backup-trained team member.',
    category: 'talent',
    priority: 'short_term',
    effort: 'medium',
    impact: 'medium',
    timelineWeeks: 8,
    actions: [
      'Identify roles with single-person dependency',
      'Pair primary and backup for each critical role',
      'Schedule monthly knowledge transfer sessions',
      'Document all role-specific procedures',
    ],
    relatedRiskIds: [],
    resources: ['Training materials', 'Staff time'],
    kpis: ['% roles with trained backup', 'Documentation completeness'],
  },
  // Supply chain
  {
    id: 'strat-supplier-backup',
    title: 'Dual Supplier Strategy',
    description: 'Identify and pre-qualify backup suppliers for all critical inputs.',
    category: 'supply_chain',
    priority: 'immediate',
    effort: 'low',
    impact: 'high',
    timelineWeeks: 3,
    actions: [
      'List all critical suppliers and inputs',
      'Research 2 alternative sources per input',
      'Request quotes and qualify alternatives',
      'Maintain warm relationship with backups',
    ],
    relatedRiskIds: [],
    resources: ['Supplier research time', 'Contracts'],
    kpis: ['% critical inputs with backup supplier', 'Time to switch suppliers'],
  },
  // Cyber
  {
    id: 'strat-cybersecurity-basics',
    title: 'Cybersecurity Hardening',
    description: 'Implement fundamental cybersecurity practices to prevent and recover from attacks.',
    category: 'cyber',
    priority: 'immediate',
    effort: 'low',
    impact: 'high',
    timelineWeeks: 2,
    actions: [
      'Enable MFA on all critical accounts',
      'Set up automated offsite backups (3-2-1 rule)',
      'Train staff on phishing recognition',
      'Create incident response checklist',
    ],
    relatedRiskIds: [],
    resources: ['Password manager', 'Cloud backup service', 'Training'],
    kpis: ['% accounts with MFA', 'Backup restore test frequency'],
  },
  // Market
  {
    id: 'strat-customer-retention',
    title: 'Customer Loyalty & Retention System',
    description: 'Build systems that keep customers through market downturns.',
    category: 'market',
    priority: 'short_term',
    effort: 'medium',
    impact: 'high',
    timelineWeeks: 8,
    actions: [
      'Implement customer loyalty/rewards program',
      'Create regular communication cadence',
      'Develop "recession-proof" service tier',
      'Build community around your brand',
    ],
    relatedRiskIds: [],
    resources: ['CRM software', 'Email marketing tool'],
    kpis: ['Customer retention rate', 'NPS score', 'Repeat purchase rate'],
  },
  // Regulatory
  {
    id: 'strat-compliance-audit',
    title: 'Regulatory Compliance Audit',
    description: 'Proactively identify and address compliance gaps before they become violations.',
    category: 'regulatory',
    priority: 'short_term',
    effort: 'medium',
    impact: 'high',
    timelineWeeks: 6,
    actions: [
      'List all applicable regulations by jurisdiction',
      'Hire compliance consultant for gap assessment',
      'Create compliance calendar with deadlines',
      'Subscribe to regulatory change alerts',
    ],
    relatedRiskIds: [],
    resources: ['Legal counsel', 'Compliance software'],
    kpis: ['Compliance gaps identified', 'Days to last audit'],
  },
  // Natural disaster
  {
    id: 'strat-disaster-recovery',
    title: 'Disaster Recovery & Insurance',
    description: 'Ensure adequate insurance coverage and a tested disaster recovery plan.',
    category: 'natural_disaster',
    priority: 'immediate',
    effort: 'low',
    impact: 'high',
    timelineWeeks: 2,
    actions: [
      'Review and update all business insurance policies',
      'Identify gaps in coverage (flood, cyber, BI)',
      'Document and photograph all business assets',
      'Create off-site data and document backup',
    ],
    relatedRiskIds: [],
    resources: ['Insurance broker', 'Cloud storage'],
    kpis: ['Coverage gap (%)', 'Asset documentation completeness'],
  },
];

export function generateStrategiesForRisks(risks: RiskFactor[]): Strategy[] {
  const topCategories = getTopRiskCategories(risks);
  const strategies: Strategy[] = [];
  const usedStrategyIds = new Set<string>();

  topCategories.forEach((category) => {
    const matching = strategyLibrary.filter(
      (s) => s.category === category && !usedStrategyIds.has(s.id)
    );
    const topStrategy = matching[0];
    if (topStrategy) {
      const withRelated = {
        ...topStrategy,
        relatedRiskIds: risks.filter((r) => r.category === category).map((r) => r.id),
      };
      strategies.push(withRelated);
      usedStrategyIds.add(topStrategy.id);
    }
  });

  // Always add financial resilience if not there
  const hasFinancial = strategies.some((s) => s.category === 'financial');
  if (!hasFinancial) {
    const cashReserve = strategyLibrary.find((s) => s.id === 'strat-cash-reserve');
    if (cashReserve) strategies.push(cashReserve);
  }

  return strategies.slice(0, 6);
}

function getTopRiskCategories(risks: RiskFactor[]): RiskCategory[] {
  const categoryScores: Record<string, number> = {};

  risks.forEach((r) => {
    const score = calculateRiskScore(r);
    categoryScores[r.category] = (categoryScores[r.category] || 0) + score;
  });

  return (Object.entries(categoryScores)
    .sort(([, a], [, b]) => b - a)
    .map(([cat]) => cat) as RiskCategory[]).slice(0, 5);
}

export function getStrategyById(id: string): Strategy | undefined {
  return strategyLibrary.find((s) => s.id === id);
}

export { strategyLibrary };
