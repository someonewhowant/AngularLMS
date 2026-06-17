import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCard, BlogPost } from './components/blog-card/blog-card';
import { HeaderComponent } from '../../shared/components/header/header';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, BlogCard, HeaderComponent],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  categories = ['All', 'System Design', 'Databases', 'Java', 'DevOps'];
  activeCategory = 'All';

  featuredArticle = {
    title: 'Building a Distributed Task Queue from Scratch',
    excerpt: 'Learn how to handle massive scale and ensure exactly-once delivery using Redis and Go. We dive deep into the internals of lock management and message reliability.',
    author: 'Dr. Elena Vance',
    authorRole: 'Principal Engineer',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf0EQJUd4P-jZghpQLsXzSlGGgpRB9uADcnA-LncH-7N1bkMLH_hu50MVH9ieBKzInz_5IA4Ojb5B4vXICKDFkJFpyiB-LQ3hY1KvdWAc-FWqKtFiDQ7sNaJgZQHbSCseKjaefHBrfUpeMx1dc0yNaoBQk5vcZz8p_qtCQsv5Qo4jQrnsu65p0KB0YOTLnuuT9XvkQ3dxvBH49Z7xb9X9V2mJWQFri2mzG26DafGTWFjPyreCrDwyXESrfZ_QwoVmlaLV6fuAWNhWP'
  };

  posts: BlogPost[] = [
    {
      id: '1',
      category: 'Databases',
      date: 'Jan 12, 2024',
      title: 'Optimizing Postgres for Write-Heavy Workloads',
      excerpt: 'Deep dive into VACUUM strategies, WAL tuning, and index overhead management for high-throughput systems.'
    },
    {
      id: '2',
      category: 'System Design',
      date: 'Jan 10, 2024',
      title: 'The LMAX Architecture: High Performance Messaging',
      excerpt: 'Understanding the Disruptor pattern and how to achieve ultra-low latency in modern Java environments.'
    },
    {
      id: '3',
      category: 'Java',
      date: 'Jan 08, 2024',
      title: 'Modern Concurrent Programming with Virtual Threads',
      excerpt: 'How Project Loom changes the way we write scalable servers without the complexity of reactive streams.'
    },
    {
      id: '4',
      category: 'DevOps',
      date: 'Jan 05, 2024',
      title: 'Kubernetes Networking Deep Dive',
      excerpt: 'Exploring CNI, Service Mesh, and how packets flow from the edge to your microservices in a cluster.'
    },
    {
      id: '5',
      category: 'System Design',
      date: 'Jan 02, 2024',
      title: 'Scaling to 100k Requests Per Second',
      excerpt: 'Tactical advice on caching, load balancing, and database connection pooling under extreme pressure.'
    },
    {
      id: '6',
      category: 'Databases',
      date: 'Dec 28, 2023',
      title: 'Sharding Strategies for Global Scale',
      excerpt: 'When to shard, how to choose a partition key, and the operational reality of managing distributed databases.'
    }
  ];

  setCategory(category: string) {
    this.activeCategory = category;
  }
}
