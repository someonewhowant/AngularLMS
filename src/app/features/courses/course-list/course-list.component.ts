import { Component, inject, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseService } from '@core/services/course.service';
import { AuthService } from '@core/services/auth.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { HeaderComponent } from '@shared/components/header/header';
import { Course } from '@core/models/user.model';

@Component({
  selector: 'app-course-list',
  imports: [RouterLink, ButtonComponent, HeaderComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent {
  readonly courseService = inject(CourseService);
  readonly authService = inject(AuthService);

  // Filter signal states
  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<string>('All');
  readonly selectedDifficulty = signal<string>('All');

  // Categories list
  readonly categories = ['All', 'Development', 'Design'];
  readonly difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filtered courses list
  readonly filteredCourses = computed(() => {
    const list = this.courseService.courses();
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    const diff = this.selectedDifficulty();

    return list.filter((course) => {
      const matchesQuery =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructorName.toLowerCase().includes(query);

      const matchesCategory = cat === 'All' || course.category === cat;
      const matchesDifficulty = diff === 'All' || course.difficulty === diff;

      return matchesQuery && matchesCategory && matchesDifficulty;
    });
  });

  updateSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  setDifficulty(difficulty: string): void {
    this.selectedDifficulty.set(difficulty);
  }

  enrollInCourse(courseId: string | number): void {
    if (!this.authService.isAuthenticated()) {
      // Prompt user or handle redirect
      return;
    }
    this.courseService.enroll(courseId).subscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
