import React, { useState } from 'react';
import { Blueprint, StressTestResult } from '../types';
import { stressScenarios, runStressTest } from '../engine/stressTestEngine';

interface StressTestProps {
  blueprint: Blueprint | null;
  onAddResult: (result: StressTestResult) => void;
}

const StressTest: React.FC<StressTestProps> = ({ blueprint, onAddResult }) => {
  const [running, setRunning] = useState<string | null>(null);
  const [results, setResults] = useState<StressTestResult[]>(blueprint?.stressTestResults || []);
  const [activeResult, setActiveResult] = useState<StressTestResult | null>(null);

  const handleRunTest = (scenarioId: string) => {
    if (!blueprint) return;
    const scenario = stressScenarios.find((s) => s.id === scenarioId);
    if (!scenario) return;

    setRunning(scenarioId);
    setTimeout(() => {
      const result = runStressTest(scenario, blueprint.risks, blueprint.strategies);
      setResults((prev) => {
        const filtered = prev.filter((r) => r.scenarioId !== scenarioId);
        return [...filtered, result];
      });
      onAddResult(result);
      setActiveResult(result);
      setRunning(null);
    }, 1800);
  };

  const getResultForScenario = (scenarioId: string) =>
    results.find((r) => r.scenarioId === scenarioId);

  const scoreColor = (score: number) =>
    score >= 70 ? '#22c55e' : score >= 45 ? '#eab308' : '#ef4444';

  return (
    <div className="stress-test-page">
      <div className="page-header">
        <div className="page-eyebrow">PHASE 03 — SIMULATION</div>
        <h2 className="page-title">Blueprint Stress Tests</h2>
        <p className="page-desc">
          Simulate real-world disruption scenarios against your resilience blueprint.
          {!blueprint && (
            <span className="warning-text"> Generate your blueprint first to run stress tests.</span>
          )}
        </p>
      </div>

      <div className="stress-layout">
        <div className="scenarios-col">
          <div className="panel-title">Disruption Scenarios</div>
          <div className="scenarios-list">
            {stressScenarios.map((scenario) => {
              const result = getResultForScenario(scenario.id);
              const isRunning = running === scenario.id;

              return (
                <div
                  key={scenario.id}
                  className={`scenario-card ${result ? 'has-result' : ''} ${activeResult?.scenarioId === scenario.id ? 'active' : ''}`}
                  onClick={() => result && setActiveResult(result)}
                >
                  <div className="scenario-header">
                    <span className="scenario-icon">{scenario.icon}</span>
                    <div className="scenario-info">
                      <div className="scenario-name">{scenario.name}</div>
                      <div className="scenario-desc">{scenario.description}</div>
                    </div>
                    {result && (
                      <div
                        className="scenario-score-badge"
                        style={{ color: scoreColor(result.resilienceScore), borderColor: scoreColor(result.resilienceScore) }}
                      >
                        {result.resilienceScore}
                      </div>
                    )}
                  </div>

                  <div className="scenario-meta">
                    <span className="scenario-meta-item">
                      📅 {scenario.durationWeeks}w duration
                    </span>
                    <span className="scenario-meta-item">
                      💰 {scenario.economicImpactRange[0]}–{scenario.economicImpactRange[1]}% impact
                    </span>
                  </div>

                  <button
                    className={`btn-stress-run ${isRunning ? 'running' : ''}`}
                    onClick={(e) => { e.stopPropagation(); handleRunTest(scenario.id); }}
                    disabled={!blueprint || isRunning}
                  >
                    {isRunning ? '⟳ Simulating...' : result ? '↺ Re-run Test' : '▶ Run Test'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="results-col">
          {activeResult ? (
            <div className="result-panel">
              <div className="result-header">
                <div className="result-scenario-name">{activeResult.scenarioName}</div>
                <div className="result-timestamp">
                  {activeResult.timestamp.toLocaleTimeString()}
                </div>
              </div>

              <div className="result-score-block">
                <div className="result-score-label">Resilience Under Stress</div>
                <div
                  className="result-score-value"
                  style={{ color: scoreColor(activeResult.resilienceScore) }}
                >
                  {activeResult.resilienceScore}
                  <span>/100</span>
                </div>
                <div className="result-score-bar">
                  <div
                    className="result-score-fill"
                    style={{
                      width: `${activeResult.resilienceScore}%`,
                      background: scoreColor(activeResult.resilienceScore),
                    }}
                  />
                </div>
              </div>

              <div className="result-stats-row">
                <div className="result-stat">
                  <div className="result-stat-val">{activeResult.survivabilityMonths}mo</div>
                  <div className="result-stat-label">Survivability</div>
                </div>
                <div className="result-stat">
                  <div className="result-stat-val">{activeResult.recoveryTimeWeeks}w</div>
                  <div className="result-stat-label">Recovery Time</div>
                </div>
                <div className="result-stat">
                  <div className="result-stat-val">{activeResult.vulnerabilities.length}</div>
                  <div className="result-stat-label">Vulnerabilities</div>
                </div>
              </div>

              <div className="result-section">
                <div className="result-section-title">⚠ Top Vulnerabilities</div>
                {activeResult.vulnerabilities.map((v, i) => (
                  <div key={i} className="vuln-item">
                    <span className="vuln-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>

              <div className="result-section">
                <div className="result-section-title">◈ Recommended Actions</div>
                {activeResult.recommendedActions.map((a, i) => (
                  <div key={i} className="rec-action-item">
                    <span className="rec-arrow">→</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="result-empty">
              <div className="result-empty-icon">◎</div>
              <div className="result-empty-title">No Test Selected</div>
              <p>Run a stress test scenario to see how your blueprint performs under disruption.</p>
              {!blueprint && (
                <div className="result-empty-warning">
                  ⚠ Generate your blueprint first from the Risk Map.
                </div>
              )}
            </div>
          )}

          {results.length > 1 && (
            <div className="results-comparison">
              <div className="comparison-title">All Test Results</div>
              {results.map((r) => (
                <div
                  key={r.scenarioId}
                  className={`comparison-row ${activeResult?.scenarioId === r.scenarioId ? 'active' : ''}`}
                  onClick={() => setActiveResult(r)}
                >
                  <span className="comparison-name">{r.scenarioName}</span>
                  <div className="comparison-bar-wrap">
                    <div
                      className="comparison-bar"
                      style={{
                        width: `${r.resilienceScore}%`,
                        background: scoreColor(r.resilienceScore),
                      }}
                    />
                  </div>
                  <span className="comparison-score" style={{ color: scoreColor(r.resilienceScore) }}>
                    {r.resilienceScore}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StressTest;
