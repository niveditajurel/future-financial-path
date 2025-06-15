
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get("OPENAI_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function validateRequestBody(body: any) {
  if (
    typeof body !== "object" ||
    typeof body.user_id !== "string" ||
    !body.user_id ||
    typeof body.financial_data !== "object" ||
    body.financial_data === null
  ) {
    return false;
  }
  return true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Validate schema
    if (!validateRequestBody(body)) {
      return new Response(
        JSON.stringify({ error: "Invalid body. Must include user_id (string) and financial_data (object)." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { user_id, financial_data } = body;

    // Prepare prompt for GPT-4o: Summarize the user's financial data
    const prompt = [
      {
        role: "system",
        content:
          "You are a helpful financial assistant. Given the following user's financial data, provide a short, clear summary for the user.",
      },
      {
        role: "user",
        content: `Here is my financial data in JSON: \n${JSON.stringify(
          financial_data,
          null,
          2
        )}`,
      },
    ];

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: prompt,
        max_tokens: 128,
        temperature: 0.4,
        stream: false,
      }),
    });

    if (!aiRes.ok) {
      const errorText = await aiRes.text();
      return new Response(
        JSON.stringify({ error: "OpenAI request failed", details: errorText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await aiRes.json();
    const ai_summary =
      aiData?.choices?.[0]?.message?.content?.trim() ??
      "Sorry, no summary could be generated.";

    // Insert into Supabase table
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");

    const insertRes = await fetch(
      `${supabaseUrl}/rest/v1/chat_logs`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${supabaseServiceRoleKey}`,
          "apikey": supabaseServiceRoleKey,
          "Content-Type": "application/json",
          "Prefer": "return=representation",
        },
        body: JSON.stringify([
          {
            user_id,
            financial_data,
            ai_summary,
            model: "gpt-4o",
            created_at: new Date().toISOString(),
          },
        ]),
      },
    );

    let insertJson = null;
    if (insertRes.ok) {
      insertJson = await insertRes.json();
    }

    return new Response(
      JSON.stringify({
        summary: ai_summary,
        inserted: insertRes.ok,
        inserted_row: insertJson ? insertJson[0] : null,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Financial Summary Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
