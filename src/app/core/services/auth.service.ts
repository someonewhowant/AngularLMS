import { Injectable, signal, computed } from '@angular/core';
import { Observable, tap, of, throwError, delay } from 'rxjs';
import { User, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'lms_token';

  // Signals for application state
  readonly currentUser = signal<User | null>(null);
  readonly isAuthenticated = computed(() => !!this.currentUser());
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  constructor() {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    const token = this.getToken();
    if (token) {
      const storedUser = localStorage.getItem('lms_user');
      if (storedUser) {
        try {
          this.currentUser.set(JSON.parse(storedUser));
        } catch {
          this.logout();
        }
      }
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    // Simulated delay to feel like a real network request
    if (email === 'admin@codeblog.academy' && password === 'admin123') {
      const response: AuthResponse = {
        accessToken: 'mock_jwt_token_admin',
        user: {
          id: '1',
          email: 'admin@codeblog.academy',
          name: 'Admin Instructor',
          role: 'admin',
          xp: 1500,
          level: 3,
          avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=admin@codeblog.academy`,
        },
      };
      return of(response).pipe(
        delay(800),
        tap((res) => this.handleAuthSuccess(res))
      );
    } else if (email && password.length >= 6) {
      const response: AuthResponse = {
        accessToken: 'mock_jwt_token_student',
        user: {
          id: '2',
          email: email,
          name: email.split('@')[0],
          role: 'student',
          xp: 120,
          level: 1,
          avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${email}`,
        },
      };
      return of(response).pipe(
        delay(800),
        tap((res) => this.handleAuthSuccess(res))
      );
    } else {
      return throwError(() => new Error('Invalid email or password (min 6 characters)')).pipe(delay(500));
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('lms_user');
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.accessToken);
    localStorage.setItem('lms_user', JSON.stringify(response.user));
    this.currentUser.set(response.user);
  }

  updateXP(xpGained: number): void {
    this.currentUser.update((user) => {
      if (!user) return null;
      const newXp = (user.xp || 0) + xpGained;
      const newLevel = Math.floor(newXp / 500) + 1;
      const updated = { ...user, xp: newXp, level: newLevel };
      localStorage.setItem('lms_user', JSON.stringify(updated));
      return updated;
    });
  }
}
