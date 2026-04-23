
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type FinancialSummaryRequest = {
  user_id: string;
  financial_data: Record<string, unknown>;
};

function validateRequestBody(body: unknown): body is FinancialSummaryRequest {
  const data = body as Partial<FinancialSummaryRequest>;

  if (
    typeof body !== "object" ||
    body === null ||
    typeof data.user_id !== "string" ||
    !data.user_id ||
    typeof data.financial_data !== "object" ||
    data.financial_data === null ||
    Array.isArray(data.financial_data)
  ) {
    return false;
  }
  return true;
}

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Unknown error";

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

    const ai_summary =
      "Financial summaries are temporarily disabled while we finish the local setup.";

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
            model: "disabled",
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
      JSON.stringify({ error: "Internal server error", details: getErrorMessage(error) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
