
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
    <div className="min-h-screen bg-gradient-to-tr from-background via-secondary to-background py-10 px-4 md:px-10">
      {/* Back to Home button */}
      <div className="max-w-5xl mx-auto flex justify-start mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm bg-card border border-border rounded-md px-4 py-2 shadow 
          hover:bg-highlight transition animate-fade-in text-primary">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
      {/* Greeting */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-primary text-primary-foreground rounded-lg p-6 flex items-center gap-4 shadow animate-fade-in">
          <CircleArrowUp size={32} className="text-white flex-shrink-0" />
          <div>
            <div className="font-semibold text-lg mb-1 flicker-text">Hi there 👋</div>
            <div className="text-sm opacity-95">{gptAdvice}</div>
          </div>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid gap-6 mb-10 md:grid-cols-3 max-w-5xl mx-auto">
        <Card className="shadow hover:scale-105 hover:shadow-lg hover:bg-highlight/40 bg-secondary text-primary-foreground transition-all border-primary">
          <CardHeader className="flex flex-row items-center gap-2 pb-1">
            <CircleArrowUp className="text-primary" />
            <CardTitle className="text-lg">Net Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatCurrency(data.netIncome)}</div>
            <CardDescription className="mt-2">
              <span className="font-semibold text-success">+5.6% growth</span> this year
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="shadow hover:scale-105 hover:shadow-lg hover:bg-highlight/40 bg-secondary text-primary-foreground transition-all border border-red-400">
          <CardHeader className="flex flex-row items-center gap-2 pb-1">
            <CircleArrowDown className="text-red-500" />
            <CardTitle className="text-lg">Top Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{data.topSpendingCategory}</div>
            <CardDescription className="mt-2 text-red-400">
              <span>Monthly avg: {formatCurrency(data.monthlySpending.reduce((acc, m) => acc + m.amount, 0) / data.monthlySpending.length)}</span>
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="shadow hover:scale-105 hover:shadow-lg hover:bg-highlight/40 bg-secondary text-primary-foreground transition-all border-accent">
          <CardHeader className="flex flex-row items-center gap-2 pb-1">
            <CircleArrowRight className="text-success" />
            <CardTitle className="text-lg">Savings Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{data.savingsRate}%</div>
            <CardDescription className="mt-2">Great job! 💰</CardDescription>
          </CardContent>
        </Card>
      </div>
      {/* Charts */}
      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        {/* Bar Chart: Monthly Spending Trends */}
        <Card className="p-2 bg-card shadow border border-border">
          <CardHeader>
            <CardTitle>Monthly Spending Trends</CardTitle>
            <CardDescription>Track your spending over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data.monthlySpending}>
                <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
                <YAxis className="text-xs fill-muted-foreground" />
                <RechartsTooltip
                  formatter={v => formatCurrency(Number(v))}
                  cursor={{ fill: "rgba(33, 199, 104, 0.13)" }} // subtle green
                  contentStyle={{ background: "#191C1C", color: "#21C768", borderRadius: 8, border: "1px solid #21C768" }}
                />
                <Bar dataKey="amount" fill="#21C768" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Pie Chart: Investment Distribution */}
        <Card className="p-2 bg-card shadow border border-border">
          <CardHeader>
            <CardTitle>Investment Distribution</CardTitle>
            <CardDescription>See how your assets are allocated</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={data.investments}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={75}
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
                    color: "#22d3ee", // accent
                  }}
                />
                <RechartsTooltip
                  formatter={v => formatCurrency(Number(v))}
                  contentStyle={{ background: "#191C1C", color: "#21C768", borderRadius: 8, border: "1px solid #21C768" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
