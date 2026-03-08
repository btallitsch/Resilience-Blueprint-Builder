import { IndustryTemplate, RiskCategory } from '../types';

export const industryTemplates: IndustryTemplate[] = [
  {
    industry: 'retail',
    label: 'Retail & E-Commerce',
    icon: '🛒',
    benchmarkResilienceScore: 62,
    commonRisks: [
      { name: 'Supply Chain Disruption', category: 'supply_chain', severity: 'high', likelihood: 'likely', weight: 8 },
      { name: 'Economic Downturn Impact', category: 'financial', severity: 'high', likelihood: 'possible', weight: 9 },
      { name: 'E-commerce Competition', category: 'market', severity: 'medium', likelihood: 'almost_certain', weight: 7 },
      { name: 'Cybersecurity Breach', category: 'cyber', severity: 'high', likelihood: 'possible', weight: 7 },
      { name: 'Seasonal Revenue Volatility', category: 'financial', severity: 'medium', likelihood: 'almost_certain', weight: 6 },
    ],
    recommendedStrategies: ['omnichannel_presence', 'inventory_diversification', 'loyalty_program', 'cybersecurity_audit'],
  },
  {
    industry: 'food_beverage',
    label: 'Food & Beverage',
    icon: '🍽️',
    benchmarkResilienceScore: 55,
    commonRisks: [
      { name: 'Food Safety Incident', category: 'regulatory', severity: 'critical', likelihood: 'unlikely', weight: 10 },
      { name: 'Ingredient Supply Shortage', category: 'supply_chain', severity: 'high', likelihood: 'possible', weight: 8 },
      { name: 'Health Crisis Closure', category: 'operational', severity: 'critical', likelihood: 'unlikely', weight: 9 },
      { name: 'Staff Turnover', category: 'talent', severity: 'medium', likelihood: 'likely', weight: 6 },
      { name: 'Rising Food Costs', category: 'financial', severity: 'high', likelihood: 'almost_certain', weight: 8 },
    ],
    recommendedStrategies: ['supplier_diversification', 'cross_training', 'cash_reserve_fund', 'delivery_partnerships'],
  },
  {
    industry: 'technology',
    label: 'Technology & SaaS',
    icon: '💻',
    benchmarkResilienceScore: 71,
    commonRisks: [
      { name: 'Cybersecurity Attack', category: 'cyber', severity: 'critical', likelihood: 'possible', weight: 10 },
      { name: 'Key Developer Departure', category: 'talent', severity: 'high', likelihood: 'possible', weight: 9 },
      { name: 'Cloud Infrastructure Failure', category: 'operational', severity: 'high', likelihood: 'unlikely', weight: 8 },
      { name: 'Regulatory Compliance', category: 'regulatory', severity: 'high', likelihood: 'possible', weight: 7 },
      { name: 'Market Disruption by AI', category: 'market', severity: 'critical', likelihood: 'likely', weight: 9 },
    ],
    recommendedStrategies: ['security_hardening', 'knowledge_documentation', 'multi_cloud_strategy', 'compliance_audit'],
  },
  {
    industry: 'manufacturing',
    label: 'Manufacturing',
    icon: '🏭',
    benchmarkResilienceScore: 58,
    commonRisks: [
      { name: 'Equipment Breakdown', category: 'operational', severity: 'high', likelihood: 'likely', weight: 8 },
      { name: 'Raw Material Shortage', category: 'supply_chain', severity: 'high', likelihood: 'possible', weight: 9 },
      { name: 'Workplace Safety Incident', category: 'operational', severity: 'critical', likelihood: 'unlikely', weight: 9 },
      { name: 'Regulatory Change', category: 'regulatory', severity: 'medium', likelihood: 'possible', weight: 6 },
      { name: 'Energy Price Spike', category: 'financial', severity: 'high', likelihood: 'likely', weight: 7 },
    ],
    recommendedStrategies: ['preventive_maintenance', 'supplier_contracts', 'safety_training', 'energy_efficiency'],
  },
  {
    industry: 'healthcare',
    label: 'Healthcare & Wellness',
    icon: '🏥',
    benchmarkResilienceScore: 68,
    commonRisks: [
      { name: 'Malpractice Liability', category: 'regulatory', severity: 'critical', likelihood: 'unlikely', weight: 10 },
      { name: 'Insurance Reimbursement Change', category: 'financial', severity: 'high', likelihood: 'possible', weight: 8 },
      { name: 'Staff Burnout & Shortage', category: 'talent', severity: 'high', likelihood: 'likely', weight: 9 },
      { name: 'Data Privacy Breach', category: 'cyber', severity: 'critical', likelihood: 'possible', weight: 9 },
      { name: 'Health Crisis Surge', category: 'operational', severity: 'high', likelihood: 'possible', weight: 7 },
    ],
    recommendedStrategies: ['malpractice_insurance', 'staff_wellness', 'hipaa_compliance', 'telehealth_expansion'],
  },
  {
    industry: 'professional_services',
    label: 'Professional Services',
    icon: '💼',
    benchmarkResilienceScore: 65,
    commonRisks: [
      { name: 'Client Concentration Risk', category: 'financial', severity: 'high', likelihood: 'possible', weight: 9 },
      { name: 'Key Person Dependency', category: 'talent', severity: 'critical', likelihood: 'possible', weight: 9 },
      { name: 'Reputation Damage', category: 'market', severity: 'high', likelihood: 'unlikely', weight: 8 },
      { name: 'Scope Creep & Cash Flow', category: 'financial', severity: 'medium', likelihood: 'likely', weight: 7 },
      { name: 'Remote Work Disruption', category: 'operational', severity: 'low', likelihood: 'possible', weight: 4 },
    ],
    recommendedStrategies: ['client_diversification', 'retainer_contracts', 'reputation_management', 'processes_documentation'],
  },
  {
    industry: 'construction',
    label: 'Construction & Trades',
    icon: '🏗️',
    benchmarkResilienceScore: 52,
    commonRisks: [
      { name: 'Project Delay & Cost Overrun', category: 'operational', severity: 'high', likelihood: 'almost_certain', weight: 8 },
      { name: 'Material Price Inflation', category: 'financial', severity: 'high', likelihood: 'likely', weight: 9 },
      { name: 'Worker Injury Liability', category: 'operational', severity: 'critical', likelihood: 'possible', weight: 10 },
      { name: 'Permit & Regulatory Delays', category: 'regulatory', severity: 'medium', likelihood: 'likely', weight: 6 },
      { name: 'Weather Disruption', category: 'natural_disaster', severity: 'medium', likelihood: 'likely', weight: 5 },
    ],
    recommendedStrategies: ['fixed_price_contracts', 'material_hedging', 'liability_insurance', 'permit_pre_approval'],
  },
  {
    industry: 'agriculture',
    label: 'Agriculture & Farming',
    icon: '🌾',
    benchmarkResilienceScore: 48,
    commonRisks: [
      { name: 'Crop Failure / Drought', category: 'natural_disaster', severity: 'critical', likelihood: 'possible', weight: 10 },
      { name: 'Commodity Price Crash', category: 'market', severity: 'high', likelihood: 'possible', weight: 8 },
      { name: 'Pest or Disease Outbreak', category: 'operational', severity: 'critical', likelihood: 'unlikely', weight: 9 },
      { name: 'Water Access Restrictions', category: 'regulatory', severity: 'high', likelihood: 'possible', weight: 7 },
      { name: 'Seasonal Labor Shortage', category: 'talent', severity: 'high', likelihood: 'likely', weight: 7 },
    ],
    recommendedStrategies: ['crop_insurance', 'market_diversification', 'water_conservation', 'labor_mechanization'],
  },
];

export const getTemplateByIndustry = (industry: string): IndustryTemplate | undefined =>
  industryTemplates.find((t) => t.industry === industry);
