export type RiskCategory =
  | 'financial'
  | 'operational'
  | 'market'
  | 'supply_chain'
  | 'regulatory'
  | 'cyber'
  | 'natural_disaster'
  | 'talent';

export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type Likelihood = 'rare' | 'unlikely' | 'possible' | 'likely' | 'almost_certain';
export type IndustryType =
  | 'retail'
  | 'food_beverage'
  | 'technology'
  | 'manufacturing'
  | 'healthcare'
  | 'professional_services'
  | 'construction'
  | 'agriculture';

export interface RiskFactor {
  id: string;
  name: string;
  category: RiskCategory;
  severity: Severity;
  likelihood: Likelihood;
  description: string;
  weight: number; // 1-10
  riskScore?: number; // computed
}

export interface Strategy {
  id: string;
  title: string;
  description: string;
  category: RiskCategory;
  priority: 'immediate' | 'short_term' | 'long_term';
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  timelineWeeks: number;
  actions: string[];
  relatedRiskIds: string[];
  resources: string[];
  kpis: string[];
}

export interface BlueprintNode {
  id: string;
  type: 'risk' | 'strategy' | 'milestone' | 'outcome';
  label: string;
  x: number;
  y: number;
  severity?: Severity;
  priority?: Strategy['priority'];
  connected: string[];
}

export interface Blueprint {
  id: string;
  businessName: string;
  industry: IndustryType;
  createdAt: Date;
  updatedAt: Date;
  risks: RiskFactor[];
  strategies: Strategy[];
  nodes: BlueprintNode[];
  overallResilienceScore: number;
  stressTestResults?: StressTestResult[];
}

export interface StressScenario {
  id: string;
  name: string;
  description: string;
  icon: string;
  affectedCategories: RiskCategory[];
  severityMultiplier: number;
  likelihoodMultiplier: number;
  durationWeeks: number;
  economicImpactRange: [number, number]; // percentage revenue loss
}

export interface StressTestResult {
  scenarioId: string;
  scenarioName: string;
  resilienceScore: number;
  vulnerabilities: string[];
  survivabilityMonths: number;
  recommendedActions: string[];
  recoveryTimeWeeks: number;
  timestamp: Date;
}

export interface SuccessStory {
  id: string;
  industry: IndustryType;
  businessSize: 'solo' | 'micro' | 'small';
  challenge: string;
  strategiesUsed: string[];
  outcome: string;
  resilienceGain: number;
  timeToRecover?: number;
  tags: string[];
  anonymous: boolean;
}

export interface IndustryTemplate {
  industry: IndustryType;
  label: string;
  icon: string;
  commonRisks: Partial<RiskFactor>[];
  recommendedStrategies: string[];
  benchmarkResilienceScore: number;
}

export interface BusinessProfile {
  name: string;
  industry: IndustryType;
  employeeCount: number;
  annualRevenue: string;
  yearsInOperation: number;
  hasInsurance: boolean;
  hasEmergencyFund: boolean;
  diversifiedRevenue: boolean;
}

export type AppView = 'dashboard' | 'risk_input' | 'blueprint' | 'stress_test' | 'stories';
