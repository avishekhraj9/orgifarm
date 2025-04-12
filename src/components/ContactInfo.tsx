import React from 'react';
import { PhoneCall, Mail, MapPin } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
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
              Vasudev Bhawan, Vill-Birodih, Post-Pauni,<br />
              Dist-Rohtas, Bihar, 821310.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
