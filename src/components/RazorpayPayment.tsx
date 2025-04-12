
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface RazorpayPaymentProps {
  amount: number;
  customerEmail: string;
  customerName: string;
  onSuccess: (paymentId: string) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({
  amount,
  customerEmail,
  customerName,
  onSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    
    // Ensure Razorpay is loaded
    if (!window.Razorpay) {
      toast.error('Payment gateway not loaded. Please refresh the page.');
      setIsLoading(false);
      return;
    }

    try {
      // Create order on server via Supabase Edge Function
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
        body: { 
          amount, 
          userId: (await supabase.auth.getUser()).data.user?.id 
        }
      });

      if (orderError || !orderData) {
        toast.error(`Failed to create order: ${orderError?.message || 'Unknown error'}`);
        console.error('Order creation error:', orderError);
        setIsLoading(false);
        return;
      }

      console.log('Received order data:', orderData);

      const options = {
        key: "rzp_test_zXqg1XEWvvACMG", // Use test key for development
        amount: orderData.amount,
        currency: 'INR',
        name: 'Orgifarm',
        description: 'Payment for your order',
        image: '/img/Orgifarm_logo.png',
        order_id: orderData.orderId,
        handler: function (response: { 
          razorpay_payment_id: string; 
          razorpay_order_id: string; 
          razorpay_signature: string 
        }) {
          setIsLoading(false);
          if (response.razorpay_payment_id) {
            onSuccess(response.razorpay_payment_id);
            toast.success('Payment successful!');
            console.log('Payment Details:', response);
          } else {
            toast.error('Payment failed. Please try again.');
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
        },
        theme: {
          color: '#10b981',
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
            toast.error('Payment cancelled');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        setIsLoading(false);
        console.error('Payment failed response:', response.error);
        toast.error(`Payment failed: ${response.error.description || 'Please check your payment details'}`);
      });
      
      rzp.open();
    } catch (error) {
      setIsLoading(false);
      console.error('Razorpay integration error:', error);
      toast.error('Payment gateway error. Please try again.');
    }
  };

  return (
    <div className="mt-4">
      <Button 
        onClick={handlePayment}
        className="w-full" 
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Pay with Razorpay'}
      </Button>
    </div>
  );
};

export default RazorpayPayment;
