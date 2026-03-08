import React, { useState } from 'react';
import { Blueprint, BlueprintNode, Strategy } from '../types';

interface BlueprintCanvasProps {
  blueprint: Blueprint;
}

const nodeColors = {
  risk: { fill: '#1f0808', stroke: '#ef4444' },
  strategy: { fill: '#0d1f0d', stroke: '#22c55e' },
  milestone: { fill: '#0d0d1f', stroke: '#3b82f6' },
  outcome: { fill: '#1a1200', stroke: '#d97706' },
};

const priorityColors = {
  immediate: '#ef4444',
  short_term: '#eab308',
  long_term: '#22c55e',
};

const severityColors = {
  low: '#22c55e',
  medium: '#eab308',
  high: '#f97316',
  critical: '#ef4444',
};

function truncate(text: string, maxLen: number) {
  return text.length > maxLen ? text.slice(0, maxLen - 1) + '…' : text;
}

function NodeTooltip({ node, strategies, blueprint }: { node: BlueprintNode; strategies: Strategy[]; blueprint: Blueprint }) {
  if (node.type === 'risk') {
    const risk = blueprint.risks.find((r) => r.id === node.id);
    if (!risk) return null;
    return (
      <div className="node-tooltip">
        <div className="tooltip-title">{risk.name}</div>
        <div className="tooltip-row"><span>Severity:</span><span style={{ color: severityColors[risk.severity] }}>{risk.severity}</span></div>
        <div className="tooltip-row"><span>Likelihood:</span><span>{risk.likelihood.replace('_', ' ')}</span></div>
        <div className="tooltip-row"><span>Risk Score:</span><span>{risk.riskScore}</span></div>
      </div>
    );
  }
  if (node.type === 'strategy') {
    const strat = strategies.find((s) => s.id === node.id);
    if (!strat) return null;
    return (
      <div className="node-tooltip">
        <div className="tooltip-title">{strat.title}</div>
        <div className="tooltip-row"><span>Priority:</span><span style={{ color: priorityColors[strat.priority] }}>{strat.priority.replace('_', ' ')}</span></div>
        <div className="tooltip-row"><span>Timeline:</span><span>{strat.timelineWeeks}w</span></div>
        <div className="tooltip-row"><span>Impact:</span><span>{strat.impact}</span></div>
      </div>
    );
  }
  return null;
}

