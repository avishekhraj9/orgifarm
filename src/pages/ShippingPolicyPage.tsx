
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
          <p className="text-muted-foreground">Last updated: {new Date('2025-04-12').toLocaleDateString()}</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">🚚 Shipping Terms & Conditions</h2>
            <p className="text-muted-foreground">
              Effective Date: April 12, 2025
            </p>
            <p className="text-muted-foreground mt-3">
              At Orgifarm, we're committed to delivering your products in a timely, safe, and cost-effective way. 
              Please review our shipping terms below to understand how we handle order deliveries.
            </p>
          </section>
          
          <section className="mt-8 bg-secondary/30 p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">📦 Shipping Overview</h2>
            <p className="text-muted-foreground mb-3">
              <strong>Processing Time:</strong> Orders are usually processed within 1–2 business days after successful payment.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong>Delivery Time:</strong> Standard delivery typically takes 3–5 business days from the date of dispatch.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Shipping Charges:</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Free Shipping is available when eligible promotional offers are applied at checkout.</li>
              <li>If no offer is applied, shipping charges may be added depending on the order value, delivery location, and associated logistics cost — with the intent of maintaining minimum operational loss or maximum feasible profit on each order.</li>
            </ul>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">🕒 Delivery Option</h2>
            <p className="text-muted-foreground font-medium">Standard Delivery Only:</p>
            <p className="text-muted-foreground ml-4">
              Orgifarm currently offers only Standard Delivery across India. This ensures timely delivery while keeping operational costs sustainable.
              <br />(Estimated delivery: 3–5 business days)
            </p>
          </section>
          
          <section className="mt-8 bg-secondary/30 p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">📍 Delivery Areas</h2>
            <p className="text-muted-foreground">
              We ship to most locations across India. You can verify service availability at checkout by entering your delivery pin code.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">📦 Order Tracking</h2>
            <p className="text-muted-foreground">
              Once your order is shipped, we'll send you a tracking number via SMS and email. 
              You can track your order status through the My Orders section of your account.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">🛑 Delivery Exceptions</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Remote Areas:</strong> Delivery may be limited or delayed in certain remote or government-regulated zones.</li>
              <li><strong>Bulk/High-Value Orders:</strong> Orders exceeding a certain value may require additional verification to ensure secure delivery.</li>
            </ul>
          </section>
          
          <section className="mt-8 bg-secondary/30 p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">🔄 Returns & Refunds</h2>
            <p className="text-muted-foreground">
              For full details on returns, exchanges, and refund processes, please refer to our dedicated Return & Refund Policy.
              This page includes eligibility criteria, how to initiate a return, processing timelines, and more.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">📞 Customer Support</h2>
            <p className="text-muted-foreground">
              We're here to help you:
            </p>
            <p className="text-muted-foreground mt-4">
              Email: orgifarmcare@gmail.com<br />
              Phone: +91-8969143072<br />
              Support Hours: All days of the week.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default ShippingPolicyPage;
