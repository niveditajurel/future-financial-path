import type { Tables } from "@/integrations/supabase/types";

export type RiskTolerance = "conservative" | "moderate" | "aggressive";
export type InvestmentExperience = "beginner" | "intermediate" | "advanced";

export type FinancialProfileRecord = Tables<"user_financial_profiles">;

export type UserFinancialProfile = FinancialProfileRecord & {
  email?: string | null;
};

export type AssistantUserProfile = {
  name?: string;
  email?: string;
} & Record<string, unknown>;

export type AssistantContext = {
  monthlyIncome?: number | null;
  monthlyExpenses?: number | null;
  savings?: number | null;
  debtAmount?: number | null;
  goals?: string[] | null;
  emergencyFundMonths?: number | null;
} & Record<string, unknown>;

export type FinancialGoal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string | null;
  monthlyContributionNeeded?: number | null;
  aiPlan?: string | null;
};

export type DebtAccount = {
  id: string;
  name: string;
  type: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
  dueDate?: string | null;
};

export type InvestmentHolding = {
  id: string;
  accountType: string;
  assetCategory: string;
  currentValue: number;
  riskLevel: "low" | "medium" | "high";
};

export type Nudge = {
  id: string;
  eventType: string;
  message: string;
  priority: "low" | "medium" | "high";
  status: "new" | "read" | "dismissed";
};

export type FinancialHealthBand = "strong" | "stable" | "caution" | "urgent";

export type FinancialHealthAction = {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
};

export type FinancialHealthAssessment = {
  score: number;
  band: FinancialHealthBand;
  summary: string;
  metrics: {
    netIncome: number;
    savingsRate: number;
    emergencyFundCoverageMonths: number;
    debtToIncomeRatio: number;
    profileCompleteness: number;
  };
  strengths: string[];
  risks: string[];
  nextActions: FinancialHealthAction[];
};
