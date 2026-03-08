import React, { useState } from 'react';
import { SuccessStory, IndustryType } from '../types';
import { successStories } from '../data/successStories';
import { industryTemplates } from '../data/industryTemplates';

const industryIcons: Partial<Record<IndustryType, string>> = {
  retail: '🛒',
  food_beverage: '🍽️',
  technology: '💻',
  manufacturing: '🏭',
  healthcare: '🏥',
  professional_services: '💼',
  construction: '🏗️',
  agriculture: '🌾',
};

const industryLabels: Partial<Record<IndustryType, string>> = {
  retail: 'Retail',
  food_beverage: 'Food & Beverage',
  technology: 'Technology',
  manufacturing: 'Manufacturing',
  healthcare: 'Healthcare',
  professional_services: 'Professional Services',
  construction: 'Construction',
  agriculture: 'Agriculture',
};

const SuccessStories: React.FC = () => {
  const [filterIndustry, setFilterIndustry] = useState<IndustryType | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTag, setSearchTag] = useState('');

  const allTags = Array.from(new Set(successStories.flatMap((s) => s.tags)));

  const filtered = successStories.filter((s) => {
    const matchIndustry = filterIndustry === 'all' || s.industry === filterIndustry;
    const matchTag = !searchTag || s.tags.includes(searchTag);
    return matchIndustry && matchTag;
  });

  return (
    <div className="stories-page">
      <div className="page-header">
        <div className="page-eyebrow">INTELLIGENCE ARCHIVE</div>
        <h2 className="page-title">Field Reports</h2>
        <p className="page-desc">
          Anonymized resilience success stories from real businesses. Filter by industry or topic
          to find strategies relevant to your situation.
        </p>
      </div>

      <div className="stories-filters">
        <div className="filter-row">
          <button
            className={`filter-pill ${filterIndustry === 'all' ? 'active' : ''}`}
            onClick={() => setFilterIndustry('all')}
          >
            All Industries
          </button>
          {industryTemplates.map((t) => (
            <button
              key={t.industry}
              className={`filter-pill ${filterIndustry === t.industry ? 'active' : ''}`}
              onClick={() => setFilterIndustry(t.industry as IndustryType)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
        <div className="tag-row">
          <span className="tag-label">Filter by topic:</span>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`tag-pill ${searchTag === tag ? 'active' : ''}`}
              onClick={() => setSearchTag(searchTag === tag ? '' : tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="stories-grid">
        {filtered.map((story) => {
          const isExpanded = expandedId === story.id;
          const icon = industryIcons[story.industry] || '◉';
          const label = industryLabels[story.industry] || story.industry;

          return (
            <div
              key={story.id}
              className={`story-card ${isExpanded ? 'expanded' : ''}`}
              onClick={() => setExpandedId(isExpanded ? null : story.id)}
            >
              <div className="story-card-header">
                <div className="story-industry-badge">
                  <span>{icon}</span>
                  <span>{label}</span>
                  <span className="story-size-badge">{story.businessSize}</span>
                </div>
                <div className="story-gain" style={{ color: '#22c55e' }}>
                  +{story.resilienceGain} pts
                </div>
              </div>

              <div className="story-challenge">
                <span className="story-label">CHALLENGE</span>
                <p>{story.challenge}</p>
              </div>

              {isExpanded && (
                <>
                  <div className="story-outcome">
                    <span className="story-label">OUTCOME</span>
                    <p>{story.outcome}</p>
                  </div>

                  <div className="story-strategies">
                    <span className="story-label">STRATEGIES APPLIED</span>
                    <div className="story-strategy-tags">
                      {story.strategiesUsed.map((s) => (
                        <span key={s} className="strategy-used-tag">
                          {s.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="story-metrics">
                    <div className="story-metric">
                      <div className="metric-val" style={{ color: '#22c55e' }}>+{story.resilienceGain}</div>
                      <div className="metric-label">Resilience Gain</div>
                    </div>
                    {story.timeToRecover !== undefined && (
                      <div className="story-metric">
                        <div className="metric-val" style={{ color: '#3b82f6' }}>
                          {story.timeToRecover === 0 ? 'N/A' : `${story.timeToRecover}w`}
                        </div>
                        <div className="metric-label">Recovery Time</div>
                      </div>
                    )}
                    <div className="story-metric">
                      <div className="metric-val" style={{ color: '#d97706' }}>
                        {story.businessSize.toUpperCase()}
                      </div>
                      <div className="metric-label">Business Size</div>
                    </div>
                  </div>
                </>
              )}

              <div className="story-tags">
                {story.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`story-tag-chip ${searchTag === tag ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchTag(searchTag === tag ? '' : tag);
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="story-expand-hint">
                {isExpanded ? '▲ Show less' : '▼ Read full report'}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <span>◉</span>
          <p>No field reports match your filters. Try a different industry or tag.</p>
        </div>
      )}
    </div>
  );
};

export default SuccessStories;
