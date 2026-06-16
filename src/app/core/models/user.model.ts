export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  xp?: number;
  level?: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorName: string;
  thumbnail: string;
  duration: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lessonsCount: number;
  studentsCount: number;
  xpReward: number;
  enrolled?: boolean;
  progress?: number; // 0 to 100
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
