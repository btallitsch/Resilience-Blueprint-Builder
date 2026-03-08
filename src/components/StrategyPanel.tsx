import React, { useState } from 'react';
import { Strategy, Blueprint } from '../types';

interface StrategyPanelProps {
  blueprint: Blueprint;
}

const priorityColors = {
  immediate: '#ef4444',
  short_term: '#eab308',
  long_term: '#22c55e',
};

const effortColors = {
  low: '#22c55e',
  medium: '#eab308',
  high: '#ef4444',
};

const StrategyPanel: React.FC<StrategyPanelProps> = ({ blueprint }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Strategy['priority'] | 'all'>('all');

  const { strategies } = blueprint;
  const filtered = filter === 'all' ? strategies : strategies.filter((s) => s.priority === filter);

  const grouped = {
    immediate: strategies.filter((s) => s.priority === 'immediate'),
    short_term: strategies.filter((s) => s.priority === 'short_term'),
    long_term: strategies.filter((s) => s.priority === 'long_term'),
  };

  return (
    <div className="strategy-panel">
      <div className="page-header">
        <div className="page-eyebrow">PHASE 02 — RESPONSE</div>
        <h2 className="page-title">Adaptive Strategy Engine</h2>
        <p className="page-desc">
          {strategies.length} adaptive strategies generated for{' '}
          <strong>{blueprint.businessName}</strong>. Click any strategy to expand actions.
        </p>
      </div>

      <div className="strategy-summary-row">
        {(Object.entries(grouped) as [Strategy['priority'], Strategy[]][]).map(([priority, items]) => (
          <div
            key={priority}
            className={`priority-summary-card ${filter === priority ? 'active' : ''}`}
            onClick={() => setFilter(filter === priority ? 'all' : priority)}
            style={filter === priority ? { borderColor: priorityColors[priority] } : {}}
          >
            <div className="priority-count" style={{ color: priorityColors[priority] }}>
              {items.length}
            </div>
            <div className="priority-label">{priority.replace('_', ' ').toUpperCase()}</div>
            <div className="priority-timeline">
              {priority === 'immediate' ? 'Act now' : priority === 'short_term' ? '1–3 months' : '3–12 months'}
            </div>
          </div>
        ))}
        <div
          className={`priority-summary-card ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          <div className="priority-count" style={{ color: '#d97706' }}>{strategies.length}</div>
          <div className="priority-label">ALL</div>
          <div className="priority-timeline">Full roadmap</div>
        </div>
      </div>

      <div className="strategies-list">
        {filtered.map((s, idx) => {
          const isExpanded = expandedId === s.id;
          return (
            <div
              key={s.id}
              className={`strategy-card ${isExpanded ? 'expanded' : ''}`}
              style={{ borderLeftColor: priorityColors[s.priority] }}
            >
              <div
                className="strategy-card-header"
                onClick={() => setExpandedId(isExpanded ? null : s.id)}
              >
                <div className="strategy-index">{String(idx + 1).padStart(2, '0')}</div>
                <div className="strategy-main">
                  <div className="strategy-title">{s.title}</div>
                  <div className="strategy-meta">
                    <span className="strat-tag" style={{ color: priorityColors[s.priority] }}>
                      ⬡ {s.priority.replace('_', ' ')}
                    </span>
                    <span className="strat-tag">⏱ {s.timelineWeeks}w</span>
                    <span className="strat-tag" style={{ color: effortColors[s.effort] }}>
                      ◈ {s.effort} effort
                    </span>
                    <span className="strat-tag">↑ {s.impact} impact</span>
                  </div>
                </div>
                <div className={`expand-icon ${isExpanded ? 'open' : ''}`}>▼</div>
              </div>

              {isExpanded && (
                <div className="strategy-card-body">
                  <p className="strategy-desc">{s.description}</p>

                  <div className="strategy-details-grid">
                    <div className="detail-block">
                      <div className="detail-block-title">◈ Action Steps</div>
                      {s.actions.map((action, i) => (
                        <div key={i} className="action-step">
                          <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>

                    <div className="detail-block">
                      <div className="detail-block-title">⬢ Resources Needed</div>
                      {s.resources.map((r, i) => (
                        <div key={i} className="resource-item">◉ {r}</div>
                      ))}

                      <div className="detail-block-title" style={{ marginTop: '1rem' }}>⬡ Success KPIs</div>
                      {s.kpis.map((kpi, i) => (
                        <div key={i} className="kpi-item">→ {kpi}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <span>⬢</span>
          <p>No strategies in this category.</p>
        </div>
      )}
    </div>
  );
};

export default StrategyPanel;
