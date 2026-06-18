import { User } from '../../users/entities/user.entity';
import { Quiz } from './quiz.entity';
export declare class UserQuizResult {
    id: number;
    user: User;
    userId: number;
    quiz: Quiz;
    quizId: number;
    score: number;
    total: number;
    createdAt: Date;
}
