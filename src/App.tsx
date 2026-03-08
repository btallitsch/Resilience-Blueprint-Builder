import React, { useState } from 'react';
import { AppView } from './types';
import { useBlueprint } from './hooks/useBlueprint';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import RiskFactorInput from './components/RiskFactorInput';
import BlueprintView from './components/BlueprintView';
import StressTest from './components/StressTest';
import SuccessStories from './components/SuccessStories';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('dashboard');
  const {
    profile,
    risks,
    strategies,
    blueprint,
    isGenerating,
    updateProfile,
    addRisk,
    updateRisk,
    removeRisk,
    loadIndustryTemplate,
    generateBlueprint,
    addStressTestResult,
  } = useBlueprint();

  const handleGenerate = () => {
    generateBlueprint();
    setTimeout(() => setView('blueprint'), 1400);
  };

  return (
    <div className="app">
      <Header
        activeView={view}
        onNavigate={setView}
        businessName={profile.name || undefined}
        resilienceScore={blueprint?.overallResilienceScore}
      />
      <main className="app-main">
        {view === 'dashboard' && (
          <Dashboard
            profile={profile}
            blueprint={blueprint}
            onNavigate={setView}
            riskCount={risks.length}
          />
        )}
        {view === 'risk_input' && (
          <RiskFactorInput
            risks={risks}
            profile={profile}
            onAddRisk={addRisk}
            onRemoveRisk={removeRisk}
            onUpdateProfile={updateProfile}
            onLoadTemplate={loadIndustryTemplate}
            onGenerateBlueprint={handleGenerate}
            isGenerating={isGenerating}
          />
        )}
        {view === 'blueprint' && blueprint && (
          <BlueprintView blueprint={blueprint} />
        )}
        {view === 'blueprint' && !blueprint && (
          <div className="empty-page">
            <div className="empty-page-icon">⬢</div>
            <h3>No Blueprint Generated Yet</h3>
            <p>Map at least 2 risk factors and generate your blueprint first.</p>
            <button className="btn-primary" onClick={() => setView('risk_input')}>
              Go to Risk Map →
            </button>
          </div>
        )}
        {view === 'stress_test' && (
          <StressTest blueprint={blueprint} onAddResult={addStressTestResult} />
        )}
        {view === 'stories' && <SuccessStories />}
      </main>
    </div>
  );
};

export default App;
