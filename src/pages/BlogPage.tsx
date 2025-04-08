
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { blogPosts } from '@/data/blog-posts';
import BlogCard from '@/components/BlogCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { sendBlogNotification } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const BlogPage: React.FC = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  
  // This would be controlled by an actual authentication system in production
  const toggleAdminView = () => {
    setIsAdmin(!isAdmin);
  };

  const handleNotifySubscribers = async (blogId: string, blogTitle: string, blogSlug: string) => {
    try {
      const result = await sendBlogNotification(blogId, blogTitle, blogSlug);
      
      toast({
        title: result.success ? "Notification sent" : "Notification failed",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error sending notification:", error);
      toast({
        title: "Notification failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Orgifarm Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest news, tips, and stories about organic farming and sustainable living.
          </p>
          
          {/* This would be hidden behind proper authentication in production */}
          <div className="mt-4">
            <Button variant="outline" onClick={toggleAdminView}>
              {isAdmin ? "Hide Admin View" : "Show Admin View"}
            </Button>
          </div>
        </div>

        <div className={`grid grid-cols-${isMobile ? '2' : '1'} md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12`}>
          {blogPosts.map(post => (
            <div key={post.id}>
              <BlogCard post={post} />
              
              {isAdmin && (
                <div className="mt-2 text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleNotifySubscribers(post.id, post.title, post.slug)}
                  >
                    Notify Subscribers
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </PageLayout>
  );
};

export default BlogPage;
