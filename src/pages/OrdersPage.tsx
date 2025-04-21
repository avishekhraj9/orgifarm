import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import PageLayout from '@/components/PageLayout';
import { supabase } from '@/lib/supabase';
import { Order } from '@/types/product';
import { formatDistance } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        // First fetch orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (ordersError) throw ordersError;

        // Then fetch order items for each order
        const ordersWithItems = await Promise.all(
          ordersData.map(async (order) => {
            const { data: itemsData, error: itemsError } = await supabase
              .from('order_items')
              .select(`
                id,
                product_id,
                quantity,
                price,
                product:products (
                  id,
                  name,
                  image_url
                )
              `)
              .eq('order_id', order.id);

            if (itemsError) {
              console.error('Error fetching order items:', itemsError);
              return {
                id: order.id,
                userId: order.user_id,
                total: order.amount,
                status: order.status as OrderStatus,
                createdAt: order.created_at,
                items: [],
                shippingAddress: {
                  name: order.shipping_name || '',
                  street: order.shipping_street || '',
                  city: order.shipping_city || '',
                  state: order.shipping_state || '',
                  postalCode: order.shipping_postal_code || '',
                  country: order.shipping_country || ''
                },
                paymentMethod: 'Razorpay'
              };
            }

            return {
              id: order.id,
              userId: order.user_id,
              total: order.amount,
              status: order.status as OrderStatus,
              createdAt: order.created_at,
              items: itemsData?.map(item => ({
                productId: item.product_id,
                productName: item.product?.name || 'Unknown Product',
                quantity: item.quantity,
                price: item.price
              })) || [],
              shippingAddress: {
                name: order.shipping_name || '',
                street: order.shipping_street || '',
                city: order.shipping_city || '',
                state: order.shipping_state || '',
                postalCode: order.shipping_postal_code || '',
                country: order.shipping_country || ''
              },
              paymentMethod: 'Razorpay'
            };
          })
        );
        
        setOrders(ordersWithItems);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrders();
  }, [user]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-500';
      case 'shipped': return 'bg-blue-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  if (!user) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p>Please log in to view your orders.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : orders.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No orders yet</CardTitle>
              <CardDescription>
                You haven't placed any orders yet. Start shopping to see your orders here.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View and track all your orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Items</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id.slice(-6)}</TableCell>
                      <TableCell>
                        {formatDistance(new Date(order.createdAt), new Date(), { 
                          addSuffix: true 
                        })}
                      </TableCell>
                      <TableCell>₹{order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.items.length} items</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
};

export default OrdersPage;
