import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Bookmark } from '../../bookmarks/entities/bookmark.entity';
import { Course } from '../../courses/entities/course.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
import { UserQuizResult } from '../../quizzes/entities/user-quiz-result.entity';
import { UserAchievement } from '../../achievements/entities/user-achievement.entity';
import { UserActivity } from '../../analytics/entities/user-activity.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    role: string;
    points: number;
    lastLoginAt: Date;
    posts: Post[];
    comments: Comment[];
    bookmarks: Bookmark[];
    courses: Course[];
    enrollments: Enrollment[];
    quizResults: UserQuizResult[];
    achievements: UserAchievement[];
    activities: UserActivity[];
    createdAt: Date;
    updatedAt: Date;
}
