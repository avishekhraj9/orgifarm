import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/PageLayout';

const OrderSuccessPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || 'N/A';
  
  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Thank You For Your Order!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your order has been placed and is being processed.
        </p>
        
        <div className="bg-secondary/50 rounded-lg p-6 mb-8">
          <p className="text-sm text-muted-foreground mb-2">Order Number</p>
          <p className="text-xl font-medium mb-4">#{orderNumber}</p>
          
          <p className="text-sm text-muted-foreground mb-2">We've sent a confirmation email with order details and tracking information.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link to="/products">
              <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/account">View My Orders</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default OrderSuccessPage;
