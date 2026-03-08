import { BlueprintNode, RiskFactor, Strategy } from '../types';

export function generateBlueprintNodes(
  risks: RiskFactor[],
  strategies: Strategy[]
): BlueprintNode[] {
  const nodes: BlueprintNode[] = [];
  const canvasWidth = 900;
  const canvasHeight = 600;

  // Central outcome node
  nodes.push({
    id: 'outcome-resilience',
    type: 'outcome',
    label: 'Business Resilience',
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    connected: [],
  });

  // Risk nodes - arranged in a arc on the left
  const riskCount = Math.min(risks.length, 6);
  for (let i = 0; i < riskCount; i++) {
    const risk = risks[i];
    const angle = (Math.PI / (riskCount + 1)) * (i + 1) + Math.PI / 6;
    const radius = 220;
    const x = canvasWidth / 2 - radius * Math.cos(angle) * 1.4;
    const y = canvasHeight / 2 - radius * Math.sin(angle) * 0.8 + (i % 2 === 0 ? -20 : 20);

    nodes.push({
      id: risk.id,
      type: 'risk',
      label: risk.name,
      x: Math.max(80, Math.min(canvasWidth - 80, x)),
      y: Math.max(60, Math.min(canvasHeight - 60, y)),
      severity: risk.severity,
      connected: ['outcome-resilience'],
    });
  }

  // Strategy nodes - arranged in an arc on the right
  const stratCount = Math.min(strategies.length, 5);
  for (let i = 0; i < stratCount; i++) {
    const strategy = strategies[i];
    const angle = (Math.PI / (stratCount + 1)) * (i + 1) - Math.PI / 6;
    const radius = 210;
    const x = canvasWidth / 2 + radius * Math.cos(angle) * 1.4;
    const y = canvasHeight / 2 - radius * Math.sin(angle) * 0.8 + (i % 2 === 0 ? 15 : -15);

    nodes.push({
      id: strategy.id,
      type: 'strategy',
      label: strategy.title,
      x: Math.max(80, Math.min(canvasWidth - 80, x)),
      y: Math.max(60, Math.min(canvasHeight - 60, y)),
      priority: strategy.priority,
      connected: ['outcome-resilience', ...strategy.relatedRiskIds.slice(0, 2)],
    });
  }

  // Milestone nodes
  const milestones = [
    { id: 'ms-1', label: '30-Day Quick Wins', x: canvasWidth / 2, y: 60 },
    { id: 'ms-2', label: 'Q2 Review', x: canvasWidth / 2 - 160, y: canvasHeight - 50 },
    { id: 'ms-3', label: 'Annual Resilience Audit', x: canvasWidth / 2 + 160, y: canvasHeight - 50 },
  ];

  milestones.forEach((ms) => {
    nodes.push({
      id: ms.id,
      type: 'milestone',
      label: ms.label,
      x: ms.x,
      y: ms.y,
      connected: ['outcome-resilience'],
    });
  });

  return nodes;
}
