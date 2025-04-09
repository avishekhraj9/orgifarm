
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { name, email, phone, subject, message } = await req.json();
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing required fields",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase URL or service role key");
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert the contact message into the database
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name,
          email,
          phone, // Added phone field
          subject,
          message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error("Error inserting contact message:", error);
      throw error;
    }

    // At this point, you could also send an email notification using a service like Resend
    // For now, we'll just return a success response

    return new Response(
      JSON.stringify({
        success: true,
        message: "Your message has been sent successfully!",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in submit-contact-form function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "There was an error sending your message. Please try again later.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
