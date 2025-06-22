
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, DollarSign, PieChart, AlertCircle, Lightbulb, Target, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type UserProfile = {
  full_name: string;
  age: number;
  monthly_income: number;
  monthly_expenses: number;
  current_savings: number;
  debt_amount: number;
  financial_goals: string[];
  risk_tolerance: string;
  investment_experience: string;
  emergency_fund_months: number;
};

type MarketInsight = {
  category: string;
  recommendation: string;
  reasoning: string;
  risk_level: 'low' | 'medium' | 'high';
  potential_return: string;
  timeframe: string;
};

type AdvisorResponse = {
  personalizedAdvice: string;
  investmentRecommendations: MarketInsight[];
  portfolioSuggestions: string[];
  wealthGrowthStrategies: string[];
  marketAnalysis: string;
  riskAssessment: string;
};

interface AiFinancialAdvisorProps {
  userProfile: UserProfile;
}

export const AiFinancialAdvisor: React.FC<AiFinancialAdvisorProps> = ({ userProfile }) => {
  const [advice, setAdvice] = useState<AdvisorResponse | null>(null);
  const [customQuestion, setCustomQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [customAdvice, setCustomAdvice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    generatePersonalizedAdvice();
  }, [userProfile]);

  const generatePersonalizedAdvice = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Calling financial-advisor function with profile:', userProfile);
      
      const { data, error } = await supabase.functions.invoke('financial-advisor', {
        body: {
          userProfile,
          requestType: 'comprehensive_analysis'
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }
      
      console.log('Received data from financial-advisor:', data);
      setAdvice(data);
      
      toast({
        title: "Financial Analysis Complete",
        description: "Your personalized financial advice has been generated.",
      });
      
    } catch (error) {
      console.error('Error generating advice:', error);
      setError(error.message || 'Failed to generate financial advice');
      toast({
        title: "Error",
        description: "Failed to generate financial advice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const askCustomQuestion = async () => {
    if (!customQuestion.trim()) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('financial-advisor', {
        body: {
          userProfile,
          requestType: 'custom_question',
          question: customQuestion
        }
      });

      if (error) throw error;
      setCustomAdvice(data.advice);
      setCustomQuestion("");
    } catch (error) {
      console.error('Error getting custom advice:', error);
      toast({
        title: "Error",
        description: "Failed to get advice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && !advice) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            AI Financial Advisor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3">Analyzing your financial profile and market conditions...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error && !advice) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            AI Financial Advisor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Unable to Generate Financial Advice</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={generatePersonalizedAdvice} disabled={loading}>
              {loading ? "Retrying..." : "Try Again"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main AI Advisor Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Your Personal Financial Advisor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {advice && (
            <>
              {/* Personalized Advice */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Personalized Advice</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{advice.personalizedAdvice}</p>
              </div>

              <Separator />

              {/* Investment Recommendations */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Investment Recommendations</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {advice.investmentRecommendations.map((rec, index) => (
                    <Card key={index} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{rec.category}</h4>
                            <Badge className={getRiskBadgeColor(rec.risk_level)}>
                              {rec.risk_level} risk
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{rec.recommendation}</p>
                          <div className="text-xs text-muted-foreground">
                            <p><strong>Potential Return:</strong> {rec.potential_return}</p>
                            <p><strong>Timeframe:</strong> {rec.timeframe}</p>
                          </div>
                          <p className="text-xs">{rec.reasoning}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Portfolio Suggestions */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Portfolio Optimization</h3>
                </div>
                <ul className="space-y-2">
                  {advice.portfolioSuggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Wealth Growth Strategies */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Wealth Growth Strategies</h3>
                </div>
                <ul className="space-y-2">
                  {advice.wealthGrowthStrategies.map((strategy, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Market Analysis */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Current Market Analysis</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{advice.marketAnalysis}</p>
              </div>

              <Separator />

              {/* Risk Assessment */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Risk Assessment</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{advice.riskAssessment}</p>
              </div>
            </>
          )}

          <Separator />

          {/* Custom Question Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ask Your Financial Advisor</h3>
            <div className="space-y-3">
              <Textarea
                placeholder="Ask any specific question about investments, financial planning, or wealth management..."
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                className="min-h-[80px]"
              />
              <Button 
                onClick={askCustomQuestion}
                disabled={loading || !customQuestion.trim()}
                className="w-full sm:w-auto"
              >
                {loading ? "Getting Advice..." : "Get Personalized Advice"}
              </Button>
            </div>
            
            {customAdvice && (
              <Card className="bg-muted/50">
                <CardContent className="pt-4">
                  <p className="text-sm leading-relaxed">{customAdvice}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={generatePersonalizedAdvice}
              disabled={loading}
            >
              {loading ? "Updating..." : "Refresh Analysis"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
