
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { AlertCircle } from 'lucide-react';

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
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);
    
    // Ensure Razorpay is loaded
    if (!window.Razorpay) {
      setError('Payment gateway not loaded. Please refresh the page.');
      toast.error('Payment gateway not loaded. Please refresh the page.');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Creating order with amount:', amount);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('User not authenticated. Please login to continue.');
        toast.error('Please login to continue.');
        setIsLoading(false);
        return;
      }
      
      // Create order on server via Supabase Edge Function
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
        body: { 
          amount, 
          userId: user.id 
        }
      });
      
      if (orderError) {
        console.error('Order creation error details:', orderError);
        setError(`Failed to create order: ${orderError.message || 'Unknown error'}`);
        toast.error(`Failed to create order: ${orderError.message || 'Unknown error'}`);
        setIsLoading(false);
        return;
      }
      
      if (!orderData) {
        console.error('No order data received');
        setError('Failed to create order: No response from server');
        toast.error('Failed to create order: No response from server');
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
      setError('Payment gateway error. Please try again.');
      toast.error('Payment gateway error. Please try again.');
    }
  };

  return (
    <div className="mt-4">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
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
