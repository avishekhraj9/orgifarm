
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={post.coverImage || '/placeholder.svg'} 
          alt={post.title}
          className="object-cover w-full h-full transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="flex-grow">
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        <div className="flex items-center text-muted-foreground text-sm mt-2">
          <Calendar className="h-4 w-4 mr-1" />
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</time>
        </div>
        <CardDescription className="mt-2 line-clamp-3">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/blog/${post.slug}`}>
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
