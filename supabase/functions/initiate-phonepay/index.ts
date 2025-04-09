
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Required headers for CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// PhonePe API endpoints
const PHONEPAY_BASE_URL = "https://api.phonepe.com/apis/hermes";
const PHONEPAY_PROD_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
const PHONEPAY_UAT_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

interface PhonePePayload {
  merchantId: string;
  merchantTransactionId: string;
  amount: number;
  callbackUrl: string;
  mobileNumber?: string;
  merchantUserId?: string;
}

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
    // Get the authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authorization header is required");
    }

    // Get user from auth header
    const token = authHeader.replace("Bearer ", "");
    const { data, error } = await supabaseClient.auth.getUser(token);
    if (error) throw error;
    
    const user = data.user;
    if (!user) throw new Error("User not found");

    // Get request body
    const requestData = await req.json();
    const { amount, callbackUrl, mobileNumber } = requestData;

    if (!amount || !callbackUrl) {
      throw new Error("Amount and callbackUrl are required");
    }

    // Generate a unique transaction ID
    const merchantTransactionId = `TX_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    // PhonePe merchant ID and salt key from environment variables
    const merchantId = Deno.env.get("PHONEPAY_MERCHANT_ID");
    const saltKey = Deno.env.get("PHONEPAY_SALT_KEY");
    const saltIndex = Deno.env.get("PHONEPAY_SALT_INDEX");
    
    if (!merchantId || !saltKey || !saltIndex) {
      throw new Error("PhonePe credentials not configured");
    }

    // Prepare the payload for PhonePe
    const payload = {
      merchantId,
      merchantTransactionId,
      merchantUserId: user.id,
      amount: amount * 100, // PhonePe expects amount in paise
      redirectUrl: callbackUrl,
      redirectMode: "REDIRECT",
      mobileNumber: mobileNumber || "",
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };

    // Convert payload to base64
    const payloadString = JSON.stringify(payload);
    const payloadBase64 = btoa(payloadString);

    // Create SHA256 hash
    const checksum = await generateChecksum(payloadBase64, saltKey, saltIndex);

    // Prepare the final request to PhonePe
    const phonePePayload = {
      request: payloadBase64,
      merchantId,
      checksum
    };

    // Determine which environment to use (production or UAT)
    const isProd = Deno.env.get("PHONEPAY_ENVIRONMENT") === "production";
    const phonepeUrl = isProd ? PHONEPAY_PROD_URL : PHONEPAY_UAT_URL;

    // Make the request to PhonePe
    const response = await fetch(phonepeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(phonePePayload)
    });

    const responseData = await response.json();
    
    console.log("PhonePe API response:", responseData);
    
    if (responseData.success) {
      // Store transaction in database for verification later
      await supabaseClient
        .from('payment_transactions')
        .insert({
          user_id: user.id,
          transaction_id: merchantTransactionId,
          amount: amount,
          payment_gateway: 'phonepe',
          status: 'initiated',
          metadata: responseData
        });

      return new Response(
        JSON.stringify({ 
          success: true, 
          paymentUrl: responseData.data.instrumentResponse.redirectInfo.url,
          transactionId: merchantTransactionId
        }),
        { 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          }
        }
      );
    } else {
      throw new Error(`PhonePe payment initiation failed: ${responseData.message || "Unknown error"}`);
    }
  } catch (error) {
    console.error("PhonePe payment initiation error:", error);
    
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

// Helper function to generate SHA256 checksum
async function generateChecksum(payload: string, saltKey: string, saltIndex: string): Promise<string> {
  const data = payload + "/pg/v1/pay" + saltKey;
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  
  // Convert hash to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return `${hashHex}###${saltIndex}`;
}
