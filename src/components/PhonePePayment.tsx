
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface PhonePePaymentProps {
  amount: number;
  onSuccess: (transactionId: string) => void;
}

const PhonePePayment: React.FC<PhonePePaymentProps> = ({ amount, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const { user } = useAuth();

  // Fetch user profile to get the mobile number
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('mobile_number')
            .eq('id', user.id)
            .single();
          
          if (!error && data && data.mobile_number) {
            setMobileNumber(data.mobile_number);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const initiatePayment = async () => {
    if (!user) {
      toast.error('You must be logged in to make a payment');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare the redirect URL
      const origin = window.location.origin;
      const callbackUrl = `${origin}/payment-callback`;

      // Call the Supabase Edge Function to initiate PhonePe payment
      const { data, error } = await supabase.functions.invoke('initiate-phonepay', {
        body: {
          amount,
          callbackUrl,
          mobileNumber: mobileNumber || '',
        },
      });

      if (error) {
        throw error;
      }

      if (data.success && data.paymentUrl) {
        // Store the transaction ID locally (could also be done in localStorage)
        if (data.transactionId) {
          onSuccess(data.transactionId);
        }
        
        // Redirect to PhonePe payment page
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('Failed to initiate payment');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error('Payment initiation failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={initiatePayment} 
      className="w-full" 
      size="lg" 
      variant="secondary"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        'Pay with PhonePe'
      )}
    </Button>
  );
};

export default PhonePePayment;
