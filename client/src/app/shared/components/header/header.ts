import { Component, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownComponent } from '../dropdown/dropdown';
import { CourseService } from '@core/services/course.service';
import { AuthService } from '@core/services/auth.service';
import { Course } from '@core/models/user.model';

interface SearchResult {
  id: string | number;
  title: string;
  type: 'course' | 'article';
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, DropdownComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() isLoggedIn: boolean = false;
  @Input() user = {
    name: 'Elena Vance',
    role: 'Instructor',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf0EQJUd4P-jZghpQLsXzSlGGgpRB9uADcnA-LncH-7N1bkMLH_hu50MVH9ieBKzInz_5IA4Ojb5B4vXICKDFkJFpyiB-LQ3hY1KvdWAc-FWqKtFiDQ7sNaJgZQHbSCseKjaefHBrfUpeMx1dc0yNaoBQk5vcZz8p_qtCQsv5Qo4jQrnsu65p0KB0YOTLnuuT9XvkQ3dxvBH49Z7xb9X9V2mJWQFri2mzG26DafGTWFjPyreCrDwyXESrfZ_QwoVmlaLV6fuAWNhWP'
  };

  private readonly courseService = inject(CourseService);
  private readonly authService = inject(AuthService);

  searchQuery = '';
  showSearchResults = false;
  searchResultsCourses: any[] = [];
  searchResultsArticles: any[] = [];

  logout() {
    this.authService.logout();
  }

  private mockArticles = [
    { id: '1', title: 'Optimizing Postgres for Write-Heavy Workloads' },
    { id: '2', title: 'The LMAX Architecture: High Performance Messaging' },
    { id: '3', title: 'Modern Concurrent Programming with Virtual Threads' },
    { id: '4', title: 'Kubernetes Networking Deep Dive' },
    { id: '5', title: 'Scaling to 100k Requests Per Second' },
    { id: '6', title: 'Sharding Strategies for Global Scale' }
  ];

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    
    if (this.searchQuery.trim().length < 2) {
      this.searchResultsCourses = [];
      this.searchResultsArticles = [];
      this.showSearchResults = false;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    
    // Filter courses
    this.searchResultsCourses = (this.courseService.courses() as Course[]).filter((course: Course) => 
      course.title.toLowerCase().includes(query) || 
      course.description.toLowerCase().includes(query)
    ).slice(0, 3);

    // Filter articles
    this.searchResultsArticles = this.mockArticles.filter(article => 
      article.title.toLowerCase().includes(query)
    ).slice(0, 3);

    this.showSearchResults = true;
  }

  onSearchFocus() {
    if (this.searchQuery.trim().length >= 2) {
      this.showSearchResults = true;
    }
  }

  onSearchBlur() {
    // Delay slightly to allow click/navigation on results
    setTimeout(() => {
      this.showSearchResults = false;
    }, 200);
  }

  clearSearch() {
    this.searchQuery = '';
    this.showSearchResults = false;
    this.searchResultsCourses = [];
    this.searchResultsArticles = [];
  }
}
