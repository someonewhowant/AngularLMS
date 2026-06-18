import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCard } from './components/blog-card/blog-card';
import { HeaderComponent } from '../../shared/components/header/header';
import { BlogService } from '@core/services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, BlogCard, HeaderComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  private readonly blogService = inject(BlogService);

  categories = ['All', 'System Design', 'Databases', 'Java', 'DevOps'];
  activeCategory = signal('All');

  featuredArticle = {
    title: 'Building a Distributed Task Queue from Scratch',
    excerpt: 'Learn how to handle massive scale and ensure exactly-once delivery using Redis and Go. We dive deep into the internals of lock management and message reliability.',
    author: 'Dr. Elena Vance',
    authorRole: 'Principal Engineer',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf0EQJUd4P-jZghpQLsXzSlGGgpRB9uADcnA-LncH-7N1bkMLH_hu50MVH9ieBKzInz_5IA4Ojb5B4vXICKDFkJFpyiB-LQ3hY1KvdWAc-FWqKtFiDQ7sNaJgZQHbSCseKjaefHBrfUpeMx1dc0yNaoBQk5vcZz8p_qtCQsv5Qo4jQrnsu65p0KB0YOTLnuuT9XvkQ3dxvBH49Z7xb9X9V2mJWQFri2mzG26DafGTWFjPyreCrDwyXESrfZ_QwoVmlaLV6fuAWNhWP'
  };

  readonly posts = computed(() => {
    const active = this.activeCategory();
    const allPosts = this.blogService.posts();
    if (active === 'All') return allPosts;
    return allPosts.filter(p => p.category === active);
  });

  setCategory(category: string) {
    this.activeCategory.set(category);
  }
}
