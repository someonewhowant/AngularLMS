import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
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
    getUserProfile(userId: number): Promise<{
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
