import type {
  FinancialHealthAction,
  FinancialHealthAssessment,
  FinancialHealthBand,
  UserFinancialProfile,
} from "@/types/finwise";

const USD_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const formatCurrency = (amount: number) => USD_FORMATTER.format(amount);

export const calculateNetIncome = (profile: UserFinancialProfile) =>
  (profile.monthly_income ?? 0) - (profile.monthly_expenses ?? 0);

export const calculateSavingsRate = (profile: UserFinancialProfile) => {
  if (!profile.monthly_income || profile.monthly_income <= 0) return 0;
  return Math.round((calculateNetIncome(profile) / profile.monthly_income) * 100);
};

export const calculateEmergencyFundCoverageMonths = (
  profile: UserFinancialProfile,
) => {
  if (!profile.current_savings || !profile.monthly_expenses || profile.monthly_expenses <= 0) {
    return 0;
  }

  return Number((profile.current_savings / profile.monthly_expenses).toFixed(1));
};

export const calculateDebtToIncomeRatio = (profile: UserFinancialProfile) => {
  if (!profile.debt_amount || !profile.monthly_income || profile.monthly_income <= 0) {
    return 0;
  }

  return Math.round((profile.debt_amount / (profile.monthly_income * 12)) * 100);
};

export const calculateProfileCompleteness = (profile: UserFinancialProfile) => {
  const checks = [
    Boolean(profile.full_name),
    profile.age !== null,
    profile.monthly_income !== null,
    profile.monthly_expenses !== null,
    profile.current_savings !== null,
    profile.debt_amount !== null,
    Boolean(profile.financial_goals?.length),
    profile.risk_tolerance !== null,
    profile.investment_experience !== null,
    profile.emergency_fund_months !== null,
  ];

  const completed = checks.filter(Boolean).length;
  return Math.round((completed / checks.length) * 100);
};

const determineBand = (score: number): FinancialHealthBand => {
  if (score >= 80) return "strong";
  if (score >= 65) return "stable";
  if (score >= 45) return "caution";
  return "urgent";
};

const dedupeActions = (actions: FinancialHealthAction[]) => {
  const seen = new Set<string>();
  return actions.filter((action) => {
    if (seen.has(action.title)) return false;
    seen.add(action.title);
    return true;
  });
};

export const buildFinancialHealthAssessment = (
  profile: UserFinancialProfile,
): FinancialHealthAssessment => {
  const netIncome = calculateNetIncome(profile);
  const savingsRate = calculateSavingsRate(profile);
  const emergencyFundCoverageMonths = calculateEmergencyFundCoverageMonths(profile);
  const debtToIncomeRatio = calculateDebtToIncomeRatio(profile);
  const profileCompleteness = calculateProfileCompleteness(profile);

  let score = 45;
  const strengths: string[] = [];
  const risks: string[] = [];
  const nextActions: FinancialHealthAction[] = [];

  if (savingsRate >= 20) {
    score += 18;
    strengths.push("Your savings rate is strong for long-term wealth building.");
  } else if (savingsRate >= 10) {
    score += 10;
    strengths.push("You are saving part of your income consistently.");
  } else if (savingsRate > 0) {
    score += 3;
    risks.push("Your savings rate is positive, but still leaves limited room for goals.");
    nextActions.push({
      title: "Increase monthly savings",
      description: "Review recurring expenses or direct more of each paycheck into savings.",
      priority: "medium",
    });
  } else {
    score -= 12;
    risks.push("Your current cash flow suggests little or no room for saving.");
    nextActions.push({
      title: "Stabilize cash flow",
      description: "Reduce monthly spending or increase income before taking on more financial goals.",
      priority: "high",
    });
  }

  if (emergencyFundCoverageMonths >= 6) {
    score += 18;
    strengths.push("Your emergency fund gives you a strong financial cushion.");
  } else if (emergencyFundCoverageMonths >= 3) {
    score += 12;
    strengths.push("You have a reasonable emergency fund base.");
  } else if (emergencyFundCoverageMonths >= 1) {
    score += 4;
    risks.push("Your emergency fund may not yet cover several months of expenses.");
    nextActions.push({
      title: "Build emergency savings",
      description: "Aim for at least 3 to 6 months of essential expenses in cash savings.",
      priority: "high",
    });
  } else {
    score -= 10;
    risks.push("You do not yet have enough emergency savings for unexpected costs.");
    nextActions.push({
      title: "Start an emergency fund",
      description: "Build a starter safety buffer before increasing investment risk.",
      priority: "high",
    });
  }

  if (debtToIncomeRatio === 0 && (profile.debt_amount ?? 0) === 0) {
    score += 12;
    strengths.push("You are not carrying debt right now.");
  } else if (debtToIncomeRatio <= 15) {
    score += 8;
    strengths.push("Your debt load looks manageable relative to your income.");
  } else if (debtToIncomeRatio <= 30) {
    score += 2;
    risks.push("Debt is present and should be monitored before adding new obligations.");
    nextActions.push({
      title: "Track debt payoff progress",
      description: "Review whether extra payments could improve flexibility for other goals.",
      priority: "medium",
    });
  } else if (debtToIncomeRatio <= 50) {
    score -= 8;
    risks.push("Debt is taking a meaningful share of your financial capacity.");
    nextActions.push({
      title: "Prioritize high-interest debt",
      description: "Consider a debt payoff plan before increasing investing or discretionary spending.",
      priority: "high",
    });
  } else {
    score -= 16;
    risks.push("Your debt load is high relative to income and may slow other goals.");
    nextActions.push({
      title: "Create a debt strategy",
      description: "Compare payoff methods and focus extra cash on the most expensive debt first.",
      priority: "high",
    });
  }

  if (profile.financial_goals?.length) {
    score += 6;
    strengths.push("You already have stated financial goals to plan around.");
  } else {
    nextActions.push({
      title: "Set your first goal",
      description: "Create a target like an emergency fund, debt payoff plan, or travel fund.",
      priority: "medium",
    });
  }

  if (profile.risk_tolerance && profile.investment_experience) {
    score += 4;
  }

  if (profileCompleteness >= 90) {
    score += 8;
  } else if (profileCompleteness >= 70) {
    score += 4;
  } else {
    nextActions.push({
      title: "Complete your profile",
      description: "Add the missing financial details so recommendations can be more precise.",
      priority: "medium",
    });
  }

  score = clamp(score, 0, 100);
  const band = determineBand(score);

  const summaryByBand: Record<FinancialHealthBand, string> = {
    strong:
      "Your finances are on a solid track. Focus on maintaining momentum and moving your long-term goals forward.",
    stable:
      "You have a workable foundation with a few areas that can be improved to strengthen resilience and goal progress.",
    caution:
      "Your finances show some pressure points. A few focused moves could improve stability and reduce tradeoff stress.",
    urgent:
      "Your financial foundation needs attention before taking on more risk. Focus on cash flow, emergency savings, and debt control first.",
  };

  return {
    score,
    band,
    summary: summaryByBand[band],
    metrics: {
      netIncome,
      savingsRate,
      emergencyFundCoverageMonths,
      debtToIncomeRatio,
      profileCompleteness,
    },
    strengths,
    risks,
    nextActions: dedupeActions(nextActions).slice(0, 3),
  };
};

export const buildRuleBasedAdvice = (profile: UserFinancialProfile) => {
  const assessment = buildFinancialHealthAssessment(profile);
  const firstAction = assessment.nextActions[0];

  if (firstAction) {
    return `${assessment.summary} Right now, your top priority is to ${firstAction.title.toLowerCase()}.`;
  }

  return assessment.summary;
};
