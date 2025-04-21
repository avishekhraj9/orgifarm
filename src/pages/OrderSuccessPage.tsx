import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import PageLayout from '@/components/PageLayout';
import { supabase } from '@/lib/supabase';
import { Order, OrderStatus } from '@/types/product';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const OrderSuccessPage = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const orderId = location.state?.orderId;

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId || !user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .eq('user_id', user.id)
          .single();

        if (orderError) throw orderError;

        if (orderData) {
          setOrder({
            id: orderData.id,
            userId: orderData.user_id,
            total: orderData.amount,
            status: (orderData.status || 'processing') as OrderStatus,
            createdAt: orderData.created_at,
            items: [],
            shippingAddress: {
              name: 'N/A',
              street: 'N/A',
              city: 'N/A',
              state: 'N/A',
              postalCode: 'N/A',
              country: 'N/A'
            },
            paymentMethod: 'Razorpay'
          });
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        toast.error('Failed to load order details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, user]);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (!order) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find the order you're looking for. It may have been deleted or you may not have permission to view it.
          </p>
          <Button asChild>
            <Link to="/orders">View All Orders</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto py-16">
        <div className="text-center mb-8">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Order #{order.id.slice(-6)}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="capitalize">{order.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link to="/orders">View All Orders</Link>
          </Button>
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default OrderSuccessPage;
