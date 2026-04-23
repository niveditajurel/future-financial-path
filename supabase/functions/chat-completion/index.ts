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
  } & Record<string, unknown>;
  supabaseContext?: Record<string, unknown>;
}

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'An unexpected error occurred';

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, userProfile, supabaseContext }: ChatRequest = await req.json();

    console.log('Chat completion request received:', { messagesCount: messages.length, userProfile });

    // Enhance system message with context
    let systemMessage = "You are a helpful and friendly AI financial assistant. Provide personalized financial advice and guidance.";
    
    if (userProfile?.name) {
      systemMessage += ` The user's name is ${userProfile.name}.`;
    }
    
    if (supabaseContext) {
      systemMessage += ` Additional context: ${JSON.stringify(supabaseContext)}`;
    }

    // Prepare messages for the future AI provider integration.
    const preparedMessages = [
      { role: 'system', content: systemMessage },
      ...messages.slice(-10) // Keep last 10 messages for context
    ];

    console.log('AI chat is temporarily disabled. Prepared messages:', preparedMessages.length);

    const assistantMessage =
      "AI chat is temporarily disabled while we finish the local setup. Your financial profile is still saved, and we can reconnect the advisor later.";

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
    const message = getErrorMessage(error);
    
    return new Response(
      JSON.stringify({ 
        error: message,
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
