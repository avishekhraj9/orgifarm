
import React from 'react';
import PageLayout from '@/components/PageLayout';
import { blogPosts } from '@/data/blog-posts';
import BlogCard from '@/components/BlogCard';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const BlogPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Orgifarm Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest news, tips, and stories about organic farming and sustainable living.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map(post => (
            <BlogCard key={post.id} post={post} />
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
