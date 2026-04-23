
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { userProfile, requestType, question } = await req.json()

    const fallbackResponse = requestType === 'comprehensive_analysis' ? {
      personalizedAdvice: `Hello ${userProfile.full_name || 'there'}! AI-powered recommendations are temporarily disabled while we finish the local setup. For now, focus on the basics shown in your dashboard: income, expenses, savings rate, debt, and emergency fund coverage.`,
      investmentRecommendations: [
        {
          category: "Emergency Fund",
          recommendation: "Build or maintain 3-6 months of expenses in a separate savings account",
          reasoning: "A cash buffer protects your plan before taking investment risk",
          risk_level: "low",
          potential_return: "Stability first",
          timeframe: "Immediate priority"
        },
        {
          category: "Debt Review",
          recommendation: "Prioritize high-interest debt before adding new investment complexity",
          reasoning: "Reducing expensive debt can improve monthly cash flow and financial resilience",
          risk_level: "low",
          potential_return: "Depends on debt interest rates",
          timeframe: "Short to medium term"
        },
        {
          category: "Long-Term Investing",
          recommendation: "Use broad, diversified funds only after core savings and debt priorities are clear",
          reasoning: "Diversification is usually more appropriate for early investors than concentrated bets",
          risk_level: "medium",
          potential_return: "Long-term market dependent",
          timeframe: "5+ years"
        }
      ],
      portfolioSuggestions: [
        "Keep emergency savings separate from long-term investments",
        "Avoid investing money needed for short-term goals",
        "Review contribution amounts after monthly cash flow is stable",
        "Revisit risk tolerance before choosing an allocation"
      ],
      wealthGrowthStrategies: [
        "Track monthly cash flow consistently",
        "Automate savings where possible",
        "Pay down high-interest debt strategically",
        "Increase income or reduce recurring expenses to improve savings rate"
      ],
      marketAnalysis: "Live market analysis is temporarily disabled while we finish setup.",
      riskAssessment: "This placeholder guidance is educational and should be reviewed against your actual needs before making financial decisions."
    } : {
      advice: "AI-powered answers are temporarily disabled while we finish the local setup. We can reconnect this advisor later."
    }

    return new Response(JSON.stringify(fallbackResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in financial-advisor function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Please check the Edge Function logs for more information'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
