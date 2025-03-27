
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PhoneCall, Mail, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically send the form data to a server
    console.log('Form submitted');
    // You could add toast notification here
  };

  return (
    <PageLayout className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h1>
        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              Have questions about our products or want to place a bulk order? 
              We'd love to hear from you. Fill out the form or contact us directly.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <PhoneCall className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+91 8969143072</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">orgifarmcare@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">
                    VILL-BIRODIH, TOLA-BIRODIH PANCH-BISENI KALA,<br />
                    GOLA, ROHTAS, Bihar, India - 821310.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input 
                  placeholder="Your Name" 
                  className="bg-white" 
                  required
                />
              </div>
              <div>
                <Input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-white" 
                  required
                />
              </div>
              <div>
                <Input 
                  placeholder="Subject" 
                  className="bg-white" 
                  required
                />
              </div>
              <div>
                <Textarea 
                  placeholder="Your Message" 
                  className="bg-white min-h-[150px]" 
                  required
                />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
