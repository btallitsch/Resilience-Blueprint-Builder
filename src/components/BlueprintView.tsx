import React, { useState } from 'react';
import { Blueprint } from '../types';
import BlueprintCanvas from './BlueprintCanvas';
import StrategyPanel from './StrategyPanel';

interface BlueprintViewProps {
  blueprint: Blueprint;
}

const BlueprintView: React.FC<BlueprintViewProps> = ({ blueprint }) => {
  const [activeTab, setActiveTab] = useState<'canvas' | 'strategies'>('canvas');

  return (
    <div className="blueprint-view">
      <div className="page-header">
        <div className="page-eyebrow">PHASE 02 — BLUEPRINT</div>
        <h2 className="page-title">{blueprint.businessName} — Resilience Blueprint</h2>
        <p className="page-desc">
          Generated {blueprint.createdAt.toLocaleDateString()} ·{' '}
          {blueprint.risks.length} risks · {blueprint.strategies.length} strategies
        </p>
      </div>

      <div className="blueprint-tab-bar">
        <button
          className={`blueprint-tab ${activeTab === 'canvas' ? 'active' : ''}`}
          onClick={() => setActiveTab('canvas')}
        >
          ⬢ Visual Blueprint
        </button>
        <button
          className={`blueprint-tab ${activeTab === 'strategies' ? 'active' : ''}`}
          onClick={() => setActiveTab('strategies')}
        >
          ◈ Strategy Roadmap
        </button>
      </div>

      {activeTab === 'canvas' && <BlueprintCanvas blueprint={blueprint} />}
      {activeTab === 'strategies' && <StrategyPanel blueprint={blueprint} />}
    </div>
  );
};

export default BlueprintView;
