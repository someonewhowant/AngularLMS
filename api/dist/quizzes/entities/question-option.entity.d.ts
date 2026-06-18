import { Question } from './question.entity';
export declare class QuestionOption {
    id: number;
    text: string;
    isCorrect: boolean;
    question: Question;
    questionId: number;
}
