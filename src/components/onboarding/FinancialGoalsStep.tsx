
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Target } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormData } from "@/schemas/financialOnboardingSchema";
import { financialGoalOptions } from "@/constants/financialGoals";

interface FinancialGoalsStepProps {
  form: UseFormReturn<FormData>;
}

export const FinancialGoalsStep: React.FC<FinancialGoalsStepProps> = ({ form }) => {
  return (
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
};
