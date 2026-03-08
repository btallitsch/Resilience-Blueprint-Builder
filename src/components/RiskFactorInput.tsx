import React, { useState } from 'react';
import {
  RiskFactor, RiskCategory, Severity, Likelihood, IndustryType, BusinessProfile,
} from '../types';
import { industryTemplates } from '../data/industryTemplates';

interface RiskFactorInputProps {
  risks: RiskFactor[];
  profile: BusinessProfile;
  onAddRisk: (risk: Omit<RiskFactor, 'id' | 'riskScore'>) => void;
  onRemoveRisk: (id: string) => void;
  onUpdateProfile: (updates: Partial<BusinessProfile>) => void;
  onLoadTemplate: (template: Partial<RiskFactor>[], industry: IndustryType) => void;
  onGenerateBlueprint: () => void;
  isGenerating: boolean;
}

const categoryColors: Record<RiskCategory, string> = {
  financial: '#22c55e',
  operational: '#3b82f6',
  market: '#8b5cf6',
  supply_chain: '#f97316',
  regulatory: '#eab308',
  cyber: '#ef4444',
  natural_disaster: '#06b6d4',
  talent: '#ec4899',
};

const categoryLabels: Record<RiskCategory, string> = {
  financial: 'Financial',
  operational: 'Operational',
  market: 'Market',
  supply_chain: 'Supply Chain',
  regulatory: 'Regulatory',
  cyber: 'Cyber',
  natural_disaster: 'Natural Disaster',
  talent: 'Talent & People',
};

const emptyRisk: Omit<RiskFactor, 'id' | 'riskScore'> = {
  name: '',
  category: 'financial',
  severity: 'medium',
  likelihood: 'possible',
  description: '',
  weight: 5,
};

