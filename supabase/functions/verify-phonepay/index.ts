
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Required headers for CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// PhonePe API endpoints
const PHONEPAY_STATUS_API_PROD = "https://api.phonepe.com/apis/hermes/pg/v1/status";
const PHONEPAY_STATUS_API_UAT = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    // Get request body
    const requestData = await req.json();
    const { merchantTransactionId } = requestData;

    if (!merchantTransactionId) {
      throw new Error("Transaction ID is required");
    }

    // PhonePe merchant ID and salt key from environment variables
    const merchantId = Deno.env.get("PHONEPAY_MERCHANT_ID");
    const saltKey = Deno.env.get("PHONEPAY_SALT_KEY");
    const saltIndex = Deno.env.get("PHONEPAY_SALT_INDEX");
    
    if (!merchantId || !saltKey || !saltIndex) {
      throw new Error("PhonePe credentials not configured");
    }

    // Create checksum for status check
    const data = `/pg/v1/status/${merchantId}/${merchantTransactionId}${saltKey}`;
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    
    // Convert hash to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const checksum = `${hashHex}###${saltIndex}`;

    // Determine which environment to use (production or UAT)
    const isProd = Deno.env.get("PHONEPAY_ENVIRONMENT") === "production";
    const statusUrl = isProd 
      ? `${PHONEPAY_STATUS_API_PROD}/${merchantId}/${merchantTransactionId}`
      : `${PHONEPAY_STATUS_API_UAT}/${merchantId}/${merchantTransactionId}`;

    // Make request to PhonePe status API
    const response = await fetch(statusUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-VERIFY": checksum
      }
    });

    const responseData = await response.json();
    
    console.log("PhonePe status check response:", responseData);
    
    if (responseData.success) {
      const paymentStatus = responseData.data.state;
      
      // Update transaction in the database
      await supabaseClient
        .from('payment_transactions')
        .update({ 
          status: paymentStatus,
          updated_at: new Date().toISOString(),
          metadata: { ...responseData }
        })
        .eq('transaction_id', merchantTransactionId);

      return new Response(
        JSON.stringify({ 
          success: true, 
          status: paymentStatus,
          data: responseData.data
        }),
        { 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          }
        }
      );
    } else {
      throw new Error(`PhonePe status check failed: ${responseData.message || "Unknown error"}`);
    }
  } catch (error) {
    console.error("PhonePe status check error:", error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 400, 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        }
      }
    );
  }
});
