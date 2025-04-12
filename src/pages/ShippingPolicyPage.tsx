
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Separator } from '@/components/ui/separator';

const ShippingPolicyPage: React.FC = () => {
  return (
    <PageLayout className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Shipping Policy</h1>
        <Separator className="my-6" />
        
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Our Shipping Policy</h2>
            <p className="text-muted-foreground">
              Thank you for shopping at Orgifarm. This policy outlines how we handle shipping, delivery timeframes, 
              and what you can expect when ordering from us.
            </p>
          </section>
          
          <section className="mt-8 bg-secondary/30 p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">Processing Times</h2>
            <p className="text-muted-foreground">
              All orders are processed within 1-2 business days after receiving your order confirmation email.
              Orders placed on weekends or holidays will be processed on the next business day.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Order Confirmation</h3>
            <p className="text-muted-foreground">
              You will receive an order confirmation email once your order has been placed. This email will include your order details and tracking information once available.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Shipping Methods & Delivery Times</h2>
            <p className="text-muted-foreground">
              We offer the following shipping options:
            </p>
            
            <div className="mt-4 space-y-4">
              <div className="p-4 bg-primary/5 rounded-md border border-primary/20">
                <h3 className="text-lg font-medium mb-2">Standard Shipping</h3>
                <p className="text-muted-foreground">
                  • Delivery time: 3-5 business days<br />
                  • Cost: ₹50 for orders under ₹499<br />
                  • Free for orders above ₹499
                </p>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-md border border-primary/20">
                <h3 className="text-lg font-medium mb-2">Express Shipping</h3>
                <p className="text-muted-foreground">
                  • Delivery time: 1-2 business days<br />
                  • Cost: ₹100 for all orders<br />
                  • Available for select locations
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground mt-4">
              <strong>Note:</strong> Delivery times are estimates and not guaranteed. Factors such as weather conditions, 
              high-volume shipping periods, and unforeseen circumstances may affect actual delivery times.
            </p>
          </section>
          
          <section className="mt-8 bg-secondary/30 p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">Shipping Coverage Area</h2>
            <p className="text-muted-foreground">
              We currently ship to all major cities and towns across India. For remote areas, additional shipping time and charges may apply.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">International Shipping</h3>
            <p className="text-muted-foreground">
              We currently do not offer international shipping. We are working to expand our services and will update when international shipping becomes available.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Tracking Your Order</h2>
            <p className="text-muted-foreground">
              Once your order ships, you will receive a shipping confirmation email with a tracking number. 
              You can use this tracking number to monitor the status of your delivery. 
            </p>
            <p className="text-muted-foreground mt-4">
              If you haven't received tracking information within 3 business days after placing your order, please contact us for assistance.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
            <p className="text-muted-foreground">
              Some products may have shipping restrictions due to their nature (perishable items) or regulatory requirements.
              These restrictions will be noted on the product page.
            </p>
          </section>
          
          <section className="mt-8 bg-secondary/30 p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">Damaged Items in Transit</h2>
            <p className="text-muted-foreground">
              If your item arrives damaged, please contact us immediately at orgifarmcare@gmail.com with photos of the damaged item and packaging.
              We will work with you to resolve the issue promptly, either through a replacement shipment or refund.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about our shipping policy, please contact us at:
            </p>
            <p className="text-muted-foreground mt-4">
              Email: orgifarmcare@gmail.com<br />
              Phone: +91 8969143072<br />
              Address: VILL-BIRODIH, TOLA-BIRODIH PANCH-BISENI KALA, GOLA, ROHTAS, Bihar, India - 821310.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default ShippingPolicyPage;