const BlueprintCanvas: React.FC<BlueprintCanvasProps> = ({ blueprint }) => {
  const [hoveredNode, setHoveredNode] = useState<BlueprintNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<BlueprintNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const { nodes, strategies, risks } = blueprint;

  const getNodeById = (id: string) => nodes.find((n) => n.id === id);

  // Collect all connections
  const edges: { from: BlueprintNode; to: BlueprintNode }[] = [];
  nodes.forEach((node) => {
    node.connected.forEach((targetId) => {
      const target = getNodeById(targetId);
      if (target && node.id < target.id) {
        edges.push({ from: node, to: target });
      }
    });
  });

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = (e.target as SVGElement).closest('svg')?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({ x: e.clientX - rect.left + 12, y: e.clientY - rect.top - 40 });
    }
  };

  const getStrokeColor = (from: BlueprintNode, to: BlueprintNode) => {
    if (from.type === 'risk' || to.type === 'risk') return '#ef444440';
    if (from.type === 'strategy' || to.type === 'strategy') return '#22c55e40';
    return '#d9770640';
  };

  const selectedDetails = selectedNode
    ? selectedNode.type === 'risk'
      ? risks.find((r) => r.id === selectedNode.id)
      : selectedNode.type === 'strategy'
      ? strategies.find((s) => s.id === selectedNode.id)
      : null
    : null;

  return (
    <div className="blueprint-canvas-wrapper">
      <div className="canvas-header">
        <div className="canvas-legend">
          <span className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }} /> Risk</span>
          <span className="legend-item"><span className="legend-dot" style={{ background: '#22c55e' }} /> Strategy</span>
          <span className="legend-item"><span className="legend-dot" style={{ background: '#3b82f6' }} /> Milestone</span>
          <span className="legend-item"><span className="legend-dot" style={{ background: '#d97706' }} /> Outcome</span>
        </div>
        <div className="canvas-score">
          Resilience Score:
          <strong style={{ color: blueprint.overallResilienceScore >= 70 ? '#22c55e' : blueprint.overallResilienceScore >= 45 ? '#eab308' : '#ef4444' }}>
            {' '}{blueprint.overallResilienceScore}/100
          </strong>
        </div>
      </div>

      <div className="canvas-container" style={{ position: 'relative' }}>
        <svg
          width="100%"
          viewBox="0 0 900 600"
          className="blueprint-svg"
          onMouseMove={handleMouseMove}
        >
          {/* Grid lines (blueprint paper effect) */}
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e3a5f" strokeWidth="0.3" />
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1e3a5f" strokeWidth="0.8" />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect width="900" height="600" fill="url(#grid)" />

          {/* Edges */}
          {edges.map(({ from, to }, i) => (
            <line
              key={i}
              x1={from.x} y1={from.y}
              x2={to.x} y2={to.y}
              stroke={getStrokeColor(from, to)}
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          ))}

          {/* Nodes */}
          {nodes.map((node) => {
            const colors = nodeColors[node.type];
            const isHovered = hoveredNode?.id === node.id;
            const isSelected = selectedNode?.id === node.id;
            const label = truncate(node.label, 22);

            const baseRadius = node.type === 'outcome' ? 42 : node.type === 'milestone' ? 28 : 36;
            const r = isHovered || isSelected ? baseRadius + 4 : baseRadius;

            const accentColor = node.type === 'risk' && node.severity
              ? severityColors[node.severity]
              : node.type === 'strategy' && node.priority
              ? priorityColors[node.priority]
              : colors.stroke;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
              >
                {(isHovered || isSelected) && (
                  <circle r={r + 8} fill="none" stroke={accentColor} strokeWidth="1" opacity="0.3" filter="url(#glow)" />
                )}
                <circle
                  r={r}
                  fill={colors.fill}
                  stroke={isSelected ? accentColor : colors.stroke}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  filter={isHovered ? 'url(#glow)' : undefined}
                />
                {/* Inner accent ring for outcome */}
                {node.type === 'outcome' && (
                  <circle r={r - 8} fill="none" stroke={accentColor} strokeWidth="0.8" opacity="0.5" />
                )}
                {/* Node type icon */}
                <text
                  y={-6}
                  textAnchor="middle"
                  fill={accentColor}
                  fontSize={node.type === 'outcome' ? 16 : 13}
                  fontFamily="'Space Mono', monospace"
                >
                  {node.type === 'risk' ? '◈' : node.type === 'strategy' ? '⬢' : node.type === 'milestone' ? '◉' : '⬡'}
                </text>
                <text
                  y={8}
                  textAnchor="middle"
                  fill="#e5e7eb"
                  fontSize={node.type === 'outcome' ? 9 : 8}
                  fontFamily="'Space Mono', monospace"
                  style={{ pointerEvents: 'none' }}
                >
                  {label.slice(0, 12)}
                </text>
                {label.length > 12 && (
                  <text
                    y={18}
                    textAnchor="middle"
                    fill="#e5e7eb"
                    fontSize={8}
                    fontFamily="'Space Mono', monospace"
                    style={{ pointerEvents: 'none' }}
                  >
                    {label.slice(12)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover tooltip */}
        {hoveredNode && !selectedNode && (
          <div className="node-tooltip" style={{ left: tooltipPos.x, top: tooltipPos.y }}>
            <NodeTooltip node={hoveredNode} strategies={strategies} blueprint={blueprint} />
          </div>
        )}
      </div>

      {/* Selected node detail panel */}
      {selectedNode && selectedDetails && (
        <div className="node-detail-panel">
          <button className="detail-close" onClick={() => setSelectedNode(null)}>×</button>
          {selectedNode.type === 'risk' && 'severity' in selectedDetails && (
            <div>
              <div className="detail-type">◈ RISK FACTOR</div>
              <div className="detail-title">{(selectedDetails as any).name}</div>
              <div className="detail-row">
                <span>Category</span><span>{(selectedDetails as any).category.replace('_', ' ')}</span>
              </div>
              <div className="detail-row">
                <span>Severity</span>
                <span style={{ color: severityColors[(selectedDetails as any).severity] }}>
                  {(selectedDetails as any).severity}
                </span>
              </div>
              <div className="detail-row">
                <span>Likelihood</span><span>{(selectedDetails as any).likelihood.replace('_', ' ')}</span>
              </div>
              <div className="detail-row">
                <span>Risk Score</span><span>{(selectedDetails as any).riskScore}/100</span>
              </div>
              {(selectedDetails as any).description && (
                <p className="detail-desc">{(selectedDetails as any).description}</p>
              )}
            </div>
          )}
          {selectedNode.type === 'strategy' && 'timelineWeeks' in selectedDetails && (
            <div>
              <div className="detail-type">⬢ STRATEGY</div>
              <div className="detail-title">{(selectedDetails as any).title}</div>
              <div className="detail-row">
                <span>Priority</span>
                <span style={{ color: priorityColors[(selectedDetails as any).priority] }}>
                  {(selectedDetails as any).priority.replace('_', ' ')}
                </span>
              </div>
              <div className="detail-row"><span>Timeline</span><span>{(selectedDetails as any).timelineWeeks} weeks</span></div>
              <div className="detail-row"><span>Effort</span><span>{(selectedDetails as any).effort}</span></div>
              <div className="detail-row"><span>Impact</span><span>{(selectedDetails as any).impact}</span></div>
              <div className="detail-actions-list">
                {(selectedDetails as any).actions?.map((a: string, i: number) => (
                  <div key={i} className="detail-action-item">
                    <span className="detail-action-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlueprintCanvas;
