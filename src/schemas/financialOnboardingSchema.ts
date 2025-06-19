
import * as z from "zod";

export const formSchema = z.object({
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

export type FormData = z.infer<typeof formSchema>;
