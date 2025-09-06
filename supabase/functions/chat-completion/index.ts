import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  userProfile?: {
    name?: string;
    email?: string;
    [key: string]: any;
  };
  supabaseContext?: any;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, userProfile, supabaseContext }: ChatRequest = await req.json();

    console.log('Chat completion request received:', { messagesCount: messages.length, userProfile });

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Enhance system message with context
    let systemMessage = "You are a helpful and friendly AI financial assistant. Provide personalized financial advice and guidance.";
    
    if (userProfile?.name) {
      systemMessage += ` The user's name is ${userProfile.name}.`;
    }
    
    if (supabaseContext) {
      systemMessage += ` Additional context: ${JSON.stringify(supabaseContext)}`;
    }

    // Prepare messages for OpenAI
    const openaiMessages = [
      { role: 'system', content: systemMessage },
      ...messages.slice(-10) // Keep last 10 messages for context
    ];

    console.log('Calling OpenAI with messages:', openaiMessages.length);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: openaiMessages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    const assistantMessage = data.choices?.[0]?.message?.content || 
      "I apologize, but I couldn't generate a response. Please try again.";

    return new Response(
      JSON.stringify({ 
        message: assistantMessage,
        success: true 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Chat completion error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        success: false 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});