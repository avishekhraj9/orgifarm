
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import { getBlogPostBySlug } from '@/data/blog-posts';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post && slug) {
      navigate('/blog', { replace: true });
    }
  }, [post, slug, navigate]);

  if (!post) {
    return null;
  }

  return (
    <PageLayout>
      <article className="max-w-3xl mx-auto py-12 px-4">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/blog" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div>·</div>
            <div className="text-muted-foreground">By {post.author}</div>
          </div>
        </div>

        {post.coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center flex-wrap gap-2">
              <Tag className="h-4 w-4 mr-2" />
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </article>
    </PageLayout>
  );
};

export default BlogPostPage;
