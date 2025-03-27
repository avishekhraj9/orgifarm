
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Separator } from '@/components/ui/separator';

const AboutPage: React.FC = () => {
  return (
    <PageLayout className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About Orgifarm</h1>
        <Separator className="my-6" />

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground">
              Orgifarm was born out of a passion for authentic, traditional food products made with love and care. 
              Founded in rural Bihar, our journey began with the simple idea of bringing the authentic taste of 
              homemade pickles, pure ghee, and natural jams to homes across India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              Our mission is to provide yummy, high-quality products that enhance your taste of food while preserving 
              traditional recipes and supporting local communities. We believe in sustainable farming practices and 
              work directly with farmers to source the freshest ingredients for our products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Products</h2>
            <p className="text-muted-foreground">
              At Orgifarm, we take pride in our handcrafted products:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
              <li>
                <strong>Pickles:</strong> Made using traditional recipes passed down through generations, 
                our pickles bring authentic flavors to your table.
              </li>
              <li>
                <strong>Ghee:</strong> Pure, clarified butter made from the milk of grass-fed cows, 
                our ghee is rich in flavor and nutrients.
              </li>
              <li>
                <strong>Jams:</strong> Created with fresh, seasonal fruits and minimal processing, 
                our jams capture the true essence of nature's bounty.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Quality Commitment</h2>
            <p className="text-muted-foreground">
              Every product that bears the Orgifarm name undergoes rigorous quality checks. We use no artificial 
              preservatives, colors, or flavors. Our commitment to quality is unwavering, ensuring that you 
              receive only the best on your plate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
            <p className="text-muted-foreground">
              We love hearing from our customers! Feel free to reach out to us with your feedback, 
              questions, or suggestions. Your satisfaction is our priority.
            </p>
            <div className="mt-4">
              <p className="font-medium">ORGIFARM (OPC) PRIVATE LIMITED</p>
              <p className="text-muted-foreground">VILL-BIRODIH, TOLA-BIRODIH PANCH-BISENI KALA,GOLA,ROHTAS, Bihar, India - 821310.</p>
              <p className="text-muted-foreground">Phone: +91 8969143072</p>
              <p className="text-muted-foreground">Email: orgifarmcare@gmail.com</p>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
