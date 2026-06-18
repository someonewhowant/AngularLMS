import { User } from '../../users/entities/user.entity';
import { CourseModule } from '../../course-modules/entities/course-module.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';
export declare class Course {
    id: number;
    title: string;
    description: string;
    isPublished: boolean;
    teacher: User;
    teacherId: number;
    modules: CourseModule[];
    enrollments: Enrollment[];
    createdAt: Date;
    updatedAt: Date;
}
