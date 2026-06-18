import { Quiz } from './quiz.entity';
import { QuestionOption } from './question-option.entity';
export declare class Question {
    id: number;
    text: string;
    quiz: Quiz;
    quizId: number;
    options: QuestionOption[];
    createdAt: Date;
    updatedAt: Date;
}
