import { supabase } from "@/integrations/supabase/client";

export const PENDING_FINANCIAL_PROFILE_KEY = "pendingFinancialProfile";

type PendingFinancialProfile = {
  fullName?: string;
  age?: number;
  monthlyIncome?: number;
  monthlyExpenses?: number;
  currentSavings?: number;
  debtAmount?: number;
  financialGoals?: string[];
  riskTolerance?: string;
  investmentExperience?: string;
  emergencyFundMonths?: number;
};

const normalizePendingProfile = (profileData: PendingFinancialProfile) => ({
  full_name: profileData.fullName ?? "",
  age: profileData.age ?? null,
  monthly_income: profileData.monthlyIncome ?? null,
  monthly_expenses: profileData.monthlyExpenses ?? null,
  current_savings: profileData.currentSavings ?? null,
  debt_amount: profileData.debtAmount ?? null,
  financial_goals: profileData.financialGoals ?? [],
  risk_tolerance: profileData.riskTolerance ?? null,
  investment_experience: profileData.investmentExperience ?? null,
  emergency_fund_months: profileData.emergencyFundMonths ?? null,
});

export const getPendingFinancialProfile = (): PendingFinancialProfile | null => {
  const rawProfile = localStorage.getItem(PENDING_FINANCIAL_PROFILE_KEY);
  if (!rawProfile) return null;

  try {
    return JSON.parse(rawProfile) as PendingFinancialProfile;
  } catch (error) {
    console.error("Failed to parse pending financial profile:", error);
    localStorage.removeItem(PENDING_FINANCIAL_PROFILE_KEY);
    return null;
  }
};

export const hasPendingFinancialProfile = () =>
  Boolean(getPendingFinancialProfile());

export const storePendingFinancialProfile = (profile: PendingFinancialProfile) => {
  localStorage.setItem(PENDING_FINANCIAL_PROFILE_KEY, JSON.stringify(profile));
};

export const clearPendingFinancialProfile = () => {
  localStorage.removeItem(PENDING_FINANCIAL_PROFILE_KEY);
};

export const getUserFinancialProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("user_financial_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const savePendingFinancialProfile = async (userId: string) => {
  const pendingProfile = getPendingFinancialProfile();
  if (!pendingProfile) return null;

  const profilePayload = {
    user_id: userId,
    ...normalizePendingProfile(pendingProfile),
  };

  const existingProfile = await getUserFinancialProfile(userId);

  const query = existingProfile
    ? supabase
        .from("user_financial_profiles")
        .update(profilePayload)
        .eq("user_id", userId)
        .select("*")
        .single()
    : supabase
        .from("user_financial_profiles")
        .insert(profilePayload)
        .select("*")
        .single();

  const { data, error } = await query;

  if (error) throw error;

  clearPendingFinancialProfile();
  return data;
};

export const getPostAuthRedirectPath = async (userId: string) => {
  const profile = await getUserFinancialProfile(userId);
  return profile ? "/dashboard" : "/onboarding";
};
