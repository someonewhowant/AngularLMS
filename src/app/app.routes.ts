import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/student-registration/student-registration').then((m) => m.StudentRegistration),
  },
  {
    path: 'register-teacher',
    loadComponent: () =>
      import('./features/auth/teacher-registration/teacher-registration').then((m) => m.TeacherRegistration),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'teacher-dashboard',
    loadComponent: () =>
      import('./features/teacher-dashboard/teacher-dashboard').then((m) => m.TeacherDashboard),
    canActivate: [authGuard],
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./features/courses/course-list/course-list.component').then(
        (m) => m.CourseListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./features/courses/course-details/course-details.component').then(
        (m) => m.CourseDetailsComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/blog/blog').then((m) => m.Blog),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then((m) => m.LandingComponent),
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
