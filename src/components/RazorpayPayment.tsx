
import React from 'react';
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
  const handlePayment = () => {
    const options = {
      key: 'rzp_test_YourTestKeyHere', // Replace with your Razorpay key
      amount: amount * 100, // Razorpay takes amount in smallest currency unit (paise for INR)
      currency: 'INR',
      name: 'Orgifarm',
      description: 'Payment for your order',
      image: '/img/Orgifarm_logo.png',
      handler: function (response: { razorpay_payment_id: string }) {
        onSuccess(response.razorpay_payment_id);
        toast.success('Payment successful!');
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
          toast.error('Payment cancelled');
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="mt-4">
      <Button 
        onClick={handlePayment}
        className="w-full" 
        size="lg"
      >
        Pay with Razorpay
      </Button>
    </div>
  );
};

export default RazorpayPayment;
