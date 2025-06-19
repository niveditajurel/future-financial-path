
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { TrendingUp } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from "@/schemas/financialOnboardingSchema";

interface InvestmentProfileStepProps {
  form: UseFormReturn<FormData>;
}

export const InvestmentProfileStep: React.FC<InvestmentProfileStepProps> = ({ form }) => {
  return (
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
};
