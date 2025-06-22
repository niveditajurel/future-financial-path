

import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CircleArrowUp, CircleArrowDown, CircleArrowRight, ArrowLeft, User, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AiFinancialAdvisor } from "@/components/AiFinancialAdvisor";

// Type for user profile data
type UserProfile = {
  id: string;
  full_name: string;
  age: number | null;
  monthly_income: number | null;
  monthly_expenses: number | null;
  current_savings: number | null;
  debt_amount: number | null;
  financial_goals: string[] | null;
  risk_tolerance: string | null;
  investment_experience: string | null;
  emergency_fund_months: number | null;
};

// Use on-brand colors for charts: dark, green, mint, accent, yellow
const INVESTMENT_COLORS = [
  "#21C768", // Tailwind: chart.green / primary
  "#22d3ee", // Tailwind: accent
  "#fde047", // Tailwind: yellow accent
];

function formatCurrency(amount: number) {
  return "$" + amount.toLocaleString();
}

// Demo data for non-authenticated users
const DEMO_PROFILE: UserProfile = {
  id: "demo",
  full_name: "Demo User",
  age: 28,
  monthly_income: 5000,
  monthly_expenses: 3500,
  current_savings: 15000,
  debt_amount: 8000,
  financial_goals: ["Emergency Fund", "House Down Payment", "Retirement"],
  risk_tolerance: "moderate",
  investment_experience: "beginner",
  emergency_fund_months: 4,
};

// AI Analysis function based on user data
function generateAIAdvice(profile: UserProfile): string {
  if (!profile.monthly_income || !profile.monthly_expenses) {
    return "Complete your financial profile to get personalized AI advice!";
  }

  const netIncome = profile.monthly_income - profile.monthly_expenses;
  const savingsRate = profile.monthly_income ? (netIncome / profile.monthly_income) * 100 : 0;
  const debtToIncomeRatio = profile.debt_amount && profile.monthly_income ? (profile.debt_amount / (profile.monthly_income * 12)) * 100 : 0;

  let advice = `Hello ${profile.full_name}! `;

  if (savingsRate < 10) {
    advice += "Your savings rate is low. Try to reduce expenses or find ways to increase income. ";
  } else if (savingsRate >= 20) {
    advice += "Excellent savings rate! You're on track for financial success. ";
  } else {
    advice += "Good savings rate! Consider pushing it to 20% for optimal wealth building. ";
  }

  if (debtToIncomeRatio > 30) {
    advice += "Focus on debt reduction first - consider the debt avalanche method. ";
  }

  if (profile.current_savings && profile.monthly_expenses) {
    const emergencyFundMonths = profile.current_savings / profile.monthly_expenses;
    if (emergencyFundMonths < 3) {
      advice += "Priority: Build your emergency fund to 3-6 months of expenses. ";
    }
  }

  if (profile.risk_tolerance === 'aggressive' && profile.investment_experience === 'beginner') {
    advice += "Start with index funds before moving to individual stocks. ";
  }

  advice += "Keep up the great work! 🎯";
  return advice;
}

export default function Dashboard() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log('Dashboard: Fetching user profile...');
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          console.log('Dashboard: No authenticated user, showing demo');
          // Show demo version instead of redirecting to auth
          setUserProfile(DEMO_PROFILE);
          setIsDemo(true);
          setLoading(false);
          return;
        }

        console.log('Dashboard: Authenticated user found:', user.id);

        // Try multiple times to get the profile in case there's a timing issue
        let profileData = null;
        let attempts = 0;
        const maxAttempts = 3;

        while (!profileData && attempts < maxAttempts) {
          attempts++;
          console.log(`Dashboard: Attempt ${attempts} to fetch profile for user:`, user.id);
          
          const { data, error } = await supabase
            .from("user_financial_profiles")
            .select("*")
            .eq("user_id", user.id)
            .single();

          if (error && error.code !== 'PGRST116') {
            console.error("Dashboard: Error fetching profile:", error);
            break;
          } else if (data) {
            console.log('Dashboard: User profile found:', data);
            profileData = data;
            break;
          } else {
            console.log(`Dashboard: No profile found for user on attempt ${attempts}, retrying...`);
            // Wait a bit before retrying
            if (attempts < maxAttempts) {
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
        }

        if (profileData) {
          setUserProfile(profileData);
        } else {
          console.log('Dashboard: No profile found after all attempts');
        }
      } catch (error) {
        console.error("Dashboard: Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

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

  if (!userProfile || (!isDemo && !userProfile.full_name)) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-background via-secondary to-background py-10 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="bg-card rounded-2xl p-8 shadow-xl border border-primary/20">
            <User className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-primary mb-4">Welcome to Your Financial Dashboard</h1>
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

  // Calculate dynamic data based on user profile
  const netIncome = (userProfile.monthly_income || 0) - (userProfile.monthly_expenses || 0);
  const savingsRate = userProfile.monthly_income ? Math.round((netIncome / userProfile.monthly_income) * 100) : 0;
  
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

  const aiAdvice = generateAIAdvice(userProfile);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-background via-secondary to-background py-6 md:py-10 px-3 md:px-6 lg:px-10">
      {/* Back to Home button */}
      <div className="max-w-7xl mx-auto flex justify-start mb-6 md:mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-xs md:text-sm bg-card border border-border rounded-md px-3 md:px-4 py-2 shadow 
          hover:bg-highlight transition animate-fade-in text-primary">
          <ArrowLeft size={16} className="md:w-[18px] md:h-[18px]" /> Back to Home
        </Link>
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
      <div className="grid gap-4 md:gap-6 mb-8 md:mb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
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
        
        <Card className="shadow hover:scale-105 hover:shadow-lg hover:bg-highlight/40 bg-secondary text-primary-foreground transition-all border-accent sm:col-span-2 lg:col-span-1">
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
                  cursor={{ fill: "rgba(33, 199, 104, 0.13)" }}
                  contentStyle={{ background: "#191C1C", color: "#21C768", borderRadius: 8, border: "1px solid #21C768", fontSize: "14px" }}
                />
                <Bar dataKey="amount" fill="#21C768" radius={[8, 8, 0, 0]} />
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
                    color: "#22d3ee",
                    fontSize: "12px",
                  }}
                />
                <RechartsTooltip
                  formatter={v => formatCurrency(Number(v))}
                  contentStyle={{ background: "#191C1C", color: "#21C768", borderRadius: 8, border: "1px solid #21C768", fontSize: "14px" }}
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
    </div>
  );
}
