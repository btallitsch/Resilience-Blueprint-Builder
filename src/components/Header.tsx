import React from 'react';
import { AppView } from '../types';

interface HeaderProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  businessName?: string;
  resilienceScore?: number;
}

const navItems: { view: AppView; label: string; icon: string }[] = [
  { view: 'dashboard', label: 'Dashboard', icon: '⬡' },
  { view: 'risk_input', label: 'Risk Map', icon: '◈' },
  { view: 'blueprint', label: 'Blueprint', icon: '⬢' },
  { view: 'stress_test', label: 'Stress Test', icon: '◎' },
  { view: 'stories', label: 'Field Reports', icon: '◉' },
];

const Header: React.FC<HeaderProps> = ({ activeView, onNavigate, businessName, resilienceScore }) => {
  const scoreColor =
    resilienceScore === undefined ? '#6b7280'
    : resilienceScore >= 70 ? '#22c55e'
    : resilienceScore >= 45 ? '#eab308'
    : '#ef4444';

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-mark">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 30,9 30,23 16,30 2,23 2,9" fill="none" stroke="#d97706" strokeWidth="1.5" />
            <polygon points="16,7 25,11.5 25,20.5 16,25 7,20.5 7,11.5" fill="none" stroke="#d97706" strokeWidth="0.8" opacity="0.5" />
            <circle cx="16" cy="16" r="3" fill="#d97706" />
            <line x1="16" y1="7" x2="16" y2="11" stroke="#d97706" strokeWidth="0.8" />
            <line x1="16" y1="21" x2="16" y2="25" stroke="#d97706" strokeWidth="0.8" />
            <line x1="7" y1="11.5" x2="10.5" y2="13.5" stroke="#d97706" strokeWidth="0.8" />
            <line x1="21.5" y1="13.5" x2="25" y2="11.5" stroke="#d97706" strokeWidth="0.8" />
          </svg>
        </div>
        <div className="brand-text">
          <span className="brand-name">RESILIENCE</span>
          <span className="brand-sub">BLUEPRINT BUILDER</span>
        </div>
      </div>

      <nav className="header-nav">
        {navItems.map(({ view, label, icon }) => (
          <button
            key={view}
            className={`nav-item ${activeView === view ? 'active' : ''}`}
            onClick={() => onNavigate(view)}
          >
            <span className="nav-icon">{icon}</span>
            <span className="nav-label">{label}</span>
          </button>
        ))}
      </nav>

      <div className="header-status">
        {businessName && (
          <div className="status-business">
            <span className="status-label">ENTITY</span>
            <span className="status-value">{businessName}</span>
          </div>
        )}
        {resilienceScore !== undefined && (
          <div className="status-score">
            <span className="status-label">RESILIENCE</span>
            <span className="status-score-value" style={{ color: scoreColor }}>
              {resilienceScore}<span className="status-score-unit">/100</span>
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
