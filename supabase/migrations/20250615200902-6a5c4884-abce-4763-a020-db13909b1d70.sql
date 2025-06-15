
-- Create a table for chat logs
CREATE TABLE IF NOT EXISTS public.chat_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  financial_data jsonb,
  ai_summary text,
  -- Optionally: store model, etc.
  model text,
  session_id text,
  -- For audit
  metadata jsonb
);

-- Enable RLS (row-level security)
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

-- Users can insert and select their own logs
CREATE POLICY "Users can insert their chat logs"
  ON public.chat_logs
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can select their chat logs"
  ON public.chat_logs
  FOR SELECT
  USING (user_id = auth.uid());
