
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { Resend } from "https://esm.sh/resend@2.0.0";

const SUPABASE_URL = "https://gioyluxjweuicdlcknyv.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";

const resend = new Resend(RESEND_API_KEY);

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
        // Don't send email for already subscribed users
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
    
    // Send a thank you email
    try {
      const emailResult = await resend.emails.send({
        from: "Orgifarm <onboarding@resend.dev>", // You can update this once you verify your domain
        to: email,
        subject: "Thank you for subscribing to Orgifarm's newsletter!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <img src="https://orgifarm.com/path-to-logo.png" alt="Orgifarm Logo" style="width: 150px; margin-bottom: 20px;">
            <h1 style="color: #486b51;">Thank You for Subscribing!</h1>
            <p>Dear Valued Customer,</p>
            <p>Thank you for subscribing to the Orgifarm newsletter! We're excited to have you join our community of organic food enthusiasts.</p>
            <p>Here's what you can expect from us:</p>
            <ul>
              <li>Monthly newsletters with seasonal recipes</li>
              <li>Exclusive promotions and discounts</li>
              <li>Tips for sustainable living and cooking</li>
              <li>Updates on new product launches</li>
            </ul>
            <p>We're committed to bringing you the finest organic products and keeping you informed about our journey towards sustainability.</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; font-style: italic;">"Nature's goodness, delivered to your doorstep."</p>
            </div>
            <p>Happy cooking!</p>
            <p>The Orgifarm Team</p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
              <p>If you didn't subscribe to our newsletter, please disregard this email.</p>
              <p>© 2025 Orgifarm. All rights reserved.</p>
            </div>
          </div>
        `
      });
      
      console.log("Thank you email sent successfully:", emailResult);
    } catch (emailError) {
      // Log email error but don't fail the subscription process
      console.error("Error sending thank you email:", emailError);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Thank you for subscribing to our newsletter! We've sent you a confirmation email." 
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
