
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CircleDollarSign } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormData } from "@/schemas/financialOnboardingSchema";

interface FinancialOverviewStepProps {
  form: UseFormReturn<FormData>;
}

export const FinancialOverviewStep: React.FC<FinancialOverviewStepProps> = ({ form }) => {
  return (
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
};
