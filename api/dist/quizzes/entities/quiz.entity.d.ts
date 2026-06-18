import { CourseModule } from '../../course-modules/entities/course-module.entity';
import { Question } from './question.entity';
import { UserQuizResult } from './user-quiz-result.entity';
export declare class Quiz {
    id: number;
    title: string;
    description: string;
    module: CourseModule;
    moduleId: number;
    questions: Question[];
    results: UserQuizResult[];
    createdAt: Date;
    updatedAt: Date;
}
