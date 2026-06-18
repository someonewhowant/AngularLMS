import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BlogPost } from '../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private readonly initialPosts: BlogPost[] = [
    {
      id: '1',
      category: 'Databases',
      date: 'Jan 12, 2024',
      title: 'Optimizing Postgres for Write-Heavy Workloads',
      excerpt: 'Deep dive into VACUUM strategies, WAL tuning, and index overhead management for high-throughput systems.',
      authorName: 'Sarah Miller',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBejvwwEfgdWgNEgZH6U7sbJsely7x-0CJyAt59sZTtZHjJFMnJIXlMyYA7Sc5K_4RauQlvkaK4r2yzECFFG1Fjr9nEwg2D-Y0-itLqovNNdf8ilQl6wgcwU6AYWMylLAHcfKNXFJo28OWL0vptVj0UgHoWOSRIUNF27KQRdHSkoUWB5zUzxG_UNFowA0R8hJrCDnyBNo-lJj6ozbTHTzxMz-v-U75WhC4DXoGO_BZ7Cz9w7VehhVPTjDcz4YPeT8K5J4-PxwdnOO0f',
      readTime: '8 min read',
      tags: ['SQL', 'PERFORMANCE'],
    },
    {
      id: '2',
      category: 'System Design',
      date: 'Jan 10, 2024',
      title: 'The LMAX Architecture: High Performance Messaging',
      excerpt: 'Understanding the Disruptor pattern and how to achieve ultra-low latency in modern Java environments.',
      authorName: 'Alex Chen',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcQA6yUwMN_Sn1KW6F7s4RQAk3w3-ZWTAoztCeA6mQvcZbr21nftzzw5pioVMSPJcvv1_TU3xiuPYfofmwc8ZP8Ovpio2oGoPk0QGjOLVogvAxLdvp87PkDvxImji8Z8UCb1Wsglg6TR1fK8mW6znTEstt8fMvVhuRkO4l1Vd2e8Cf1-9JvW14H_6VrwBxeHz8cijbMA48pqpKdCOrQZd2zBWSWxQIX7-RbD8eCGfyWtnosOotdfrv6EoNGv-JRNLY2jp9BQNrMV-7',
      readTime: '5 min read',
      tags: ['KAFKA', 'BACKEND'],
    },
    {
      id: '3',
      category: 'Java',
      date: 'Jan 08, 2024',
      title: 'Modern Concurrent Programming with Virtual Threads',
      excerpt: 'How Project Loom changes the way we write scalable servers without the complexity of reactive streams.',
      authorName: 'Dr. Elena Vance',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf0EQJUd4P-jZghpQLsXzSlGGgpRB9uADcnA-LncH-7N1bkMLH_hu50MVH9ieBKzInz_5IA4Ojb5B4vXICKDFkJFpyiB-LQ3hY1KvdWAc-FWqKtFiDQ7sNaJgZQHbSCseKjaefHBrfUpeMx1dc0yNaoBQk5vcZz8p_qtCQsv5Qo4jQrnsu65p0KB0YOTLnuuT9XvkQ3dxvBH49Z7xb9X9V2mJWQFri2mzG26DafGTWFjPyreCrDwyXESrfZ_QwoVmlaLV6fuAWNhWP',
      readTime: '7 min read',
      tags: ['JAVA', 'CONCURRENCY'],
    },
    {
      id: '4',
      category: 'DevOps',
      date: 'Jan 05, 2024',
      title: 'Kubernetes Networking Deep Dive',
      excerpt: 'Exploring CNI, Service Mesh, and how packets flow from the edge to your microservices in a cluster.',
      authorName: 'James Wilson',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtozOyjukxrJUSjuo1fWq_y65gGUdhBTo7F0XLLiWlQcr4W6K3vh2fka8VqSUlRqIB6IcuWPgMDZumzXtjHxS470agYZ-hu509Xj7_oA5FrREbJz43Gg1JESfzUCzqURFesY3RQezdBZxVscMEsS6KfBukGvzj6KAM6fDAISGYAJPRGnRqaLeYkyN3ZmV59-WBljQMF7-KEovmpz-d_zcmu-0Bwii68yrJt-2XSU6cgKkwWmiMuFT-31VR4-dayNgkRTN25VFuinYT',
      readTime: '6 min read',
      tags: ['DEVOPS', 'DOCKER'],
    },
    {
      id: '5',
      category: 'System Design',
      date: 'Jan 02, 2024',
      title: 'Scaling to 100k Requests Per Second',
      excerpt: 'Tactical advice on caching, load balancing, and database connection pooling under extreme pressure.',
      authorName: 'Alex Chen',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcQA6yUwMN_Sn1KW6F7s4RQAk3w3-ZWTAoztCeA6mQvcZbr21nftzzw5pioVMSPJcvv1_TU3xiuPYfofmwc8ZP8Ovpio2oGoPk0QGjOLVogvAxLdvp87PkDvxImji8Z8UCb1Wsglg6TR1fK8mW6znTEstt8fMvVhuRkO4l1Vd2e8Cf1-9JvW14H_6VrwBxeHz8cijbMA48pqpKdCOrQZd2zBWSWxQIX7-RbD8eCGfyWtnosOotdfrv6EoNGv-JRNLY2jp9BQNrMV-7',
      readTime: '10 min read',
      tags: ['SCALING', 'CACHING'],
    },
    {
      id: '6',
      category: 'Databases',
      date: 'Dec 28, 2023',
      title: 'Sharding Strategies for Global Scale',
      excerpt: 'When to shard, how to choose a partition key, and the operational reality of managing distributed databases.',
      authorName: 'Sarah Miller',
      authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBejvwwEfgdWgNEgZH6U7sbJsely7x-0CJyAt59sZTtZHjJFMnJIXlMyYA7Sc5K_4RauQlvkaK4r2yzECFFG1Fjr9nEwg2D-Y0-itLqovNNdf8ilQl6wgcwU6AYWMylLAHcfKNXFJo28OWL0vptVj0UgHoWOSRIUNF27KQRdHSkoUWB5zUzxG_UNFowA0R8hJrCDnyBNo-lJj6ozbTHTzxMz-v-U75WhC4DXoGO_BZ7Cz9w7VehhVPTjDcz4YPeT8K5J4-PxwdnOO0f',
      readTime: '9 min read',
      tags: ['SHARDING', 'DISTRIBUTED'],
    },
  ];

  readonly posts = signal<BlogPost[]>(this.initialPosts);

  getPostById(id: string): Observable<BlogPost | null> {
    const match = this.posts().find((p) => p.id === id);
    return of(match || null);
  }
}