const RiskFactorInput: React.FC<RiskFactorInputProps> = ({
  risks,
  profile,
  onAddRisk,
  onRemoveRisk,
  onUpdateProfile,
  onLoadTemplate,
  onGenerateBlueprint,
  isGenerating,
}) => {
  const [form, setForm] = useState(emptyRisk);
  const [showTemplates, setShowTemplates] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'risks'>('profile');

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onAddRisk(form);
    setForm(emptyRisk);
  };

  const severities: Severity[] = ['low', 'medium', 'high', 'critical'];
  const likelihoods: Likelihood[] = ['rare', 'unlikely', 'possible', 'likely', 'almost_certain'];

  const severityColor = (s: Severity) =>
    ({ low: '#22c55e', medium: '#eab308', high: '#f97316', critical: '#ef4444' }[s]);

  return (
    <div className="risk-input-page">
      <div className="page-header">
        <div className="page-eyebrow">PHASE 01 — IDENTIFICATION</div>
        <h2 className="page-title">Risk Intelligence Map</h2>
        <p className="page-desc">
          Map your business vulnerabilities to generate a precision resilience blueprint.
        </p>
      </div>

      <div className="tab-switcher">
        <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
          ① Business Profile
        </button>
        <button className={`tab-btn ${activeTab === 'risks' ? 'active' : ''}`} onClick={() => setActiveTab('risks')}>
          ② Risk Factors ({risks.length})
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="panel">
          <div className="panel-title">Business Intelligence</div>
          <div className="form-grid">
            <div className="form-field">
              <label>Business Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => onUpdateProfile({ name: e.target.value })}
                placeholder="e.g. Sunrise Bakery"
                className="text-input"
              />
            </div>
            <div className="form-field">
              <label>Industry Sector</label>
              <select
                value={profile.industry}
                onChange={(e) => onUpdateProfile({ industry: e.target.value as IndustryType })}
                className="select-input"
              >
                {industryTemplates.map((t) => (
                  <option key={t.industry} value={t.industry}>{t.icon} {t.label}</option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label>Employees</label>
              <input
                type="number"
                value={profile.employeeCount}
                onChange={(e) => onUpdateProfile({ employeeCount: Number(e.target.value) })}
                min={1}
                className="text-input"
              />
            </div>
            <div className="form-field">
              <label>Annual Revenue</label>
              <select
                value={profile.annualRevenue}
                onChange={(e) => onUpdateProfile({ annualRevenue: e.target.value })}
                className="select-input"
              >
                <option value="under_100k">Under $100K</option>
                <option value="100k_500k">$100K – $500K</option>
                <option value="500k_1m">$500K – $1M</option>
                <option value="1m_5m">$1M – $5M</option>
                <option value="over_5m">Over $5M</option>
              </select>
            </div>
            <div className="form-field">
              <label>Years Operating</label>
              <input
                type="number"
                value={profile.yearsInOperation}
                onChange={(e) => onUpdateProfile({ yearsInOperation: Number(e.target.value) })}
                min={0}
                className="text-input"
              />
            </div>
          </div>
          <div className="checkbox-row">
            {[
              { key: 'hasInsurance', label: 'Has business insurance' },
              { key: 'hasEmergencyFund', label: 'Has emergency fund (3+ months)' },
              { key: 'diversifiedRevenue', label: 'Diversified revenue streams' },
            ].map(({ key, label }) => (
              <label key={key} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={profile[key as keyof BusinessProfile] as boolean}
                  onChange={(e) => onUpdateProfile({ [key]: e.target.checked })}
                  className="checkbox-input"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
          <div className="form-actions">
            <button className="btn-primary" onClick={() => setActiveTab('risks')}>
              Continue to Risk Mapping →
            </button>
          </div>
        </div>
      )}

      {activeTab === 'risks' && (
        <div className="risks-tab">
          <div className="template-section">
            <button
              className="btn-outline"
              onClick={() => setShowTemplates(!showTemplates)}
            >
              ⬡ Load Industry Template
            </button>
            {showTemplates && (
              <div className="template-grid">
                {industryTemplates.map((t) => (
                  <button
                    key={t.industry}
                    className="template-card"
                    onClick={() => {
                      onLoadTemplate(t.commonRisks, t.industry as IndustryType);
                      setShowTemplates(false);
                      onUpdateProfile({ industry: t.industry as IndustryType });
                    }}
                  >
                    <span className="template-icon">{t.icon}</span>
                    <span className="template-label">{t.label}</span>
                    <span className="template-count">{t.commonRisks.length} risks</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="two-col">
            <div className="panel">
              <div className="panel-title">Add Risk Factor</div>
              <div className="form-stack">
                <div className="form-field">
                  <label>Risk Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Primary supplier failure"
                    className="text-input"
                  />
                </div>
                <div className="form-field">
                  <label>Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as RiskCategory })}
                    className="select-input"
                  >
                    {Object.entries(categoryLabels).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Severity</label>
                    <div className="pill-group">
                      {severities.map((s) => (
                        <button
                          key={s}
                          className={`pill ${form.severity === s ? 'active' : ''}`}
                          style={form.severity === s ? { background: severityColor(s), borderColor: severityColor(s) } : {}}
                          onClick={() => setForm({ ...form, severity: s })}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="form-field">
                  <label>Likelihood</label>
                  <div className="pill-group">
                    {likelihoods.map((l) => (
                      <button
                        key={l}
                        className={`pill ${form.likelihood === l ? 'active' : ''}`}
                        onClick={() => setForm({ ...form, likelihood: l })}
                      >
                        {l.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-field">
                  <label>Business Impact Weight: <strong>{form.weight}/10</strong></label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={form.weight}
                    onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })}
                    className="range-input"
                  />
                </div>
                <div className="form-field">
                  <label>Description (optional)</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe the potential impact..."
                    rows={2}
                    className="textarea-input"
                  />
                </div>
                <button className="btn-primary" onClick={handleSubmit} disabled={!form.name.trim()}>
                  + Add Risk Factor
                </button>
              </div>
            </div>

            <div className="risks-list-panel">
              <div className="panel-title">
                Risk Register <span className="count-badge">{risks.length}</span>
              </div>
              {risks.length === 0 ? (
                <div className="empty-state">
                  <span>◈</span>
                  <p>No risks mapped yet.<br />Add risks manually or load an industry template.</p>
                </div>
              ) : (
                <div className="risks-list">
                  {risks.map((r) => (
                    <div key={r.id} className="risk-item">
                      <div className="risk-item-header">
                        <span
                          className="risk-category-dot"
                          style={{ background: categoryColors[r.category] }}
                        />
                        <span className="risk-name">{r.name}</span>
                        <button
                          className="risk-remove"
                          onClick={() => onRemoveRisk(r.id)}
                        >
                          ×
                        </button>
                      </div>
                      <div className="risk-item-meta">
                        <span className="risk-tag" style={{ color: categoryColors[r.category] }}>
                          {categoryLabels[r.category]}
                        </span>
                        <span className="risk-tag" style={{ color: severityColor(r.severity) }}>
                          {r.severity}
                        </span>
                        <span className="risk-tag">{r.likelihood.replace('_', ' ')}</span>
                        <span className="risk-score">Score: {r.riskScore}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {risks.length >= 2 && (
                <button
                  className="btn-primary generate-btn"
                  onClick={onGenerateBlueprint}
                  disabled={isGenerating}
                >
                  {isGenerating ? '⟳ Generating Blueprint...' : '⬢ Generate Blueprint'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskFactorInput;
