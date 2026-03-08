import { useState, useCallback } from 'react';
import { Blueprint, RiskFactor, Strategy, BusinessProfile, IndustryType } from '../types';
import { calculateRiskScore, calculateOverallResilienceScore, generateRiskId } from '../engine/riskCalculator';
import { generateStrategiesForRisks } from '../engine/strategyEngine';
import { generateBlueprintNodes } from '../engine/blueprintLayout';

const defaultProfile: BusinessProfile = {
  name: '',
  industry: 'retail',
  employeeCount: 1,
  annualRevenue: 'under_100k',
  yearsInOperation: 1,
  hasInsurance: false,
  hasEmergencyFund: false,
  diversifiedRevenue: false,
};

export function useBlueprint() {
  const [profile, setProfile] = useState<BusinessProfile>(defaultProfile);
  const [risks, setRisks] = useState<RiskFactor[]>([]);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const updateProfile = useCallback((updates: Partial<BusinessProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const addRisk = useCallback((risk: Omit<RiskFactor, 'id' | 'riskScore'>) => {
    const newRisk: RiskFactor = {
      ...risk,
      id: generateRiskId(),
      riskScore: 0,
    };
    newRisk.riskScore = calculateRiskScore(newRisk);
    setRisks((prev) => [...prev, newRisk]);
  }, []);

  const updateRisk = useCallback((id: string, updates: Partial<RiskFactor>) => {
    setRisks((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const updated = { ...r, ...updates };
        updated.riskScore = calculateRiskScore(updated);
        return updated;
      })
    );
  }, []);

  const removeRisk = useCallback((id: string) => {
    setRisks((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const loadIndustryTemplate = useCallback(
    (template: Partial<RiskFactor>[], industry: IndustryType) => {
      const templateRisks: RiskFactor[] = template.map((t) => {
        const risk: RiskFactor = {
          id: generateRiskId(),
          name: t.name || 'Unknown Risk',
          category: t.category || 'financial',
          severity: t.severity || 'medium',
          likelihood: t.likelihood || 'possible',
          description: t.description || '',
          weight: t.weight || 5,
          riskScore: 0,
        };
        risk.riskScore = calculateRiskScore(risk);
        return risk;
      });
      setRisks(templateRisks);
      updateProfile({ industry });
    },
    [updateProfile]
  );

  const generateBlueprint = useCallback(() => {
    setIsGenerating(true);
    setTimeout(() => {
      const scoredRisks = risks.map((r) => ({ ...r, riskScore: calculateRiskScore(r) }));
      const generatedStrategies = generateStrategiesForRisks(scoredRisks);
      const nodes = generateBlueprintNodes(scoredRisks, generatedStrategies);
      const resilienceScore = calculateOverallResilienceScore(scoredRisks);

      const newBlueprint: Blueprint = {
        id: `bp-${Date.now()}`,
        businessName: profile.name || 'My Business',
        industry: profile.industry,
        createdAt: new Date(),
        updatedAt: new Date(),
        risks: scoredRisks,
        strategies: generatedStrategies,
        nodes,
        overallResilienceScore: resilienceScore,
        stressTestResults: [],
      };

      setStrategies(generatedStrategies);
      setBlueprint(newBlueprint);
      setIsGenerating(false);
    }, 1200);
  }, [risks, profile]);

  const addStressTestResult = useCallback(
    (result: import('../types').StressTestResult) => {
      setBlueprint((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          stressTestResults: [...(prev.stressTestResults || []), result],
        };
      });
    },
    []
  );

  return {
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
  };
}
