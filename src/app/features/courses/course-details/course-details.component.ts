import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '@core/services/course.service';
import { AuthService } from '@core/services/auth.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { Course } from '@core/models/user.model';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly courseService = inject(CourseService);
  readonly authService = inject(AuthService);

  readonly course = signal<Course | null>(null);
  readonly isLoading = signal<boolean>(true);
  readonly isEnrolling = signal<boolean>(false);
  readonly enrollError = signal<string | null>(null);

  // Mock modules/syllabus to render in details view
  readonly syllabus = [
    {
      title: 'Module 1: Foundations & Prerequisites',
      duration: '1h 30m',
      lessons: ['Course overview & objectives', 'Setting up the developer environment', 'Hello World & Core Concepts'],
    },
    {
      title: 'Module 2: Directives, Signals, and State',
      duration: '2h 15m',
      lessons: ['Configuring local states with signals', 'Handling computed reactive operations', 'Side-effects with effects()'],
    },
    {
      title: 'Module 3: Core API Integration & Deployment',
      duration: '3h 00m',
      lessons: ['Setting up HTTP Interceptors', 'Handling tokens & session storage', 'Optimizing and building production bundles'],
    },
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Check if numeric or string ID
      const queryId = isNaN(Number(id)) ? id : Number(id);
      this.courseService.getCourseById(queryId).subscribe({
        next: (data) => {
          this.course.set(data);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
    } else {
      this.isLoading.set(false);
    }
  }

  enroll(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    const currentCourse = this.course();
    if (!currentCourse) return;

    this.isEnrolling.set(true);
    this.enrollError.set(null);

    this.courseService.enroll(currentCourse.id).subscribe({
      next: (success) => {
        this.isEnrolling.set(false);
        if (success) {
          // Update local status in signal
          this.course.update((c) => (c ? { ...c, enrolled: true } : null));
          // Redirect to student dashboard
          this.router.navigate(['/dashboard']);
        } else {
          this.enrollError.set('Enrollment failed. Please try again.');
        }
      },
      error: (err) => {
        this.isEnrolling.set(false);
        this.enrollError.set(err.message || 'Failed to enroll in the course.');
      },
    });
  }
}
