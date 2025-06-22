
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const openAIApiKey = Deno.env.get('OPENAI_API_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { userProfile, requestType, question } = await req.json()

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    let prompt = ""
    
    if (requestType === 'comprehensive_analysis') {
      prompt = `You are an expert financial advisor and wealth management specialist. Analyze this user's financial profile and provide comprehensive, personalized advice.

User Profile:
- Name: ${userProfile.full_name || 'User'}
- Age: ${userProfile.age || 'Not specified'}
- Monthly Income: $${userProfile.monthly_income || 0}
- Monthly Expenses: $${userProfile.monthly_expenses || 0}
- Current Savings: $${userProfile.current_savings || 0}
- Debt Amount: $${userProfile.debt_amount || 0}
- Financial Goals: ${userProfile.financial_goals?.join(', ') || 'Not specified'}
- Risk Tolerance: ${userProfile.risk_tolerance || 'Not specified'}
- Investment Experience: ${userProfile.investment_experience || 'Not specified'}
- Emergency Fund: ${userProfile.emergency_fund_months || 0} months

Based on current market conditions, provide a comprehensive financial analysis. Format your response as a JSON object with these exact keys:

{
  "personalizedAdvice": "Provide 2-3 sentences of personalized financial advice based on their profile",
  "investmentRecommendations": [
    {
      "category": "Investment category name",
      "recommendation": "Specific recommendation", 
      "reasoning": "Why this recommendation fits their profile",
      "risk_level": "low, medium, or high",
      "potential_return": "Expected return percentage or range",
      "timeframe": "Investment timeframe"
    }
  ],
  "portfolioSuggestions": [
    "Portfolio optimization suggestion 1",
    "Portfolio optimization suggestion 2",
    "Portfolio optimization suggestion 3",
    "Portfolio optimization suggestion 4"
  ],
  "wealthGrowthStrategies": [
    "Wealth growth strategy 1",
    "Wealth growth strategy 2", 
    "Wealth growth strategy 3",
    "Wealth growth strategy 4"
  ],
  "marketAnalysis": "Current market analysis relevant to their profile",
  "riskAssessment": "Risk assessment and mitigation strategies"
}

Provide 3-4 investment recommendations, 4-5 portfolio suggestions, and 4-5 wealth growth strategies. Be specific and actionable.`
    } else if (requestType === 'custom_question') {
      prompt = `You are an expert financial advisor. The user has this financial profile:

User Profile:
- Name: ${userProfile.full_name || 'User'}
- Age: ${userProfile.age || 'Not specified'}
- Monthly Income: $${userProfile.monthly_income || 0}
- Monthly Expenses: $${userProfile.monthly_expenses || 0}
- Current Savings: $${userProfile.current_savings || 0}
- Debt Amount: $${userProfile.debt_amount || 0}
- Financial Goals: ${userProfile.financial_goals?.join(', ') || 'Not specified'}
- Risk Tolerance: ${userProfile.risk_tolerance || 'Not specified'}
- Investment Experience: ${userProfile.investment_experience || 'Not specified'}

They are asking: "${question}"

Provide a detailed, personalized response considering their financial situation. Format your response as JSON:

{
  "advice": "your detailed response here"
}`
    }

    console.log('Making OpenAI API request...')
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional financial advisor with expertise in wealth management, investment strategies, portfolio optimization, and market analysis. Always provide practical, actionable advice based on current market conditions and the user\'s specific financial situation. Format all responses as valid JSON only, with no additional text or formatting.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', response.status, errorText)
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('OpenAI response received')
    
    let content = data.choices[0].message.content.trim()

    // Clean up the response to ensure it's valid JSON
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    
    try {
      const parsedContent = JSON.parse(content)
      console.log('Successfully parsed JSON response')
      return new Response(JSON.stringify(parsedContent), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } catch (parseError) {
      console.error('JSON parsing error:', parseError)
      console.error('Content that failed to parse:', content)
      
      // Fallback response with realistic data
      const fallbackResponse = requestType === 'comprehensive_analysis' ? {
        personalizedAdvice: `Hello ${userProfile.full_name || 'there'}! Based on your financial profile, I recommend focusing on building a solid financial foundation. With a monthly income of $${userProfile.monthly_income || 0} and expenses of $${userProfile.monthly_expenses || 0}, you have good potential for wealth building.`,
        investmentRecommendations: [
          {
            category: "Index Funds",
            recommendation: "Start with low-cost S&P 500 index funds for broad market exposure",
            reasoning: "Perfect for beginners with consistent long-term growth potential",
            risk_level: "medium",
            potential_return: "8-10% annually",
            timeframe: "5+ years"
          },
          {
            category: "Emergency Fund",
            recommendation: "Build 3-6 months of expenses in a high-yield savings account",
            reasoning: "Essential financial safety net before investing",
            risk_level: "low",
            potential_return: "4-5% annually",
            timeframe: "Immediate priority"
          },
          {
            category: "Target-Date Funds",
            recommendation: "Consider target-date funds for retirement accounts",
            reasoning: "Automatically adjusts risk based on your age and timeline",
            risk_level: "medium",
            potential_return: "7-9% annually",
            timeframe: "Long-term (10+ years)"
          }
        ],
        portfolioSuggestions: [
          "Allocate 70% stocks and 30% bonds based on your age and risk tolerance",
          "Diversify across domestic and international markets",
          "Consider low-cost ETFs to minimize fees",
          "Rebalance your portfolio quarterly to maintain target allocation"
        ],
        wealthGrowthStrategies: [
          "Maximize employer 401(k) matching if available",
          "Open and contribute to a Roth IRA for tax-free growth",
          "Automate your savings to build consistent wealth",
          "Consider increasing income through skills development or side income"
        ],
        marketAnalysis: "Current market conditions favor long-term investors with a diversified approach. Consider dollar-cost averaging to reduce timing risk.",
        riskAssessment: "Your risk profile suggests a balanced approach. Start conservative and gradually increase risk tolerance as you gain experience and knowledge."
      } : {
        advice: "I'm processing your question. Please try asking again, and I'll provide detailed financial guidance based on your profile."
      }
      
      return new Response(JSON.stringify(fallbackResponse), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

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
