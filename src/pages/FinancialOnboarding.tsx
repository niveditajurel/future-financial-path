import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Shield, ArrowRight, ArrowLeft } from "lucide-react";
import { formSchema, FormData } from "@/schemas/financialOnboardingSchema";
import { PersonalInfoStep } from "@/components/onboarding/PersonalInfoStep";
import { FinancialOverviewStep } from "@/components/onboarding/FinancialOverviewStep";
import { FinancialGoalsStep } from "@/components/onboarding/FinancialGoalsStep";
import { InvestmentProfileStep } from "@/components/onboarding/InvestmentProfileStep";

export default function FinancialOnboarding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: undefined,
      monthlyIncome: undefined,
      monthlyExpenses: undefined,
      currentSavings: undefined,
      debtAmount: undefined,
      financialGoals: [],
      riskTolerance: undefined,
      investmentExperience: undefined,
      emergencyFundMonths: undefined,
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Starting profile submission with values:', values);
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.error('Auth error:', authError);
        throw new Error('Authentication error: ' + authError.message);
      }
      
      if (!user) {
        console.log('No authenticated user found, storing data and redirecting to auth');
        localStorage.setItem('pendingFinancialProfile', JSON.stringify(values));
        
        toast({
          title: "Sign up required",
          description: "Please create an account to save your financial profile",
        });
        
        navigate("/auth");
        return;
      }

      console.log('Authenticated user found:', user.id);
      console.log('Submitting financial profile data:', values);

      // Convert arrays and ensure proper data types
      const profileData = {
        user_id: user.id,
        full_name: values.fullName,
        age: values.age ? Number(values.age) : null,
        monthly_income: values.monthlyIncome ? Number(values.monthlyIncome) : null,
        monthly_expenses: values.monthlyExpenses ? Number(values.monthlyExpenses) : null,
        current_savings: values.currentSavings ? Number(values.currentSavings) : null,
        debt_amount: values.debtAmount ? Number(values.debtAmount) : null,
        financial_goals: values.financialGoals || [],
        risk_tolerance: values.riskTolerance || null,
        investment_experience: values.investmentExperience || null,
        emergency_fund_months: values.emergencyFundMonths ? Number(values.emergencyFundMonths) : null,
      };

      console.log('Formatted profile data for database:', profileData);

      // First try to update existing profile, then insert if it doesn't exist
      const { data: existingProfile } = await supabase
        .from("user_financial_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      let result;
      
      if (existingProfile) {
        console.log('Updating existing profile...');
        result = await supabase
          .from("user_financial_profiles")
          .update(profileData)
          .eq("user_id", user.id)
          .select("*")
          .single();
      } else {
        console.log('Creating new profile...');
        result = await supabase
          .from("user_financial_profiles")
          .insert(profileData)
          .select("*")
          .single();
      }

      const { data: savedProfile, error: saveError } = result;

      if (saveError) {
        console.error('Database error saving profile:', saveError);
        throw new Error(`Failed to save profile: ${saveError.message}`);
      }

      if (!savedProfile) {
        throw new Error('Profile was not saved properly - no data returned');
      }

      console.log('Profile saved successfully:', savedProfile);

      // Clear any stored pending profile data
      localStorage.removeItem('pendingFinancialProfile');

      // Wait a moment to ensure the data is committed
      await new Promise(resolve => setTimeout(resolve, 500));

      // Verify the profile was saved by fetching it back
      const { data: verificationProfile, error: verificationError } = await supabase
        .from("user_financial_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (verificationError || !verificationProfile) {
        console.error('Profile verification failed:', verificationError);
        throw new Error('Profile was not saved properly - verification failed');
      }

      console.log('Profile verification successful:', verificationProfile);

      toast({
        title: "Profile Created Successfully! 🎉",
        description: "Your financial profile has been saved. Redirecting to dashboard...",
      });

      // Redirect to dashboard after successful profile creation
      setTimeout(() => {
        console.log('Navigating to dashboard...');
        navigate("/dashboard", { replace: true });
      }, 1000);

    } catch (error) {
      console.error("Detailed error saving profile:", error);
      
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      
      toast({
        title: "Failed to save your profile",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep form={form} />;
      case 2:
        return <FinancialOverviewStep form={form} />;
      case 3:
        return <FinancialGoalsStep form={form} />;
      case 4:
        return <InvestmentProfileStep form={form} />;
      default:
        return <PersonalInfoStep form={form} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 py-8 px-4">
      {/* Back to Home button */}
      <div className="max-w-2xl mx-auto flex justify-start mb-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm bg-card border border-border rounded-md px-4 py-2 shadow hover:bg-accent transition-colors text-primary">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-primary">Financial Profile Setup</h1>
            <span className="text-sm text-muted-foreground">Step {currentStep} of 4</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        <Card className="shadow-xl border-primary/10">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {renderCurrentStep()}
                
                <div className="flex justify-between pt-6">
                  {currentStep > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                  )}
                  
                  <div className="ml-auto">
                    {currentStep < 4 ? (
                      <Button type="button" onClick={nextStep}>
                        Next <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
                        {isSubmitting ? "Creating Profile..." : "Complete Setup & Go to Dashboard"}
                        <Shield className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
