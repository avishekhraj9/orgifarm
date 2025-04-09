
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Separator } from '@/components/ui/separator';

const RefundPolicyPage: React.FC = () => {
  return (
    <PageLayout className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Return, Refund & Shipping Policy</h1>
        <Separator className="my-6" />
        
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Our Policy</h2>
            <p className="text-muted-foreground">
              Thank you for shopping at Orgifarm. If you are not entirely satisfied with your purchase, 
              we're here to help. This policy outlines how you can return items, request refunds, and understand our shipping practices.
            </p>
          </section>
          
          <section className="mt-8 bg-secondary/30 p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
            <p className="text-muted-foreground">
              You have <span className="font-medium">7 calendar days</span> to return an item from the date you received it. To be eligible for a return, 
              your item must be unused and in the same condition that you received it. Your item must be in the 
              original packaging. Your item needs to have the receipt or proof of purchase.
            </p>
            <p className="text-muted-foreground mt-4">
              Due to the nature of food products, we have special considerations:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
              <li>Perishable items like food products cannot be returned unless they are defective.</li>
              <li>If a product is received damaged or defective, please contact us within 24 hours of delivery.</li>
              <li>For honey products, please check for crystallization which is a natural process and not a defect.</li>
            </ul>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Return Process</h3>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>Contact our customer service team at orgifarmcare@gmail.com or +91 8969143072 to initiate a return.</li>
              <li>You will receive return instructions and a return authorization number.</li>
              <li>Pack the product securely in appropriate packaging.</li>
              <li>Include your order number and return authorization number with the return.</li>
              <li>Ship the product to the address provided in the return instructions.</li>
            </ol>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Refunds</h2>
            <p className="text-muted-foreground">
              Once we receive your returned item, we will inspect it and notify you that we have received your returned item. 
              We will immediately notify you on the status of your refund after inspecting the item.
            </p>
            <p className="text-muted-foreground mt-4">
              If your return is approved, we will initiate a refund to your original method of payment.
              You will receive the credit within a certain amount of days, depending on your card issuer's policies.
            </p>
            <div className="bg-primary/5 p-4 rounded-md mt-4 border border-primary/20">
              <h3 className="text-lg font-medium mb-2">Refund Timeline</h3>
              <p className="text-muted-foreground">
                • Credit/Debit Card: 5-7 business days<br />
                • UPI Payments: 1-3 business days<br />
                • Bank Transfer: 3-5 business days
              </p>
            </div>
          </section>
          
          <section className="mt-8 bg-secondary/30 p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">Shipping Policy</h2>
            <p className="text-muted-foreground">
              At Orgifarm, we strive to deliver your products quickly and safely. Please review our shipping policy below:
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Processing Time</h3>
            <p className="text-muted-foreground">
              All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Shipping Methods & Delivery Times</h3>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
              <li><span className="font-medium">Standard Shipping:</span> 3-5 business days (₹50 for orders under ₹499)</li>
              <li><span className="font-medium">Express Shipping:</span> 1-2 business days (₹100 for all orders)</li>
              <li><span className="font-medium">Free Shipping:</span> Available on all orders above ₹499 (Standard delivery time)</li>
            </ul>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Shipping Areas</h3>
            <p className="text-muted-foreground">
              We currently ship to all major cities and towns across India. For remote areas, additional shipping time and charges may apply.
            </p>
            
            <div className="bg-primary/5 p-4 rounded-md mt-6 border border-primary/20">
              <h3 className="text-lg font-medium mb-2">Tracking Information</h3>
              <p className="text-muted-foreground">
                You will receive a shipping confirmation email with tracking information once your order has been shipped. 
                You can track your order status by logging into your account on our website or by using the tracking number provided.
              </p>
            </div>
            
            <h3 className="text-xl font-medium mt-6 mb-3">International Shipping</h3>
            <p className="text-muted-foreground">
              We currently do not offer international shipping. We are working to expand our services and will update when international shipping becomes available.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
            <p className="text-muted-foreground">
              The following items cannot be returned:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
              <li>Products that have been opened or used, unless defective.</li>
              <li>Products without original packaging, labels, or proof of purchase.</li>
              <li>Products that have passed their expiration date.</li>
              <li>Products purchased on sale or with a discount code (unless defective).</li>
            </ul>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
            <p className="text-muted-foreground">
              You will be responsible for paying for your own shipping costs for returning your item. 
              Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be 
              deducted from your refund.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about our return, refund, or shipping policies, please contact us at:
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

export default RefundPolicyPage;
