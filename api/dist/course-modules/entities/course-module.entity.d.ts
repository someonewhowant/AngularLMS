import { Course } from '../../courses/entities/course.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';
import { Quiz } from '../../quizzes/entities/quiz.entity';
export declare class CourseModule {
    id: number;
    title: string;
    content: string;
    order: number;
    course: Course;
    courseId: number;
    assignments: Assignment[];
    quizzes: Quiz[];
    createdAt: Date;
    updatedAt: Date;
}
