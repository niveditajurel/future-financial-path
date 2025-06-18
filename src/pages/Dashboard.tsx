
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CircleArrowUp, CircleArrowDown, CircleArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// --- Mock Data ---
const data = {
  netIncome: 4500,
  topSpendingCategory: "Dining Out",
  savingsRate: 18,
  investmentGrowth: 5.6,
  monthlySpending: [
    { month: "Jan", amount: 1200 },
    { month: "Feb", amount: 1100 },
    { month: "Mar", amount: 1250 },
    { month: "Apr", amount: 900 },
    { month: "May", amount: 1000 },
    { month: "Jun", amount: 950 },
  ],
  investments: [
    { category: "Stocks", value: 7000 },
    { category: "Bonds", value: 2000 },
    { category: "Crypto", value: 1000 }
  ]
};

// Use on-brand colors for charts: dark, green, mint, accent, yellow
const INVESTMENT_COLORS = [
  "#21C768", // Tailwind: chart.green / primary
  "#22d3ee", // Tailwind: accent
  "#fde047", // Tailwind: yellow accent
];

// Advice text color swap to highlight green
const gptAdvice = `You're doing great! To save even more, try setting a monthly dining-out limit and boost investments by automating transfers. Keep up the progress—small changes add up!`;

function formatCurrency(amount: number) {
  return "$" + amount.toLocaleString();
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-background via-secondary to-background py-6 md:py-10 px-3 md:px-6 lg:px-10">
      {/* Back to Home button */}
      <div className="max-w-7xl mx-auto flex justify-start mb-6 md:mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-xs md:text-sm bg-card border border-border rounded-md px-3 md:px-4 py-2 shadow 
          hover:bg-highlight transition animate-fade-in text-primary">
          <ArrowLeft size={16} className="md:w-[18px] md:h-[18px]" /> Back to Home
        </Link>
      </div>
      
      {/* Greeting - More responsive */}
      <div className="max-w-4xl mx-auto mb-6 md:mb-8">
        <div className="bg-primary text-primary-foreground rounded-lg p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 shadow animate-fade-in">
          <CircleArrowUp size={24} className="md:w-8 md:h-8 text-white flex-shrink-0" />
          <div>
            <div className="font-semibold text-base md:text-lg mb-1 flicker-text">Hi there 👋</div>
            <div className="text-xs md:text-sm opacity-95 leading-relaxed">{gptAdvice}</div>
          </div>
        </div>
      </div>
      
      {/* Summary Cards - Improved responsive grid */}
      <div className="grid gap-4 md:gap-6 mb-8 md:mb-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        <Card className="shadow hover:scale-105 hover:shadow-lg hover:bg-highlight/40 bg-secondary text-primary-foreground transition-all border-primary">
          <CardHeader className="flex flex-row items-center gap-2 pb-2 md:pb-1">
            <CircleArrowUp className="text-primary w-5 h-5 md:w-6 md:h-6" />
            <CardTitle className="text-base md:text-lg">Net Income</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl md:text-2xl font-bold text-primary">{formatCurrency(data.netIncome)}</div>
            <CardDescription className="mt-2 text-xs md:text-sm">
              <span className="font-semibold text-success">+5.6% growth</span> this year
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card className="shadow hover:scale-105 hover:shadow-lg hover:bg-highlight/40 bg-secondary text-primary-foreground transition-all border border-red-400">
          <CardHeader className="flex flex-row items-center gap-2 pb-2 md:pb-1">
            <CircleArrowDown className="text-red-500 w-5 h-5 md:w-6 md:h-6" />
            <CardTitle className="text-base md:text-lg">Top Spending</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl md:text-2xl font-bold text-red-400">{data.topSpendingCategory}</div>
            <CardDescription className="mt-2 text-xs md:text-sm text-red-400">
              <span>Monthly avg: {formatCurrency(data.monthlySpending.reduce((acc, m) => acc + m.amount, 0) / data.monthlySpending.length)}</span>
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card className="shadow hover:scale-105 hover:shadow-lg hover:bg-highlight/40 bg-secondary text-primary-foreground transition-all border-accent sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center gap-2 pb-2 md:pb-1">
            <CircleArrowRight className="text-success w-5 h-5 md:w-6 md:h-6" />
            <CardTitle className="text-base md:text-lg">Savings Rate</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl md:text-2xl font-bold text-success">{data.savingsRate}%</div>
            <CardDescription className="mt-2 text-xs md:text-sm">Great job! 💰</CardDescription>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts - Better responsive layout */}
      <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto">
        {/* Bar Chart: Monthly Spending Trends */}
        <Card className="p-3 md:p-2 bg-card shadow border border-border">
          <CardHeader className="pb-3 md:pb-6">
            <CardTitle className="text-base md:text-lg">Monthly Spending Trends</CardTitle>
            <CardDescription className="text-xs md:text-sm">Track your spending over time</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={200} className="md:h-[240px]">
              <BarChart data={data.monthlySpending}>
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
        
        {/* Pie Chart: Investment Distribution */}
        <Card className="p-3 md:p-2 bg-card shadow border border-border">
          <CardHeader className="pb-3 md:pb-6">
            <CardTitle className="text-base md:text-lg">Investment Distribution</CardTitle>
            <CardDescription className="text-xs md:text-sm">See how your assets are allocated</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={200} className="md:h-[240px]">
              <PieChart>
                <Pie
                  data={data.investments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={60}
                  className="md:outerRadius-[75px]"
                  dataKey="value"
                  nameKey="category"
                  label={entry => `${entry.category}: ${Math.round(entry.value / data.investments.reduce((a, b) => a + b.value, 0) * 100)}%`}
                >
                  {data.investments.map((entry, idx) => (
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
    </div>
  );
}
