
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';

const EmailVerificationSuccessPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12 px-4">
        <div className="bg-white dark:bg-card shadow-lg rounded-lg p-8 max-w-md w-full text-center border border-border">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Email Verified!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank you for verifying your email address. Your account has been successfully activated.
          </p>
          <div className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
            <p className="text-sm text-green-700 dark:text-green-300">
              Redirecting to login in {countdown} seconds...
            </p>
          </div>
          <Button 
            onClick={() => navigate('/login')} 
            className="w-full"
          >
            Login Now
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default EmailVerificationSuccessPage;
