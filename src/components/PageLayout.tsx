
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className,
  fullWidth = false
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={cn(
        "flex-grow pt-28 animate-fade-in", 
        fullWidth ? "" : "container px-4",
        className
      )}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
