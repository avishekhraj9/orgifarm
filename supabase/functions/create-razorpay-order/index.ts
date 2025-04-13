
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Razorpay from 'https://esm.sh/razorpay@2.9.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize Razorpay with environment variables
const razorpay = new Razorpay({
  key_id: Deno.env.get('RAZORPAY_KEY_ID') || '',
  key_secret: Deno.env.get('RAZORPAY_KEY_SECRET') || ''
})

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Ensure only POST requests are handled
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  try {
    // Parse request body
    const requestData = await req.json();
    const { amount, userId } = requestData;
    
    console.log('Received order request:', { amount, userId });
    console.log('Razorpay credentials available:', !!Deno.env.get('RAZORPAY_KEY_ID') && !!Deno.env.get('RAZORPAY_KEY_SECRET'));

    // Validate input
    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ 
        error: 'Invalid amount',
        details: 'Amount must be a positive number' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (!userId) {
      return new Response(JSON.stringify({ 
        error: 'User ID is required',
        details: 'Please login to continue' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise, ensure whole number
      currency: 'INR',
      receipt: `order_receipt_${Date.now()}`,
      notes: { 
        user_id: userId,
        description: 'Orgifarm Product Purchase'
      }
    })

    console.log('Razorpay Order Created:', {
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount
    })

    // Store order in database
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        razorpay_order_id: razorpayOrder.id,
        amount: amount,
        status: 'created'
      })
      .select()
      .single();
    
    if (orderError) {
      console.error('Error storing order in database:', orderError);
    } else {
      console.log('Order stored in database:', orderData);
    }

    // Return the Razorpay order details
    return new Response(JSON.stringify({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return new Response(JSON.stringify({ 
      error: 'Failed to create order',
      details: error.message || 'Unknown error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
