
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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

  const handlePayment = () => {
    setIsLoading(true);
    
    // Ensure Razorpay is loaded
    if (!window.Razorpay) {
      toast.error('Payment gateway not loaded properly. Please refresh the page.');
      setIsLoading(false);
      return;
    }

    try {
      const options = {
        key: 'rzp_live_oxAtMy0ixubO1r', // Your Razorpay live key
        amount: amount * 100, // Razorpay takes amount in smallest currency unit (paise for INR)
        currency: 'INR',
        name: 'Orgifarm',
        description: 'Payment for your order',
        image: '/img/Orgifarm_logo.png',
        handler: function (response: { razorpay_payment_id: string }) {
          setIsLoading(false);
          if (response.razorpay_payment_id) {
            onSuccess(response.razorpay_payment_id);
            toast.success('Payment successful!');
          } else {
            toast.error('Payment failed. Please try again.');
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
        },
        theme: {
          color: '#10b981', // Green color matching our theme
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
            toast.error('Payment cancelled');
          }
        },
        notes: {
          order_id: 'ORG_' + Date.now().toString()
        }
      };

      const rzp = new window.Razorpay(options);
      
      // Handle payment failures
      rzp.on('payment.failed', function (response: any) {
        setIsLoading(false);
        toast.error(`Payment failed: ${response.error.description}`);
        console.error('Payment failed:', response.error);
      });
      
      rzp.open();
    } catch (error) {
      setIsLoading(false);
      console.error('Razorpay error:', error);
      toast.error('There was an issue with the payment gateway. Please try again later.');
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
