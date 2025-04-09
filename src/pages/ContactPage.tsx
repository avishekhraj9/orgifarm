
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Separator } from '@/components/ui/separator';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';

const ContactPage: React.FC = () => {
  return (
    <PageLayout className="py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h1>
        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
