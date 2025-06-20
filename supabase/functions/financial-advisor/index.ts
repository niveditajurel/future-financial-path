
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
- Name: ${userProfile.full_name}
- Age: ${userProfile.age}
- Monthly Income: $${userProfile.monthly_income}
- Monthly Expenses: $${userProfile.monthly_expenses}
- Current Savings: $${userProfile.current_savings}
- Debt Amount: $${userProfile.debt_amount}
- Financial Goals: ${userProfile.financial_goals?.join(', ')}
- Risk Tolerance: ${userProfile.risk_tolerance}
- Investment Experience: ${userProfile.investment_experience}
- Emergency Fund: ${userProfile.emergency_fund_months} months

Based on current market conditions (as of 2024/2025), provide:
1. Personalized financial advice (2-3 sentences)
2. 3-4 specific investment recommendations with risk levels, potential returns, and timeframes
3. 4-5 portfolio optimization suggestions
4. 4-5 wealth growth strategies specific to their situation
5. Current market analysis relevant to their profile
6. Risk assessment and mitigation strategies

Format your response as a JSON object with these exact keys:
{
  "personalizedAdvice": "string",
  "investmentRecommendations": [
    {
      "category": "string",
      "recommendation": "string", 
      "reasoning": "string",
      "risk_level": "low|medium|high",
      "potential_return": "string",
      "timeframe": "string"
    }
  ],
  "portfolioSuggestions": ["string"],
  "wealthGrowthStrategies": ["string"],
  "marketAnalysis": "string",
  "riskAssessment": "string"
}

Consider current market trends, inflation, interest rates, and economic conditions. Be specific and actionable.`
    } else if (requestType === 'custom_question') {
      prompt = `You are an expert financial advisor. The user has this financial profile:

User Profile:
- Name: ${userProfile.full_name}
- Age: ${userProfile.age}
- Monthly Income: $${userProfile.monthly_income}
- Monthly Expenses: $${userProfile.monthly_expenses}
- Current Savings: $${userProfile.current_savings}
- Debt Amount: $${userProfile.debt_amount}
- Financial Goals: ${userProfile.financial_goals?.join(', ')}
- Risk Tolerance: ${userProfile.risk_tolerance}
- Investment Experience: ${userProfile.investment_experience}

They are asking: "${question}"

Provide a detailed, personalized response considering their financial situation and current market conditions. Be specific and actionable.

Format your response as JSON:
{
  "advice": "your detailed response here"
}`
    }

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
            content: 'You are a professional financial advisor with expertise in wealth management, investment strategies, portfolio optimization, and market analysis. Always provide practical, actionable advice based on current market conditions and the user\'s specific financial situation. Format responses as valid JSON.'
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
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    let content = data.choices[0].message.content

    // Clean up the response to ensure it's valid JSON
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    
    try {
      const parsedContent = JSON.parse(content)
      return new Response(JSON.stringify(parsedContent), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } catch (parseError) {
      console.error('JSON parsing error:', parseError)
      console.error('Content:', content)
      
      // Fallback response
      const fallbackResponse = requestType === 'comprehensive_analysis' ? {
        personalizedAdvice: "I'm analyzing your financial profile to provide personalized recommendations. Please try again in a moment.",
        investmentRecommendations: [],
        portfolioSuggestions: [],
        wealthGrowthStrategies: [],
        marketAnalysis: "Market analysis is being processed.",
        riskAssessment: "Risk assessment is being prepared."
      } : {
        advice: "I'm processing your question. Please try asking again."
      }
      
      return new Response(JSON.stringify(fallbackResponse), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

  } catch (error) {
    console.error('Error in financial-advisor function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})
