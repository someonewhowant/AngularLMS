import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        id: number;
        email: string;
        role: string;
        points: number;
        lastLoginAt: Date;
        posts: import("../posts/entities/post.entity").Post[];
        comments: import("../comments/entities/comment.entity").Comment[];
        bookmarks: import("../bookmarks/entities/bookmark.entity").Bookmark[];
        courses: import("../courses/entities/course.entity").Course[];
        enrollments: import("../enrollments/entities/enrollment.entity").Enrollment[];
        quizResults: import("../quizzes/entities/user-quiz-result.entity").UserQuizResult[];
        achievements: import("../achievements/entities/user-achievement.entity").UserAchievement[];
        activities: import("../analytics/entities/user-activity.entity").UserActivity[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): Promise<{
        id: number;
        email: string;
        role: string;
        points: number;
        lastLoginAt: Date;
        posts: import("../posts/entities/post.entity").Post[];
        comments: import("../comments/entities/comment.entity").Comment[];
        bookmarks: import("../bookmarks/entities/bookmark.entity").Bookmark[];
        courses: import("../courses/entities/course.entity").Course[];
        enrollments: import("../enrollments/entities/enrollment.entity").Enrollment[];
        quizResults: import("../quizzes/entities/user-quiz-result.entity").UserQuizResult[];
        achievements: import("../achievements/entities/user-achievement.entity").UserAchievement[];
        activities: import("../analytics/entities/user-activity.entity").UserActivity[];
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
