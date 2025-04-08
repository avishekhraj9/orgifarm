
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import PageLayout from '@/components/PageLayout';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

const Index = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Add animations to elements on page load
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  const featuredProducts = getFeaturedProducts();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real application, this would call an API to handle the subscription
    // Simulating API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <PageLayout fullWidth>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-white to-accent">
        <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0">
            <span className="inline-block bg-secondary text-sm px-4 py-1 rounded-full mb-3 animate-fade-in">
              Traditional & Organic Products
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up">
              Authentic Indian 
              <span className="text-primary"> flavors</span> for your kitchen
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg animate-slide-up opacity-0" style={{ animationDelay: '100ms' }}>
              Discover our collection of handcrafted pickles, pure ghee, and homemade jams prepared using traditional recipes.
            </p>
            {/* Removed opacity-0 class from the div below to ensure buttons are visible from the start */}
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Button size="lg" className="rounded-full" asChild>
                <Link to="/products">
                  Shop Now <ShoppingBag className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <Link to="/products">Explore Products</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative animate-scale-in">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://savithrammas.com/site/image/cache/catalog/A-Guide-to-Savithrammas-Exotic-Pickles-and-Spices-1080x540.jpg"
                alt="Traditional Indian Pickles"
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg w-48 md:w-64 glass-card animate-fade-in opacity-0" style={{ animationDelay: '400ms' }}>
              <p className="text-sm font-medium mb-1">Mango Pickle</p>
              <p className="text-primary-foreground font-bold">₹299.99</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Browse our curated collections of minimal products across various categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={category.id} 
                to={`/products?category=${category.id}`}
                className="animate-on-scroll opacity-0 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] group-hover:shadow-md transition-all duration-300">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-white/80 mb-3">{category.description}</p>
                    <span className="inline-flex items-center text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                      Shop now 
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div className="animate-on-scroll opacity-0">
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-muted-foreground max-w-lg">
                Our most popular products chosen for their exceptional design and quality
              </p>
            </div>
            <Link 
              to="/products" 
              className="hidden md:inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 animate-on-scroll opacity-0"
            >
              View all products <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden animate-on-scroll opacity-0">
            <Button variant="outline" asChild>
              <Link to="/products">View all products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-12">What Our Customers Say</h2>
            
            <Carousel className="w-full">
              <CarouselContent>
                {/* First Testimonial */}
                <CarouselItem>
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-border relative mx-4">
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-white h-10 w-10 rounded-full flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.13456 9H5.37965C5.17485 9 5 8.83043 5 8.63203V5.36797C5 5.16957 5.17485 5 5.37965 5H9.13456C9.33936 5 9.51421 5.16957 9.51421 5.36797V8.63203C9.51421 8.83043 9.33936 9 9.13456 9Z" fill="currentColor"/>
                        <path d="M9.13456 19H5.37965C5.17485 19 5 18.8304 5 18.632V15.368C5 15.1696 5.17485 15 5.37965 15H9.13456C9.33936 15 9.51421 15.1696 9.51421 15.368V18.632C9.51421 18.8304 9.33936 19 9.13456 19Z" fill="currentColor"/>
                        <path d="M18.6204 9H14.8654C14.6606 9 14.4858 8.83043 14.4858 8.63203V5.36797C14.4858 5.16957 14.6606 5 14.8654 5H18.6204C18.8252 5 19 5.16957 19 5.36797V8.63203C19 8.83043 18.8252 9 18.6204 9Z" fill="currentColor"/>
                        <path d="M18.6204 19H14.8654C14.6606 19 14.4858 18.8304 14.4858 18.632V15.368C14.4858 15.1696 14.6606 15 14.8654 15H18.6204C18.8252 15 19 15.1696 19 15.368V18.632C19 18.8304 18.8252 19 18.6204 19Z" fill="currentColor"/>
                      </svg>
                    </div>
                    
                    <blockquote className="text-lg md:text-xl italic text-gray-700 mb-6">
                      "The traditional mango pickle from Orgifarm brings back childhood memories. The authentic taste and quality ingredients make it stand out from store-bought options. I'm a customer for life!"
                    </blockquote>
                    
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src="/img/avishekh1.jpg" 
                          alt="Customer" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Avishekh Raj</p>
                        <p className="text-sm text-muted-foreground">Home Chef</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                
                {/* Second Testimonial */}
                <CarouselItem>
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-border relative mx-4">
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-white h-10 w-10 rounded-full flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.13456 9H5.37965C5.17485 9 5 8.83043 5 8.63203V5.36797C5 5.16957 5.17485 5 5.37965 5H9.13456C9.33936 5 9.51421 5.16957 9.51421 5.36797V8.63203C9.51421 8.83043 9.33936 9 9.13456 9Z" fill="currentColor"/>
                        <path d="M9.13456 19H5.37965C5.17485 19 5 18.8304 5 18.632V15.368C5 15.1696 5.17485 15 5.37965 15H9.13456C9.33936 15 9.51421 15.1696 9.51421 15.368V18.632C9.51421 18.8304 9.33936 19 9.13456 19Z" fill="currentColor"/>
                        <path d="M18.6204 9H14.8654C14.6606 9 14.4858 8.83043 14.4858 8.63203V5.36797C14.4858 5.16957 14.6606 5 14.8654 5H18.6204C18.8252 5 19 5.16957 19 5.36797V8.63203C19 8.83043 18.8252 9 18.6204 9Z" fill="currentColor"/>
                        <path d="M18.6204 19H14.8654C14.6606 19 14.4858 18.8304 14.4858 18.632V15.368C14.4858 15.1696 14.6606 15 14.8654 15H18.6204C18.8252 15 19 15.1696 19 15.368V18.632C19 18.8304 18.8252 19 18.6204 19Z" fill="currentColor"/>
                      </svg>
                    </div>
                    
                    <blockquote className="text-lg md:text-xl italic text-gray-700 mb-6">
                      "I've been using Orgifarm's pure cow ghee for the past year, and the difference in flavor is remarkable. It adds a rich, authentic taste to my dishes that store-bought varieties simply can't match. Highly recommended!"
                    </blockquote>
                    
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src="/img/sumeet.jpg" 
                          alt="Sumeet Customer" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Sumeet Kumar</p>
                        <p className="text-sm text-muted-foreground">Food Blogger</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                
                {/* Third Testimonial */}
                <CarouselItem>
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-border relative mx-4">
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-primary text-white h-10 w-10 rounded-full flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.13456 9H5.37965C5.17485 9 5 8.83043 5 8.63203V5.36797C5 5.16957 5.17485 5 5.37965 5H9.13456C9.33936 5 9.51421 5.16957 9.51421 5.36797V8.63203C9.51421 8.83043 9.33936 9 9.13456 9Z" fill="currentColor"/>
                        <path d="M9.13456 19H5.37965C5.17485 19 5 18.8304 5 18.632V15.368C5 15.1696 5.17485 15 5.37965 15H9.13456C9.33936 15 9.51421 15.1696 9.51421 15.368V18.632C9.51421 18.8304 9.33936 19 9.13456 19Z" fill="currentColor"/>
                        <path d="M18.6204 9H14.8654C14.6606 9 14.4858 8.83043 14.4858 8.63203V5.36797C14.4858 5.16957 14.6606 5 14.8654 5H18.6204C18.8252 5 19 5.16957 19 5.36797V8.63203C19 8.83043 18.8252 9 18.6204 9Z" fill="currentColor"/>
                        <path d="M18.6204 19H14.8654C14.6606 19 14.4858 18.8304 14.4858 18.632V15.368C14.4858 15.1696 14.6606 15 14.8654 15H18.6204C18.8252 15 19 15.1696 19 15.368V18.632C19 18.8304 18.8252 19 18.6204 19Z" fill="currentColor"/>
                      </svg>
                    </div>
                    
                    <blockquote className="text-lg md:text-xl italic text-gray-700 mb-6">
                      "The wild honey collection from Orgifarm is exceptional! It's pure, raw, and has a complex flavor profile that mass-produced honey lacks. I appreciate their commitment to sustainable sourcing and supporting local communities."
                    </blockquote>
                    
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <div className="w-full h-full bg-secondary flex items-center justify-center text-primary font-bold text-lg">
                          PK
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Satyawan Singh</p>
                        <p className="text-sm text-muted-foreground">Nutritionist</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className="flex justify-center mt-8">
                <CarouselPrevious className="relative static left-0 translate-y-0 mr-2" />
                <CarouselNext className="relative static right-0 translate-y-0 ml-2" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="mb-8 text-white/80">
              Subscribe to get special offers, traditional recipe ideas, and updates on new product launches.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-grow py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                variant="secondary" 
                className="py-3 px-6 font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <p className="mt-4 text-sm text-white/60">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;
