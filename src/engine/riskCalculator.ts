import { RiskFactor, Severity, Likelihood } from '../types';

const severityWeights: Record<Severity, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 5,
};

const likelihoodWeights: Record<Likelihood, number> = {
  rare: 1,
  unlikely: 2,
  possible: 3,
  likely: 4,
  almost_certain: 5,
};

export function calculateRiskScore(risk: RiskFactor): number {
  const sevScore = severityWeights[risk.severity];
  const likScore = likelihoodWeights[risk.likelihood];
  const weightedScore = (sevScore * likScore * risk.weight) / 10;
  // Normalize to 0-100
  return Math.min(100, Math.round((weightedScore / 25) * 100));
}

export function calculateOverallResilienceScore(risks: RiskFactor[]): number {
  if (risks.length === 0) return 50;

  const totalRiskScore = risks.reduce((sum, r) => sum + (r.riskScore || calculateRiskScore(r)), 0);
  const avgRiskScore = totalRiskScore / risks.length;

  // Resilience is inversely proportional to average risk score
  // Also penalize for high number of critical risks
  const criticalCount = risks.filter((r) => r.severity === 'critical').length;
  const criticalPenalty = criticalCount * 5;

  return Math.max(0, Math.min(100, Math.round(100 - avgRiskScore - criticalPenalty)));
}

export function categorizeRiskLevel(score: number): {
  label: string;
  color: string;
  description: string;
} {
  if (score >= 80) return { label: 'CRITICAL', color: '#ef4444', description: 'Immediate action required' };
  if (score >= 60) return { label: 'HIGH', color: '#f97316', description: 'Address within 30 days' };
  if (score >= 40) return { label: 'MEDIUM', color: '#eab308', description: 'Plan mitigation strategy' };
  if (score >= 20) return { label: 'LOW', color: '#22c55e', description: 'Monitor regularly' };
  return { label: 'MINIMAL', color: '#3b82f6', description: 'Low priority — keep watching' };
}

export function getRisksByPriority(risks: RiskFactor[]): RiskFactor[] {
  return [...risks]
    .map((r) => ({ ...r, riskScore: calculateRiskScore(r) }))
    .sort((a, b) => (b.riskScore || 0) - (a.riskScore || 0));
}

export function getTopRisks(risks: RiskFactor[], count = 3): RiskFactor[] {
  return getRisksByPriority(risks).slice(0, count);
}

export function generateRiskId(): string {
  return `risk-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
