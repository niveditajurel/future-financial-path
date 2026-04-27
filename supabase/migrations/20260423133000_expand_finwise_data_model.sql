-- Expand the FinWise data model beyond a single financial profile.
-- This creates the core planning tables needed for goals, debt guidance,
-- investment insights, expense tracking, and proactive nudges.

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE IF NOT EXISTS public.income_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  source_name TEXT NOT NULL,
  source_type TEXT NOT NULL DEFAULT 'salary',
  amount DECIMAL(12,2) NOT NULL CHECK (amount >= 0),
  frequency TEXT NOT NULL CHECK (
    frequency IN ('weekly', 'biweekly', 'monthly', 'quarterly', 'annual', 'one_time')
  ),
  is_primary BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.expense_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  category TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL CHECK (amount >= 0),
  frequency TEXT NOT NULL CHECK (
    frequency IN ('weekly', 'biweekly', 'monthly', 'quarterly', 'annual', 'one_time')
  ),
  is_recurring BOOLEAN NOT NULL DEFAULT true,
  occurred_on DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.debt_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  debt_name TEXT NOT NULL,
  debt_type TEXT NOT NULL,
  balance DECIMAL(12,2) NOT NULL CHECK (balance >= 0),
  interest_rate DECIMAL(6,3) NOT NULL DEFAULT 0 CHECK (interest_rate >= 0),
  minimum_payment DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (minimum_payment >= 0),
  due_day INTEGER CHECK (due_day BETWEEN 1 AND 31),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.investment_holdings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  account_name TEXT NOT NULL,
  account_type TEXT NOT NULL,
  asset_category TEXT NOT NULL,
  current_value DECIMAL(12,2) NOT NULL CHECK (current_value >= 0),
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
  concentration_percent DECIMAL(5,2) CHECK (
    concentration_percent IS NULL OR
    (concentration_percent >= 0 AND concentration_percent <= 100)
  ),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.financial_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  goal_name TEXT NOT NULL,
  goal_type TEXT NOT NULL,
  target_amount DECIMAL(12,2) NOT NULL CHECK (target_amount >= 0),
  current_amount DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (current_amount >= 0),
  target_date DATE,
  monthly_contribution_target DECIMAL(12,2) CHECK (monthly_contribution_target IS NULL OR monthly_contribution_target >= 0),
  ai_plan TEXT,
  is_archived BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.nudges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  message TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'dismissed')),
  metadata JSONB,
  surfaced_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.income_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expense_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.debt_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nudges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own income sources"
  ON public.income_sources
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own income sources"
  ON public.income_sources
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own income sources"
  ON public.income_sources
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own income sources"
  ON public.income_sources
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own expense entries"
  ON public.expense_entries
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own expense entries"
  ON public.expense_entries
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own expense entries"
  ON public.expense_entries
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expense entries"
  ON public.expense_entries
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own debt accounts"
  ON public.debt_accounts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own debt accounts"
  ON public.debt_accounts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own debt accounts"
  ON public.debt_accounts
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own debt accounts"
  ON public.debt_accounts
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own investment holdings"
  ON public.investment_holdings
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own investment holdings"
  ON public.investment_holdings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own investment holdings"
  ON public.investment_holdings
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own investment holdings"
  ON public.investment_holdings
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own financial goals"
  ON public.financial_goals
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own financial goals"
  ON public.financial_goals
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own financial goals"
  ON public.financial_goals
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own financial goals"
  ON public.financial_goals
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own nudges"
  ON public.nudges
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own nudges"
  ON public.nudges
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own nudges"
  ON public.nudges
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own nudges"
  ON public.nudges
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE TRIGGER update_income_sources_updated_at
  BEFORE UPDATE ON public.income_sources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_expense_entries_updated_at
  BEFORE UPDATE ON public.expense_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_debt_accounts_updated_at
  BEFORE UPDATE ON public.debt_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_investment_holdings_updated_at
  BEFORE UPDATE ON public.investment_holdings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_financial_goals_updated_at
  BEFORE UPDATE ON public.financial_goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_nudges_updated_at
  BEFORE UPDATE ON public.nudges
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
