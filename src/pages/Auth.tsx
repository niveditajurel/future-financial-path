
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPendingProfile, setHasPendingProfile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a pending financial profile
    const pendingProfile = localStorage.getItem('pendingFinancialProfile');
    if (pendingProfile) {
      setHasPendingProfile(true);
      setIsSignUp(true); // Default to sign up if coming from onboarding
    }
  }, []);

  const savePendingProfile = async (userId: string) => {
    const pendingProfileData = localStorage.getItem('pendingFinancialProfile');
    if (!pendingProfileData) return;

    try {
      const profileData = JSON.parse(pendingProfileData);
      
      const { error } = await supabase
        .from("user_financial_profiles")
        .insert({
          user_id: userId,
          full_name: profileData.fullName,
          age: profileData.age,
          monthly_income: profileData.monthlyIncome,
          monthly_expenses: profileData.monthlyExpenses,
          current_savings: profileData.currentSavings,
          debt_amount: profileData.debtAmount,
          financial_goals: profileData.financialGoals,
          risk_tolerance: profileData.riskTolerance,
          investment_experience: profileData.investmentExperience,
          emergency_fund_months: profileData.emergencyFundMonths,
        });

      if (error) throw error;

      // Clear the pending profile data
      localStorage.removeItem('pendingFinancialProfile');
      
      toast({
        title: "Profile Saved!",
        description: "Your financial profile has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving pending profile:", error);
      toast({
        title: "Profile Save Error",
        description: "There was an issue saving your financial profile. You can complete it again from the dashboard.",
        variant: "destructive",
      });
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const redirectUrl = `${window.location.origin}/`;
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl }
        });
        if (error) throw error;
        
        if (data.user && !data.user.email_confirmed_at) {
          toast({
            title: "Sign up email sent!",
            description: "Check your email to finish signing up.",
          });
        } else if (data.user) {
          // If user is immediately confirmed, save pending profile
          await savePendingProfile(data.user.id);
          navigate("/dashboard");
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        
        if (data.user) {
          // Save pending profile if exists
          await savePendingProfile(data.user.id);
          toast({
            title: "Login successful!",
            description: "Welcome back.",
          });
          navigate("/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message || "Authentication error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-gradient-to-br from-background via-accent/10 to-background">
      <form
        onSubmit={handleAuth}
        className="w-full max-w-sm bg-card rounded-lg shadow-md p-8 space-y-6 border"
      >
        <Logo />
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-primary">
            {isSignUp ? "Create Account" : "Sign In"}
          </h1>
          {hasPendingProfile && (
            <p className="text-sm text-muted-foreground mb-4">
              Complete your account setup to save your financial profile
            </p>
          )}
        </div>
        
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          autoComplete="email"
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
        </Button>
        {error && <div className="text-destructive text-sm text-center">{error}</div>}
        <div className="text-sm text-center mt-4">
          {isSignUp
            ? (
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-primary underline"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                New here?{" "}
                <button
                  type="button"
                  className="text-primary underline"
                  onClick={() => setIsSignUp(true)}
                >
                  Create an account
                </button>
              </span>
            )}
        </div>
      </form>
    </div>
  );
};

export default Auth;
