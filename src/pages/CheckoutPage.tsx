import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageLayout from '@/components/PageLayout';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import RequireAuth from '@/components/RequireAuth';
import { toast } from 'sonner';
import RazorpayPayment from '@/components/RazorpayPayment';

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'IN',
  });

  useEffect(() => {
    if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      script.onload = () => {
        console.log("Razorpay script loaded successfully");
        setScriptLoaded(true);
        setScriptError(false);
      };
      
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        setScriptError(true);
        toast.error("Failed to load payment gateway. Please refresh and try again.");
      };
      
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
    
    return () => {
    };
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentSuccess = (paymentId: string) => {
    console.log("Payment successful with ID:", paymentId);
    setPaymentSuccess(true);
    setIsSubmitting(true);
    
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
      toast.success('Order placed successfully!');
      setIsSubmitting(false);
    }, 1000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.address || 
        !formData.city || !formData.state || !formData.zip) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (paymentSuccess) {
      setIsSubmitting(true);
      setTimeout(() => {
        clearCart();
        navigate('/order-success');
        toast.success('Order placed successfully!');
        setIsSubmitting(false);
      }, 1000);
    }
  };
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const taxAmount = total * 0.08;
  const grandTotal = total + taxAmount;
  
  if (scriptError) {
    return (
      <RequireAuth>
        <PageLayout>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">Checkout</h1>
            <div className="p-8 bg-white dark:bg-card rounded-lg shadow text-center">
              <h2 className="text-xl font-semibold mb-4 text-red-600">Payment Gateway Error</h2>
              <p className="mb-4">Failed to load payment gateway. Please try refreshing the page.</p>
              <Button onClick={() => window.location.reload()}>Refresh Page</Button>
            </div>
          </div>
        </PageLayout>
      </RequireAuth>
    );
  }
  
  return (
    <RequireAuth>
      <PageLayout>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 dark:text-gray-100">Checkout</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-border dark:border-border overflow-hidden p-6">
                  <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Shipping Information</h2>
                  
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="fullName" className="dark:text-gray-200">Full Name</Label>
                        <Input 
                          id="fullName" 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="dark:bg-secondary dark:text-gray-200 dark:border-secondary"
                          required 
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email}
                          onChange={handleChange}
                          className="dark:bg-secondary dark:text-gray-200 dark:border-secondary"
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="address" className="dark:text-gray-200">Street Address</Label>
                      <Input 
                        id="address" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="dark:bg-secondary dark:text-gray-200 dark:border-secondary"
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="city" className="dark:text-gray-200">City</Label>
                        <Input 
                          id="city" 
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="dark:bg-secondary dark:text-gray-200 dark:border-secondary"
                          required 
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="state" className="dark:text-gray-200">State / Province</Label>
                        <Input 
                          id="state" 
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="dark:bg-secondary dark:text-gray-200 dark:border-secondary"
                          required 
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="zip" className="dark:text-gray-200">ZIP / Postal Code</Label>
                        <Input 
                          id="zip" 
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          className="dark:bg-secondary dark:text-gray-200 dark:border-secondary"
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="country" className="dark:text-gray-200">Country</Label>
                      <Select defaultValue="IN">
                        <SelectTrigger id="country" className="dark:bg-secondary dark:text-gray-200 dark:border-secondary">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-card dark:text-gray-200 dark:border-border">
                          <SelectItem value="IN">India</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-border dark:border-border overflow-hidden p-6">
                  <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Payment Method</h2>
                  
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                      Secure payment processed by Razorpay. Your card details are never stored on our servers.
                    </p>
                    
                    {scriptLoaded ? (
                      <RazorpayPayment 
                        amount={grandTotal}
                        customerEmail={formData.email}
                        customerName={formData.fullName}
                        onSuccess={handlePaymentSuccess}
                      />
                    ) : (
                      <div className="flex justify-center py-4">
                        <p>Loading payment gateway...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-border dark:border-border overflow-hidden p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Order Summary</h2>
                  
                  <div className="space-y-4 mb-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between">
                        <div className="flex items-start">
                          <div className="text-sm dark:text-gray-300">
                            <span className="font-medium dark:text-gray-200">{item.quantity}x</span> {item.product.name}
                          </div>
                        </div>
                        <div className="text-sm font-medium dark:text-gray-200">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4 dark:bg-border" />
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground dark:text-gray-400">Subtotal</span>
                      <span className="dark:text-gray-300">₹{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground dark:text-gray-400">Shipping</span>
                      <span className="dark:text-gray-300">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground dark:text-gray-400">Tax</span>
                      <span className="dark:text-gray-300">₹{taxAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4 dark:bg-border" />
                  
                  <div className="flex justify-between font-semibold text-lg mb-6">
                    <span className="dark:text-gray-100">Total</span>
                    <span className="dark:text-gray-100">₹{grandTotal.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting || !paymentSuccess}
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Order'}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground dark:text-gray-400 text-center mt-4">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </PageLayout>
    </RequireAuth>
  );
};

export default CheckoutPage;
