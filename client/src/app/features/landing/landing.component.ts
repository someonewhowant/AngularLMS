import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../core/services/course.service';
import { BlogService } from '../../core/services/blog.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AuthService } from '../../core/services/auth.service';
import { HeaderComponent } from '../../shared/components/header/header';
import { BlogCard } from '../blog/components/blog-card/blog-card';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, ButtonComponent, HeaderComponent, BlogCard],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  private readonly courseService = inject(CourseService);
  private readonly blogService = inject(BlogService);
  readonly authService = inject(AuthService);

  // Take the first 3 courses as featured courses
  readonly featuredCourses = computed(() => {
    return this.courseService.courses().slice(0, 3);
  });

  // Take the first 3 blog posts as latest articles
  readonly latestArticles = computed(() => {
    return this.blogService.posts().slice(0, 3);
  });
}
