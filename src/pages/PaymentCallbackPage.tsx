
import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const PaymentCallbackPage = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [message, setMessage] = useState('Verifying payment status...');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Parse URL parameters
        const params = new URLSearchParams(location.search);
        const merchantTransactionId = params.get('transactionId') || localStorage.getItem('currentTransactionId');
        
        if (!merchantTransactionId) {
          throw new Error('Transaction ID not found');
        }

        // Call the Supabase Edge Function to verify payment
        const { data, error } = await supabase.functions.invoke('verify-phonepay', {
          body: { merchantTransactionId },
        });

        if (error) {
          throw error;
        }

        if (data.success) {
          if (data.status === 'COMPLETED') {
            setStatus('success');
            setMessage('Payment successful! Your order has been placed.');
            
            // Remove transaction ID from localStorage
            localStorage.removeItem('currentTransactionId');
            
            // Clear cart or perform other post-payment operations
            setTimeout(() => {
              navigate('/order-success');
            }, 2000);
          } else if (data.status === 'PENDING') {
            setStatus('loading');
            setMessage('Payment is being processed. Please wait...');
            
            // Poll for status update after a delay
            setTimeout(verifyPayment, 5000);
          } else {
            setStatus('failed');
            setMessage(`Payment failed. Status: ${data.status}`);
          }
        } else {
          throw new Error('Payment verification failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('failed');
        setMessage('Payment verification failed. Please contact support.');
        toast.error('Failed to verify payment status');
      }
    };

    verifyPayment();
  }, [location, navigate]);

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto text-center py-16">
        {status === 'loading' && (
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />

          </div>

        )}
        
        {status === 'success' && (
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        )}
        
        {status === 'failed' && (
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        )}
        
        <h1 className="text-3xl font-bold mb-4">
          {status === 'loading' ? 'Processing Payment' : 
           status === 'success' ? 'Payment Successful' : 
           'Payment Failed'}
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          {message}
        </p>
        
        {status === 'failed' && (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link to="/checkout">Try Again</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default PaymentCallbackPage;
