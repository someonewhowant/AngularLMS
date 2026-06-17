import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { CourseService } from '@core/services/course.service';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, ButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  readonly authService = inject(AuthService);
  readonly courseService = inject(CourseService);
  private readonly router = inject(Router);

  // Derived signals
  readonly currentUser = this.authService.currentUser;
  readonly enrolledCourses = this.courseService.enrolledCourses;
  readonly totalProgress = this.courseService.totalProgress;

  // Next level estimation
  readonly nextLevelXp = computed(() => {
    const user = this.currentUser();
    if (!user) return 500;
    const currentLvl = user.level || 1;
    return currentLvl * 500;
  });

  readonly xpProgressPercentage = computed(() => {
    const user = this.currentUser();
    if (!user) return 0;
    const currentXp = user.xp || 0;
    const nextLvlXp = this.nextLevelXp();
    const currentLvlStart = (user.level ? user.level - 1 : 0) * 500;
    const currentLvlProgress = currentXp - currentLvlStart;
    const currentLvlTotal = nextLvlXp - currentLvlStart;
    return Math.min(100, Math.round((currentLvlProgress / currentLvlTotal) * 100));
  });

  incrementProgress(courseId: string | number, currentProgress: number): void {
    const nextProgress = Math.min(100, currentProgress + 25);
    this.courseService.updateProgress(courseId, nextProgress).subscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  resetProgress(): void {
    this.courseService.resetCourses();
  }
}
