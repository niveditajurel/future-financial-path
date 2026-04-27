import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CircleArrowUp, CircleArrowDown, CircleArrowRight, ArrowLeft, User, AlertTriangle, Activity } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AiFinancialAdvisor } from "@/components/AiFinancialAdvisor";
import { UserMenu } from "@/components/UserMenu";
import { AiChatBubble } from "@/components/AiChatBubble";
import {
  buildFinancialHealthAssessment,
  buildRuleBasedAdvice,
  calculateNetIncome,
  calculateSavingsRate,
  formatCurrency,
} from "@/lib/finance/metrics";
import type { AssistantContext, UserFinancialProfile } from "@/types/finwise";
import { useAuth } from "@/contexts/AuthContext";

const INVESTMENT_COLORS = [
  "#F67011",
  "#FFE4D0",
  "#873800",
];

// Demo data for non-authenticated users
const DEMO_PROFILE: UserFinancialProfile = {
  id: "demo",
  user_id: "demo-user",
  full_name: "Demo User",
  email: "demo@finwise.app",
  age: 28,
  monthly_income: 5000,
  monthly_expenses: 3500,
  current_savings: 15000,
  debt_amount: 8000,
  financial_goals: ["Emergency Fund", "House Down Payment", "Retirement"],
  risk_tolerance: "moderate",
  investment_experience: "beginner",
  emergency_fund_months: 4,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [userProfile, setUserProfile] = useState<UserFinancialProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) {
      return;
    }

    let isMounted = true;

    const fetchUserProfile = async () => {

      try {
        console.log('Dashboard: Starting to fetch user profile...');
        setLoading(true);
        setError(null);

        if (!user) {
          console.log('Dashboard: No authenticated user, showing demo');
          if (!isMounted) return;
          setUserProfile(DEMO_PROFILE);
          setIsDemo(true);
          setLoading(false);
          return;
        }

        console.log('Dashboard: Authenticated user found:', user.id);
        setIsDemo(false);

        const { data: profileData, error: fetchError } = await supabase
          .from("user_financial_profiles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (!isMounted) return;

        if (fetchError) {
          console.error("Dashboard: Database error fetching profile:", fetchError);
          setError(`Database error: ${fetchError.message}`);
          return;
        }

        if (!profileData || !profileData.full_name) {
          console.log('Dashboard: No complete profile found, redirecting to onboarding');
          navigate("/onboarding", { replace: true });
          return;
        }

        console.log('Dashboard: Setting complete profile');
        setUserProfile(profileData);
      } catch (error) {
        if (!isMounted) return;
        console.error("Dashboard: Unexpected error:", error);
        setError('An unexpected error occurred while loading your profile');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchUserProfile();

    return () => {
      isMounted = false;
    };
  }, [authLoading, navigate, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-background via-secondary to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading your financial dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !userProfile || (!isDemo && !userProfile.full_name)) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-background via-secondary to-background py-10 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="bg-card rounded-2xl p-8 shadow-xl border border-primary/20">
            <User className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-primary mb-4">Welcome to Your Financial Dashboard</h1>
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
            <p className="text-lg text-muted-foreground mb-8">
              To get started with personalized insights and AI-powered advice, please complete your financial profile.
            </p>
            <div className="space-y-4">
              <Link to="/onboarding">
                <Button className="px-8 py-4 text-lg bg-primary hover:bg-primary/90">
                  Complete Your Profile
                </Button>
              </Link>
              <div className="text-sm text-muted-foreground">
                <p>Takes just 2-3 minutes • Get instant AI analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const health = buildFinancialHealthAssessment(userProfile);
  const netIncome = calculateNetIncome(userProfile);
  const savingsRate = calculateSavingsRate(userProfile);
  
  // Mock spending data based on user's expenses
  const monthlySpending = [
    { month: "Jan", amount: (userProfile.monthly_expenses || 0) * 0.9 },
    { month: "Feb", amount: (userProfile.monthly_expenses || 0) * 0.95 },
    { month: "Mar", amount: (userProfile.monthly_expenses || 0) * 1.1 },
    { month: "Apr", amount: (userProfile.monthly_expenses || 0) * 0.85 },
    { month: "May", amount: userProfile.monthly_expenses || 0 },
    { month: "Jun", amount: (userProfile.monthly_expenses || 0) * 0.8 },
  ];

  // Mock investments based on current savings
  const totalSavings = userProfile.current_savings || 0;
  const investments = [
    { category: "Savings Account", value: totalSavings * 0.6 },
    { category: "Emergency Fund", value: totalSavings * 0.3 },
    { category: "Investments", value: totalSavings * 0.1 }
  ];

  const aiAdvice = buildRuleBasedAdvice(userProfile);
  const assistantContext: AssistantContext = {
    monthlyIncome: userProfile.monthly_income,
    monthlyExpenses: userProfile.monthly_expenses,
    savings: userProfile.current_savings,
    debtAmount: userProfile.debt_amount,
    goals: userProfile.financial_goals,
    emergencyFundMonths: userProfile.emergency_fund_months,
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-background via-secondary to-background py-6 md:py-10 px-3 md:px-6 lg:px-10">
      {/* Header with Back button and User Menu */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6 md:mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-xs md:text-sm bg-card border border-border rounded-md px-3 md:px-4 py-2 shadow 
          hover:bg-highlight transition animate-fade-in text-primary">
          <ArrowLeft size={16} className="md:w-[18px] md:h-[18px]" /> Back to Home
        </Link>
        
        <UserMenu userProfile={userProfile} isDemo={isDemo} />
      </div>
      
      {/* Demo Banner */}
      {isDemo && (
        <div className="max-w-4xl mx-auto mb-6 md:mb-8">
          <div className="bg-accent/20 border border-accent/30 text-accent-foreground rounded-lg p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 shadow animate-fade-in">
            <AlertTriangle size={24} className="md:w-8 md:h-8 text-accent flex-shrink-0" />
            <div>
              <div className="font-semibold text-base md:text-lg mb-1">
                📊 Dashboard Demo Mode
              </div>
              <div className="text-xs md:text-sm opacity-95 leading-relaxed">
                This is a preview with sample data. Sign up to see your real financial dashboard with personalized AI advice!
              </div>
            </div>
            <Link to="/auth" className="ml-auto">
              <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent/10">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      {/* Personalized Greeting */}
      <div className="max-w-4xl mx-auto mb-6 md:mb-8">
        <div className="bg-primary text-primary-foreground rounded-lg p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 shadow animate-fade-in">
          <CircleArrowUp size={24} className="md:w-8 md:h-8 text-white flex-shrink-0" />
          <div>
            <div className="font-semibold text-base md:text-lg mb-1 flicker-text">
              Hi {userProfile.full_name}! 👋
            </div>
            <div className="text-xs md:text-sm opacity-95 leading-relaxed">{aiAdvice}</div>
          </div>
        </div>
      </div>
      
      {/* Summary Cards with real data */}
      <div className="grid gap-4 md:gap-6 mb-8 md:mb-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 max-w-7xl mx-auto">
        <Card className="shadow hover:scale-105 hover:shadow-lg hover:bg-highlight/40 bg-secondary text-primary-foreground transition-all border-primary">
          <CardHeader className="flex flex-row items-center gap-2 pb-2 md:pb-1">
            <Activity className="text-primary w-5 h-5 md:w-6 md:h-6" />
            <CardTitle className="text-base md:text-lg">Health Score</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl md:text-2xl font-bold text-primary">{health.score}/100</div>
            <CardDescription className="mt-2 text-xs md:text-sm">
              <span className="font-semibold capitalize text-success">{health.band}</span>
              {" "}
              financial foundation
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="shadow hover:scale-105 hover:shadow-lg hover:bg-highlight/40 bg-secondary text-primary-foreground transition-all border-primary">
          <CardHeader className="flex flex-row items-center gap-2 pb-2 md:pb-1">
            <CircleArrowUp className="text-primary w-5 h-5 md:w-6 md:h-6" />
            <CardTitle className="text-base md:text-lg">Net Income</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl md:text-2xl font-bold text-primary">{formatCurrency(netIncome)}</div>
            <CardDescription className="mt-2 text-xs md:text-sm">
              <span className="font-semibold text-success">Monthly after expenses</span>
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card className="shadow hover:scale-105 hover:shadow-lg hover:bg-highlight/40 bg-secondary text-primary-foreground transition-all border border-red-400">
          <CardHeader className="flex flex-row items-center gap-2 pb-2 md:pb-1">
            <CircleArrowDown className="text-red-500 w-5 h-5 md:w-6 md:h-6" />
            <CardTitle className="text-base md:text-lg">Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl md:text-2xl font-bold text-red-400">{formatCurrency(userProfile.monthly_expenses || 0)}</div>
            <CardDescription className="mt-2 text-xs md:text-sm text-red-400">
              <span>Total monthly spending</span>
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card className="shadow hover:scale-105 hover:shadow-lg hover:bg-highlight/40 bg-secondary text-primary-foreground transition-all border-accent sm:col-span-2 xl:col-span-1">
          <CardHeader className="flex flex-row items-center gap-2 pb-2 md:pb-1">
            <CircleArrowRight className="text-success w-5 h-5 md:w-6 md:h-6" />
            <CardTitle className="text-base md:text-lg">Savings Rate</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl md:text-2xl font-bold text-success">{savingsRate}%</div>
            <CardDescription className="mt-2 text-xs md:text-sm">
              {savingsRate >= 20 ? "Excellent! 🎯" : savingsRate >= 10 ? "Good progress! 📈" : "Room to improve 💪"}
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto mb-8">
        <Card className="bg-card shadow border border-border">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">What is going well</CardTitle>
            <CardDescription>Signals that support your financial foundation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {health.strengths.length > 0 ? (
              health.strengths.map((strength) => (
                <div key={strength} className="rounded-lg bg-success/10 px-4 py-3 text-sm text-foreground">
                  {strength}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Complete more of your profile to unlock stronger financial insights.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card shadow border border-border">
          <CardHeader>
            <CardTitle className="text-base md:text-lg">Next best actions</CardTitle>
            <CardDescription>Priority moves based on your current profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {health.nextActions.map((action) => (
              <div key={action.title} className="rounded-lg border border-primary/20 bg-primary/10 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-foreground">{action.title}</p>
                  <span className="text-xs uppercase tracking-wide text-primary">{action.priority}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{action.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      {/* Charts with real data */}
      <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto">
        <Card className="p-3 md:p-2 bg-card shadow border border-border">
          <CardHeader className="pb-3 md:pb-6">
            <CardTitle className="text-base md:text-lg">Your Monthly Spending Pattern</CardTitle>
            <CardDescription className="text-xs md:text-sm">Based on your expense profile</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={200} className="md:h-[240px]">
              <BarChart data={monthlySpending}>
                <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                <YAxis className="text-xs fill-muted-foreground" />
                <RechartsTooltip
                  formatter={v => formatCurrency(Number(v))}
                  cursor={{ fill: "rgba(246, 112, 17, 0.14)" }}
                  contentStyle={{ background: "#16151A", color: "#FFE4D0", borderRadius: 8, border: "1px solid #F67011", fontSize: "14px" }}
                />
                <Bar dataKey="amount" fill="#F67011" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="p-3 md:p-2 bg-card shadow border border-border">
          <CardHeader className="pb-3 md:pb-6">
            <CardTitle className="text-base md:text-lg">Your Asset Distribution</CardTitle>
            <CardDescription className="text-xs md:text-sm">Current savings breakdown</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={200} className="md:h-[240px]">
              <PieChart>
                <Pie
                  data={investments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={60}
                  className="md:outerRadius-[75px]"
                  dataKey="value"
                  nameKey="category"
                  label={entry => `${entry.category}: ${formatCurrency(entry.value)}`}
                >
                  {investments.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={INVESTMENT_COLORS[idx % INVESTMENT_COLORS.length]} />
                  ))}
                </Pie>
                <Legend
                  wrapperStyle={{
                    color: "#FFE4D0",
                    fontSize: "12px",
                  }}
                />
                <RechartsTooltip
                  formatter={v => formatCurrency(Number(v))}
                  contentStyle={{ background: "#16151A", color: "#FFE4D0", borderRadius: 8, border: "1px solid #F67011", fontSize: "14px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Financial Goals Section */}
      {userProfile.financial_goals && userProfile.financial_goals.length > 0 && (
        <div className="max-w-7xl mx-auto mt-8">
          <Card className="p-6 bg-card shadow border border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <CircleArrowRight className="text-primary w-5 h-5" />
                Your Financial Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {userProfile.financial_goals.map((goal, index) => (
                  <div key={index} className="bg-primary/10 rounded-lg p-3 text-center">
                    <span className="text-sm font-medium text-primary">{goal}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Financial Advisor Section - Show for authenticated users with complete profile */}
      {!isDemo && userProfile && userProfile.full_name && (
        <div className="max-w-7xl mx-auto mt-8">
          <AiFinancialAdvisor userProfile={userProfile} />
        </div>
      )}

      {/* Update Profile Button */}
      <div className="max-w-7xl mx-auto mt-8 text-center">
        {isDemo ? (
          <div className="space-y-4">
            <Link to="/auth">
              <Button className="px-6 py-3 mr-4">
                Sign Up to Get Started
              </Button>
            </Link>
            <Link to="/onboarding">
              <Button variant="outline" className="px-6 py-3">
                Try Financial Profile Setup
              </Button>
            </Link>
          </div>
        ) : (
          <Link to="/onboarding">
            <Button variant="outline" className="px-6 py-3">
              Update Financial Profile
            </Button>
          </Link>
        )}
      </div>

      {/* AI Chat Bubble for authenticated users */}
      {!isDemo && userProfile && (
        <AiChatBubble 
          userId={userProfile.id} 
          chatSessionId={`session-${userProfile.id}-${Date.now()}`}
          userProfile={{ 
            name: userProfile.full_name, 
            email: userProfile.email || '' 
          }}
          supabaseContext={assistantContext}
        />
      )}
    </div>
  );
}
