
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Separator } from '@/components/ui/separator';

const TermsPage: React.FC = () => {
  return (
    <PageLayout className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
        <Separator className="my-6" />
        
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-muted-foreground">
              Welcome to Orgifarm. These terms and conditions govern your use of our website and the purchase of products from our online store.
              By accessing our website or placing an order with us, you agree to be bound by these terms and conditions.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Ordering and Payment</h2>
            <p className="text-muted-foreground">
              When you place an order with us, you are making an offer to purchase products at the stated price. We reserve the right to accept or reject your order.
              Payment must be made in full at the time of ordering. We accept various payment methods as indicated on our website.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Delivery and Shipping</h2>
            <p className="text-muted-foreground">
              We aim to deliver products within the timeframe specified on our website. However, delivery times are estimates and not guaranteed.
              Risk of loss and damage to products passes to you upon delivery. Please inspect all products upon receipt.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Returns and Refunds</h2>
            <p className="text-muted-foreground">
              If you are not satisfied with your purchase, you may return unopened and unused products within 7 days of receipt for a refund or replacement.
              Perishable items like food products cannot be returned unless they are defective or damaged during shipping.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Product Information</h2>
            <p className="text-muted-foreground">
              We make every effort to display our products accurately, but we do not guarantee that the colors, dimensions, or other details shown on our website are accurate.
              Product information, including ingredients and nutritional information, is provided for informational purposes only.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content on our website, including text, graphics, logos, images, and software, is the property of Orgifarm and is protected by copyright and other intellectual property laws.
              You may not use, reproduce, distribute, or display any portion of the website without our prior written consent.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us at:
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

export default TermsPage;
