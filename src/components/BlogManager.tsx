
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { sendBlogNotification } from '@/lib/supabase';
import { blogPosts } from '@/data/blog-posts';

// This component would typically be used in an admin area
// It's included here as a demonstration of the blog notification functionality
const BlogManager: React.FC = () => {
  const [isNotifying, setIsNotifying] = useState(false);
  const { toast } = useToast();

  const handleNotifySubscribers = async (blogId: string, blogTitle: string, blogSlug: string) => {
    setIsNotifying(true);
    
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
    } finally {
      setIsNotifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Blog Posts</h2>
      <p className="text-muted-foreground">
        Send notifications to subscribers about blog posts.
      </p>

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <h3 className="font-medium">{post.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              ID: {post.id} | Slug: {post.slug}
            </p>
            <Button 
              onClick={() => handleNotifySubscribers(post.id, post.title, post.slug)}
              disabled={isNotifying}
              size="sm"
            >
              {isNotifying ? "Sending..." : "Notify Subscribers"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;
