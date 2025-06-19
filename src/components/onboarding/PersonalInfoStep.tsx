
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { User } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormData } from "@/schemas/financialOnboardingSchema";

interface PersonalInfoStepProps {
  form: UseFormReturn<FormData>;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ form }) => {
  return (
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
};
