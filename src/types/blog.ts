
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  coverImage?: string;
  slug: string;
  tags?: string[];
}
