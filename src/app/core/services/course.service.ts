import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Course } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  private readonly initialCourses: Course[] = [
    {
      id: 'angular-basics',
      title: 'Angular 21 Basics & Modern Standalone APIs',
      description: 'Master standalone components, template control flow, signal-driven state, and reactive forms.',
      instructorName: 'Sarah Jenkins',
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      duration: '6 hours',
      category: 'Development',
      difficulty: 'Beginner',
      lessonsCount: 12,
      studentsCount: 1250,
      xpReward: 300,
      enrolled: false,
      progress: 0,
    },
    {
      id: 'advanced-signals',
      title: 'Reactive Architecture with Angular Signals',
      description: 'Deep dive into signals, computed states, effects, custom reactive streams, and RxJS interop.',
      instructorName: 'Dan Abramov',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
      duration: '4 hours',
      category: 'Development',
      difficulty: 'Advanced',
      lessonsCount: 8,
      studentsCount: 840,
      xpReward: 500,
      enrolled: false,
      progress: 0,
    },
    {
      id: 'css-layouts-premium',
      title: 'Stunning Web UI Aesthetics & Vanilla CSS Mastery',
      description: 'Create high-fidelity responsive user interfaces with CSS Grid, Flexbox, custom variables, and animations.',
      instructorName: 'Elena Rostova',
      thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
      duration: '8 hours',
      category: 'Design',
      difficulty: 'Intermediate',
      lessonsCount: 15,
      studentsCount: 1980,
      xpReward: 400,
      enrolled: false,
      progress: 0,
    },
    {
      id: 'rxjs-in-practice',
      title: 'RxJS Streams & Advanced State Management',
      description: 'Learn pipeable operators, subjects, behavior subjects, high-order mapping operators, and state handling.',
      instructorName: 'Ben Lesh',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      duration: '5 hours',
      category: 'Development',
      difficulty: 'Advanced',
      lessonsCount: 10,
      studentsCount: 1450,
      xpReward: 450,
      enrolled: false,
      progress: 0,
    },
  ];

  // Course state signal
  readonly courses = signal<Course[]>(this.initialCourses);

  // Derived signals
  readonly enrolledCourses = computed(() =>
    this.courses().filter((course) => course.enrolled)
  );

  readonly availableCourses = computed(() =>
    this.courses().filter((course) => !course.enrolled)
  );

  readonly totalProgress = computed(() => {
    const enrolled = this.enrolledCourses();
    if (enrolled.length === 0) return 0;
    const sum = enrolled.reduce((acc, c) => acc + (c.progress || 0), 0);
    return Math.round(sum / enrolled.length);
  });

  constructor() {
    this.loadState();
  }

  private loadState(): void {
    const stored = localStorage.getItem('lms_courses');
    if (stored) {
      try {
        this.courses.set(JSON.parse(stored));
      } catch {
        // Fallback to default list if parsing fails
        this.saveState();
      }
    } else {
      this.saveState();
    }
  }

  private saveState(): void {
    localStorage.setItem('lms_courses', JSON.stringify(this.courses()));
  }

  enroll(courseId: string): Observable<boolean> {
    this.courses.update((list) =>
      list.map((c) => (c.id === courseId ? { ...c, enrolled: true, progress: 0 } : c))
    );
    this.saveState();
    
    // Reward registration XP
    this.authService.updateXP(50);
    return of(true);
  }

  updateProgress(courseId: string, progress: number): Observable<boolean> {
    let xpRewardGained = 0;
    this.courses.update((list) =>
      list.map((c) => {
        if (c.id === courseId) {
          const oldProgress = c.progress || 0;
          // If the course is completed, reward full course XP
          if (progress === 100 && oldProgress < 100) {
            xpRewardGained = c.xpReward;
          }
          return { ...c, progress: Math.min(100, Math.max(0, progress)) };
        }
        return c;
      })
    );
    this.saveState();

    if (xpRewardGained > 0) {
      this.authService.updateXP(xpRewardGained);
    }
    return of(true);
  }

  resetCourses(): void {
    this.courses.set(this.initialCourses.map(c => ({ ...c, enrolled: false, progress: 0 })));
    this.saveState();
  }
}
