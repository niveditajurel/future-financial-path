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
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Store form data in localStorage temporarily
        localStorage.setItem('pendingFinancialProfile', JSON.stringify(values));
        
        toast({
          title: "Sign up required",
          description: "Please create an account to save your financial profile",
        });
        
        // Redirect to auth page
        navigate("/auth");
        return;
      }

      console.log('Submitting financial profile:', values);

      // Save the financial profile to the database
      const { data, error } = await supabase
        .from("user_financial_profiles")
        .upsert({
          user_id: user.id,
          full_name: values.fullName,
          age: values.age,
          monthly_income: values.monthlyIncome,
          monthly_expenses: values.monthlyExpenses,
          current_savings: values.currentSavings,
          debt_amount: values.debtAmount,
          financial_goals: values.financialGoals,
          risk_tolerance: values.riskTolerance,
          investment_experience: values.investmentExperience,
          emergency_fund_months: values.emergencyFundMonths,
        });

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log('Profile saved successfully:', data);

      // Clear any stored pending profile data
      localStorage.removeItem('pendingFinancialProfile');

      toast({
        title: "Profile Created Successfully!",
        description: "Your financial profile has been saved. Redirecting to your personalized dashboard...",
      });

      // Redirect to dashboard after successful profile creation
      setTimeout(() => {
        console.log('Navigating to dashboard...');
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Failed to save your profile. Please try again.",
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
