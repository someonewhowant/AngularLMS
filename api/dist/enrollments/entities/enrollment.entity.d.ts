import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';
export declare class Enrollment {
    id: number;
    user: User;
    userId: number;
    course: Course;
    courseId: number;
    createdAt: Date;
}
