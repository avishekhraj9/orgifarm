
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Separator } from '@/components/ui/separator';

const RefundPolicyPage: React.FC = () => {
  return (
    <PageLayout className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Refund Policy</h1>
        <Separator className="my-6" />
        
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Return & Refund Policy</h2>
            <p className="text-muted-foreground">
              Thank you for shopping at Orgifarm. If you are not entirely satisfied with your purchase, 
              we're here to help.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Returns</h2>
            <p className="text-muted-foreground">
              You have 7 calendar days to return an item from the date you received it. To be eligible for a return, 
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
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Refunds</h2>
            <p className="text-muted-foreground">
              Once we receive your item, we will inspect it and notify you that we have received your returned item. 
              We will immediately notify you on the status of your refund after inspecting the item.
            </p>
            <p className="text-muted-foreground mt-4">
              If your return is approved, we will initiate a refund to your original method of payment.
              You will receive the credit within a certain amount of days, depending on your card issuer's policies.
            </p>
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
              If you have any questions about our refund policy, please contact us at:
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
