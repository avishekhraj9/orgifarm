
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const SUPABASE_URL = "https://gioyluxjweuicdlcknyv.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SubscriptionRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  
  try {
    const { email } = await req.json() as SubscriptionRequest;
    console.log(`Processing newsletter subscription for email: ${email}`);
    
    // Try to insert the email into the newsletter_subscribers table
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email })
      .select();
      
    if (error) {
      console.error("Error storing subscription:", error);
      
      // Check for unique constraint violation (email already exists)
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "You are already subscribed to our newsletter!" 
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      }
      
      throw new Error("Failed to store newsletter subscription");
    }
    
    console.log("Newsletter subscription successful:", data);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Thank you for subscribing to our newsletter!" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
    
  } catch (error) {
    console.error("Error in add-newsletter-subscriber function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);
