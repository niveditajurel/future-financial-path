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

const INVESTMENT_COLORS = ["#2563eb", "#fde047", "#22d3ee"];

const gptAdvice = `You're doing great! To save even more, try setting a monthly dining-out limit and boost investments by automating transfers. Keep up the progress—small changes add up!`;

function formatCurrency(amount: number) {
  return "$" + amount.toLocaleString();
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white py-10 px-4 md:px-10">
      {/* Back to Home button */}
      <div className="max-w-5xl mx-auto flex justify-start mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm bg-white border border-primary rounded-md px-4 py-2 shadow hover:bg-blue-100 transition animate-fade-in">
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </div>
      {/* Greeting */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="bg-primary text-primary-foreground rounded-lg p-6 flex items-center gap-4 shadow animate-fade-in">
          <CircleArrowUp size={32} className="text-white flex-shrink-0" />
          <div>
            <div className="font-semibold text-lg mb-1">Hi there 👋</div>
            <div className="text-sm opacity-90">{gptAdvice}</div>
          </div>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid gap-6 mb-10 md:grid-cols-3 max-w-5xl mx-auto">
        <Card className="shadow hover:scale-105 hover:shadow-lg hover:bg-blue-50 transition-all">
          <CardHeader className="flex flex-row items-center gap-2 pb-1">
            <CircleArrowUp className="text-blue-600" />
            <CardTitle className="text-lg">Net Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.netIncome)}</div>
            <CardDescription className="mt-2">
              <span className="font-semibold text-blue-700">+5.6% growth</span> this year
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="shadow hover:scale-105 hover:shadow-lg hover:bg-blue-50 transition-all">
          <CardHeader className="flex flex-row items-center gap-2 pb-1">
            <CircleArrowDown className="text-red-500" />
            <CardTitle className="text-lg">Top Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.topSpendingCategory}</div>
            <CardDescription className="mt-2 text-red-600">
              <span>Monthly avg: {formatCurrency(data.monthlySpending.reduce((acc, m) => acc + m.amount, 0) / data.monthlySpending.length)}</span>
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="shadow hover:scale-105 hover:shadow-lg hover:bg-blue-50 transition-all">
          <CardHeader className="flex flex-row items-center gap-2 pb-1">
            <CircleArrowRight className="text-green-600" />
            <CardTitle className="text-lg">Savings Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.savingsRate}%</div>
            <CardDescription className="mt-2">Great job! 💰</CardDescription>
          </CardContent>
        </Card>
      </div>
      {/* Charts */}
      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        {/* Bar Chart: Monthly Spending Trends */}
        <Card className="p-2">
          <CardHeader>
            <CardTitle>Monthly Spending Trends</CardTitle>
            <CardDescription>Track your spending over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data.monthlySpending}>
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <RechartsTooltip
                  formatter={v => formatCurrency(Number(v))}
                  cursor={{ fill: "rgba(59,130,246,0.15)" }}
                />
                <Bar dataKey="amount" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        {/* Pie Chart: Investment Distribution */}
        <Card className="p-2">
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
                <Legend />
                <RechartsTooltip
                  formatter={v => formatCurrency(Number(v))}
                  />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
