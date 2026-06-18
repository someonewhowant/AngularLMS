export interface BlogPost {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorAvatar: string;
  readTime: string;
  tags: string[];
  content?: string;
}
