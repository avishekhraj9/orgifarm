
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Razorpay from 'https://esm.sh/razorpay@2.9.2'

// Initialize Razorpay with environment variables
const razorpay = new Razorpay({
  key_id: Deno.env.get('RAZORPAY_KEY_ID')!,
  key_secret: Deno.env.get('RAZORPAY_KEY_SECRET')!
})

serve(async (req) => {
  // Ensure only POST requests are handled
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    // Parse request body
    const { amount, userId } = await req.json()

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `order_receipt_${Date.now()}`,
      notes: { 
        user_id: userId,
        description: 'Orgifarm Product Purchase'
      }
    })

    // Return the Razorpay order details
    return new Response(JSON.stringify({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return new Response(JSON.stringify({ error: 'Failed to create order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})
