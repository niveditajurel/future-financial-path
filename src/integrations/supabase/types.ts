export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_logs: {
        Row: {
          ai_summary: string | null
          created_at: string
          financial_data: Json | null
          id: string
          metadata: Json | null
          model: string | null
          session_id: string | null
          user_id: string
        }
        Insert: {
          ai_summary?: string | null
          created_at?: string
          financial_data?: Json | null
          id?: string
          metadata?: Json | null
          model?: string | null
          session_id?: string | null
          user_id: string
        }
        Update: {
          ai_summary?: string | null
          created_at?: string
          financial_data?: Json | null
          id?: string
          metadata?: Json | null
          model?: string | null
          session_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      debt_accounts: {
        Row: {
          balance: number
          created_at: string
          debt_name: string
          debt_type: string
          due_day: number | null
          id: string
          interest_rate: number
          minimum_payment: number
          notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          balance: number
          created_at?: string
          debt_name: string
          debt_type: string
          due_day?: number | null
          id?: string
          interest_rate?: number
          minimum_payment?: number
          notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string
          debt_name?: string
          debt_type?: string
          due_day?: number | null
          id?: string
          interest_rate?: number
          minimum_payment?: number
          notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      expense_entries: {
        Row: {
          amount: number
          category: string
          created_at: string
          frequency: string
          id: string
          is_recurring: boolean
          notes: string | null
          occurred_on: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          frequency: string
          id?: string
          is_recurring?: boolean
          notes?: string | null
          occurred_on?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          frequency?: string
          id?: string
          is_recurring?: boolean
          notes?: string | null
          occurred_on?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      financial_goals: {
        Row: {
          ai_plan: string | null
          created_at: string
          current_amount: number
          goal_name: string
          goal_type: string
          id: string
          is_archived: boolean
          monthly_contribution_target: number | null
          target_amount: number
          target_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_plan?: string | null
          created_at?: string
          current_amount?: number
          goal_name: string
          goal_type: string
          id?: string
          is_archived?: boolean
          monthly_contribution_target?: number | null
          target_amount: number
          target_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_plan?: string | null
          created_at?: string
          current_amount?: number
          goal_name?: string
          goal_type?: string
          id?: string
          is_archived?: boolean
          monthly_contribution_target?: number | null
          target_amount?: number
          target_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      income_sources: {
        Row: {
          amount: number
          created_at: string
          frequency: string
          id: string
          is_primary: boolean
          notes: string | null
          source_name: string
          source_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          frequency: string
          id?: string
          is_primary?: boolean
          notes?: string | null
          source_name: string
          source_type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          frequency?: string
          id?: string
          is_primary?: boolean
          notes?: string | null
          source_name?: string
          source_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      investment_holdings: {
        Row: {
          account_name: string
          account_type: string
          asset_category: string
          concentration_percent: number | null
          created_at: string
          current_value: number
          id: string
          notes: string | null
          risk_level: string
          updated_at: string
          user_id: string
        }
        Insert: {
          account_name: string
          account_type: string
          asset_category: string
          concentration_percent?: number | null
          created_at?: string
          current_value: number
          id?: string
          notes?: string | null
          risk_level: string
          updated_at?: string
          user_id: string
        }
        Update: {
          account_name?: string
          account_type?: string
          asset_category?: string
          concentration_percent?: number | null
          created_at?: string
          current_value?: number
          id?: string
          notes?: string | null
          risk_level?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      nudges: {
        Row: {
          created_at: string
          event_type: string
          id: string
          message: string
          metadata: Json | null
          priority: string
          status: string
          surfaced_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          message: string
          metadata?: Json | null
          priority: string
          status?: string
          surfaced_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          message?: string
          metadata?: Json | null
          priority?: string
          status?: string
          surfaced_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_financial_profiles: {
        Row: {
          age: number | null
          created_at: string
          current_savings: number | null
          debt_amount: number | null
          emergency_fund_months: number | null
          financial_goals: string[] | null
          full_name: string
          id: string
          investment_experience: string | null
          monthly_expenses: number | null
          monthly_income: number | null
          risk_tolerance: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: number | null
          created_at?: string
          current_savings?: number | null
          debt_amount?: number | null
          emergency_fund_months?: number | null
          financial_goals?: string[] | null
          full_name: string
          id?: string
          investment_experience?: string | null
          monthly_expenses?: number | null
          monthly_income?: number | null
          risk_tolerance?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number | null
          created_at?: string
          current_savings?: number | null
          debt_amount?: number | null
          emergency_fund_months?: number | null
          financial_goals?: string[] | null
          full_name?: string
          id?: string
          investment_experience?: string | null
          monthly_expenses?: number | null
          monthly_income?: number | null
          risk_tolerance?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
