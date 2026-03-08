import { StressScenario, StressTestResult, RiskFactor, Strategy } from '../types';

export const stressScenarios: StressScenario[] = [
  {
    id: 'scenario-recession',
    name: 'Economic Recession',
    description: 'Prolonged economic downturn reducing consumer spending by 25-40%.',
    icon: '📉',
    affectedCategories: ['financial', 'market'],
    severityMultiplier: 1.8,
    likelihoodMultiplier: 2.0,
    durationWeeks: 52,
    economicImpactRange: [25, 45],
  },
  {
    id: 'scenario-pandemic',
    name: 'Health Crisis / Pandemic',
    description: 'Forced closures, supply disruption, and demand shock from health emergency.',
    icon: '🦠',
    affectedCategories: ['operational', 'supply_chain', 'talent'],
    severityMultiplier: 2.2,
    likelihoodMultiplier: 1.5,
    durationWeeks: 26,
    economicImpactRange: [30, 80],
  },
  {
    id: 'scenario-cyberattack',
    name: 'Ransomware Attack',
    description: 'Critical systems encrypted, data compromised, operations halted.',
    icon: '🔓',
    affectedCategories: ['cyber', 'operational', 'financial'],
    severityMultiplier: 2.5,
    likelihoodMultiplier: 1.8,
    durationWeeks: 4,
    economicImpactRange: [15, 60],
  },
  {
    id: 'scenario-supply-shock',
    name: 'Supply Chain Collapse',
    description: 'Primary suppliers fail simultaneously due to geopolitical or natural causes.',
    icon: '🚢',
    affectedCategories: ['supply_chain', 'operational', 'financial'],
    severityMultiplier: 2.0,
    likelihoodMultiplier: 1.6,
    durationWeeks: 16,
    economicImpactRange: [20, 50],
  },
  {
    id: 'scenario-flood',
    name: 'Natural Disaster',
    description: 'Flooding, fire, or earthquake damages physical operations.',
    icon: '🌊',
    affectedCategories: ['natural_disaster', 'operational', 'financial'],
    severityMultiplier: 2.3,
    likelihoodMultiplier: 1.2,
    durationWeeks: 12,
    economicImpactRange: [20, 70],
  },
  {
    id: 'scenario-key-person',
    name: 'Key Person Loss',
    description: 'Sudden departure or incapacity of the business owner or critical employee.',
    icon: '👤',
    affectedCategories: ['talent', 'operational'],
    severityMultiplier: 2.0,
    likelihoodMultiplier: 1.4,
    durationWeeks: 8,
    economicImpactRange: [10, 40],
  },
];

const severityScores: Record<string, number> = {
  low: 1, medium: 2, high: 3, critical: 4,
};
const likelihoodScores: Record<string, number> = {
  rare: 1, unlikely: 2, possible: 3, likely: 4, almost_certain: 5,
};

export function runStressTest(
  scenario: StressScenario,
  risks: RiskFactor[],
  strategies: Strategy[]
): StressTestResult {
  // Calculate base risk score
  const affectedRisks = risks.filter((r) =>
    scenario.affectedCategories.includes(r.category)
  );

  const baseScore = risks.reduce((sum, r) => {
    const sevScore = severityScores[r.severity] || 1;
    const likScore = likelihoodScores[r.likelihood] || 1;
    return sum + sevScore * likScore * (r.weight / 10);
  }, 0);

  // Amplified score under scenario
  const amplifiedScore = affectedRisks.reduce((sum, r) => {
    const sevScore = (severityScores[r.severity] || 1) * scenario.severityMultiplier;
    const likScore = (likelihoodScores[r.likelihood] || 1) * scenario.likelihoodMultiplier;
    return sum + sevScore * likScore * (r.weight / 10);
  }, 0) + (risks.length - affectedRisks.length) * 2; // non-affected risks at baseline

  // Strategy coverage (reduces impact)
  const coverageStrategies = strategies.filter((s) =>
    scenario.affectedCategories.includes(s.category)
  );
  const strategyCoverageBonus = Math.min(coverageStrategies.length * 8, 40);

  // Resilience score under stress (0-100, higher is better)
  const maxPossible = risks.length * 4 * 5 * 1;
  const rawResilience = Math.max(0, 100 - (amplifiedScore / Math.max(maxPossible, 1)) * 100);
  const resilienceScore = Math.min(100, Math.round(rawResilience + strategyCoverageBonus));

  // Survivability estimate
  const impactPct = scenario.economicImpactRange[0] + 
    (scenario.economicImpactRange[1] - scenario.economicImpactRange[0]) * (1 - resilienceScore / 100);
  const survivabilityMonths = resilienceScore > 70 ? 18 :
    resilienceScore > 50 ? 12 :
    resilienceScore > 30 ? 6 : 3;

  // Identify top vulnerabilities
  const vulnerabilities: string[] = affectedRisks
    .sort((a, b) => {
      const scoreA = severityScores[a.severity] * likelihoodScores[a.likelihood] * a.weight;
      const scoreB = severityScores[b.severity] * likelihoodScores[b.likelihood] * b.weight;
      return scoreB - scoreA;
    })
    .slice(0, 3)
    .map((r) => r.name);

  if (vulnerabilities.length === 0) {
    vulnerabilities.push('No direct risks mapped to this scenario');
  }

  // Recommended actions
  const recommendedActions = generateRecommendedActions(scenario, resilienceScore, coverageStrategies.length);

  // Recovery time
  const recoveryTimeWeeks = Math.round(
    scenario.durationWeeks * (1 - resilienceScore / 100) * 1.5
  );

  return {
    scenarioId: scenario.id,
    scenarioName: scenario.name,
    resilienceScore,
    vulnerabilities,
    survivabilityMonths,
    recommendedActions,
    recoveryTimeWeeks: Math.max(recoveryTimeWeeks, 1),
    timestamp: new Date(),
  };
}

function generateRecommendedActions(
  scenario: StressScenario,
  score: number,
  coveredStrategies: number
): string[] {
  const actions: string[] = [];

  if (score < 40) {
    actions.push(`URGENT: Create ${scenario.name.toLowerCase()} emergency response plan immediately`);
  }
  if (coveredStrategies < 2) {
    actions.push(`Add ${scenario.affectedCategories[0]} mitigation strategies to your blueprint`);
  }
  if (scenario.affectedCategories.includes('financial')) {
    actions.push('Build 3-6 month cash reserve emergency fund');
  }
  if (scenario.affectedCategories.includes('supply_chain')) {
    actions.push('Identify and contract with 2+ backup suppliers today');
  }
  if (scenario.affectedCategories.includes('cyber')) {
    actions.push('Implement offsite backups and incident response plan');
  }
  if (scenario.affectedCategories.includes('talent')) {
    actions.push('Document all critical processes and cross-train key staff');
  }
  if (score > 70) {
    actions.push('Blueprint strong — conduct quarterly scenario review');
  }

  return actions.slice(0, 4);
}
