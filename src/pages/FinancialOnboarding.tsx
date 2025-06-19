
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CircleDollarSign, User, Target, TrendingUp, Shield, ArrowRight } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().min(16, "Must be at least 16 years old").max(100, "Invalid age"),
  monthlyIncome: z.number().min(0, "Income must be positive"),
  monthlyExpenses: z.number().min(0, "Expenses must be positive"),
  currentSavings: z.number().min(0, "Savings must be positive"),
  debtAmount: z.number().min(0, "Debt amount must be positive"),
  financialGoals: z.array(z.string()).min(1, "Select at least one goal"),
  riskTolerance: z.enum(["conservative", "moderate", "aggressive"]),
  investmentExperience: z.enum(["beginner", "intermediate", "advanced"]),
  emergencyFundMonths: z.number().min(0, "Must be positive").max(24, "Invalid number of months"),
});

type FormData = z.infer<typeof formSchema>;

const financialGoalOptions = [
  "Build Emergency Fund",
  "Save for Retirement",
  "Buy a House",
  "Pay Off Debt",
  "Start Investing",
  "Save for Education",
  "Start a Business",
  "Travel Fund"
];

export default function FinancialOnboarding() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: 25,
      monthlyIncome: 0,
      monthlyExpenses: 0,
      currentSavings: 0,
      debtAmount: 0,
      financialGoals: [],
      riskTolerance: "moderate",
      investmentExperience: "beginner",
      emergencyFundMonths: 3,
    },
  });

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "Please log in to continue",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { error } = await supabase
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

      if (error) throw error;

      toast({
        title: "Profile Created Successfully!",
        description: "Your financial profile has been saved. Redirecting to dashboard...",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

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

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <User className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <p className="text-muted-foreground">Let's start with some basic information about you</p>
      </div>
      
      <div className="grid gap-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter your age" 
                  {...field} 
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <CircleDollarSign className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold">Financial Overview</h2>
        <p className="text-muted-foreground">Help us understand your current financial situation</p>
      </div>
      
      <div className="grid gap-4">
        <FormField
          control={form.control}
          name="monthlyIncome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Income ($)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter your monthly income" 
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>Your total monthly income after taxes</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="monthlyExpenses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Expenses ($)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter your monthly expenses" 
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>Your total monthly expenses including rent, bills, food, etc.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="currentSavings"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Savings ($)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter your current savings" 
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>Total amount in savings accounts</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="debtAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Debt ($)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter your total debt" 
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>Including credit cards, loans, etc.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Target className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold">Financial Goals</h2>
        <p className="text-muted-foreground">What are you hoping to achieve?</p>
      </div>
      
      <FormField
        control={form.control}
        name="financialGoals"
        render={() => (
          <FormItem>
            <FormLabel>Select your financial goals (choose all that apply)</FormLabel>
            <div className="grid grid-cols-2 gap-3">
              {financialGoalOptions.map((goal) => (
                <FormField
                  key={goal}
                  control={form.control}
                  name="financialGoals"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(goal)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, goal])
                              : field.onChange(field.value?.filter((value) => value !== goal));
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        {goal}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <TrendingUp className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-2xl font-bold">Investment Profile</h2>
        <p className="text-muted-foreground">Help us understand your investment preferences</p>
      </div>
      
      <div className="grid gap-6">
        <FormField
          control={form.control}
          name="riskTolerance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Risk Tolerance</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your risk tolerance" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="conservative">Conservative - I prefer stability and lower risk</SelectItem>
                  <SelectItem value="moderate">Moderate - I'm comfortable with some risk for better returns</SelectItem>
                  <SelectItem value="aggressive">Aggressive - I'm willing to take higher risk for higher returns</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="investmentExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment Experience</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="beginner">Beginner - New to investing</SelectItem>
                  <SelectItem value="intermediate">Intermediate - Some investing experience</SelectItem>
                  <SelectItem value="advanced">Advanced - Experienced investor</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="emergencyFundMonths"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emergency Fund Goal (Months of Expenses)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter number of months" 
                  {...field} 
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              </FormControl>
              <FormDescription>How many months of expenses would you like to save for emergencies?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 py-8 px-4">
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
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                {currentStep === 4 && renderStep4()}
                
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
                        {isSubmitting ? "Creating Profile..." : "Complete Setup"}
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
