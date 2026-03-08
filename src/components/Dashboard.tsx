import React from 'react';
import { Blueprint, AppView, BusinessProfile } from '../types';
import { categorizeRiskLevel } from '../engine/riskCalculator';

interface DashboardProps {
  profile: BusinessProfile;
  blueprint: Blueprint | null;
  onNavigate: (view: AppView) => void;
  riskCount: number;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, blueprint, onNavigate, riskCount }) => {
  const score = blueprint?.overallResilienceScore;
  const riskInfo = score !== undefined ? categorizeRiskLevel(100 - score) : null;

  const stats = [
    {
      label: 'Risks Mapped',
      value: riskCount.toString(),
      unit: 'factors',
      icon: '◈',
      color: '#ef4444',
      action: () => onNavigate('risk_input'),
    },
    {
      label: 'Strategies',
      value: blueprint?.strategies.length.toString() || '0',
      unit: 'active',
      icon: '⬢',
      color: '#d97706',
      action: () => onNavigate('blueprint'),
    },
    {
      label: 'Stress Tests',
      value: blueprint?.stressTestResults?.length.toString() || '0',
      unit: 'run',
      icon: '◎',
      color: '#8b5cf6',
      action: () => onNavigate('stress_test'),
    },
    {
      label: 'Resilience',
      value: score?.toString() || '--',
      unit: '/ 100',
      icon: '⬡',
      color: score && score >= 70 ? '#22c55e' : score && score >= 45 ? '#eab308' : '#ef4444',
      action: () => onNavigate('blueprint'),
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div className="hero-text">
          <div className="hero-eyebrow">COMMAND CENTER</div>
          <h1 className="hero-title">
            {profile.name ? `${profile.name}` : 'Your Business'}
            <br />
            <span className="hero-subtitle">Resilience Blueprint</span>
          </h1>
          <p className="hero-description">
            Map your risk landscape, generate adaptive strategies, and stress-test your blueprint
            against real-world disruption scenarios.
          </p>
          <div className="hero-cta-row">
            <button className="btn-primary" onClick={() => onNavigate('risk_input')}>
              {riskCount === 0 ? '◈ Begin Risk Mapping' : '◈ Update Risk Map'}
            </button>
            {blueprint && (
              <button className="btn-secondary" onClick={() => onNavigate('blueprint')}>
                ⬢ View Blueprint
              </button>
            )}
          </div>
        </div>

        <div className="hero-score-display">
          {score !== undefined ? (
            <div className="score-radial">
              <svg viewBox="0 0 200 200" width="200" height="200">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#1f2937" strokeWidth="12" />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={riskInfo?.color || '#d97706'}
                  strokeWidth="12"
                  strokeDasharray={`${(score / 100) * 502} 502`}
                  strokeDashoffset="125"
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 1s ease' }}
                />
                <text x="100" y="90" textAnchor="middle" fill="#f9fafb" fontSize="42" fontFamily="'Space Mono', monospace" fontWeight="bold">
                  {score}
                </text>
                <text x="100" y="118" textAnchor="middle" fill="#9ca3af" fontSize="12" fontFamily="'Space Mono', monospace">
                  RESILIENCE
                </text>
                <text x="100" y="136" textAnchor="middle" fill={riskInfo?.color || '#d97706'} fontSize="11" fontFamily="'Space Mono', monospace" fontWeight="bold">
                  {riskInfo?.label}
                </text>
              </svg>
              <div className="score-desc">{riskInfo?.description}</div>
            </div>
          ) : (
            <div className="score-placeholder">
              <div className="score-placeholder-ring">
                <span className="score-placeholder-text">AWAITING<br />ASSESSMENT</span>
              </div>
              <div className="score-desc">Complete risk mapping to generate score</div>
            </div>
          )}
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <button key={stat.label} className="stat-card" onClick={stat.action}>
            <div className="stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
            <div className="stat-value" style={{ color: stat.color }}>
              {stat.value}
              <span className="stat-unit">{stat.unit}</span>
            </div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-arrow">→</div>
          </button>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <span className="card-icon">◈</span>
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions">
            <button className="quick-action-item" onClick={() => onNavigate('risk_input')}>
              <span>Add risk from industry template</span>
              <span className="qa-arrow">→</span>
            </button>
            <button className="quick-action-item" onClick={() => onNavigate('stress_test')}>
              <span>Run recession stress test</span>
              <span className="qa-arrow">→</span>
            </button>
            <button className="quick-action-item" onClick={() => onNavigate('stories')}>
              <span>Browse recovery field reports</span>
              <span className="qa-arrow">→</span>
            </button>
            <button className="quick-action-item" onClick={() => onNavigate('blueprint')}>
              <span>Export blueprint PDF</span>
              <span className="qa-arrow">→</span>
            </button>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <span className="card-icon">⬡</span>
            <h3>Blueprint Status</h3>
          </div>
          <div className="status-checklist">
            {[
              { label: 'Business profile set', done: !!profile.name },
              { label: 'Risks identified', done: riskCount > 0 },
              { label: 'Blueprint generated', done: !!blueprint },
              { label: 'Stress test completed', done: (blueprint?.stressTestResults?.length || 0) > 0 },
              { label: 'Strategies reviewed', done: (blueprint?.strategies.length || 0) > 0 },
            ].map(({ label, done }) => (
              <div key={label} className={`checklist-item ${done ? 'done' : ''}`}>
                <span className="check-icon">{done ? '◉' : '○'}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <span className="card-icon">◉</span>
            <h3>Recent Field Report</h3>
          </div>
          <div className="featured-story">
            <div className="story-tag">🍽️ Food & Beverage</div>
            <p className="story-excerpt">
              "A family restaurant pivoted to ghost kitchen model within 2 weeks of city-wide closure.
              Retained 80% of revenue through delivery partnerships pre-identified in their blueprint."
            </p>
            <div className="story-stat">
              <span>Resilience gain:</span>
              <span className="story-gain">+47 pts</span>
            </div>
            <button className="btn-text" onClick={() => onNavigate('stories')}>
              Read more field reports →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
