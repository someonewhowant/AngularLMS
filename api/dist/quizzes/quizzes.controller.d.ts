import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    create(req: any, createQuizDto: CreateQuizDto): Promise<({
        questions: ({
            options: {
                id: number;
                text: string;
                isCorrect: boolean;
                questionId: number;
            }[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            text: string;
            quizId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        moduleId: number;
    }) | null>;
    findOneForEdit(id: number): Promise<{
        questions: ({
            options: {
                id: number;
                text: string;
                isCorrect: boolean;
            }[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            text: string;
            quizId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        moduleId: number;
    }>;
    getQuizForStudent(id: number): Promise<{
        questions: ({
            options: {
                id: number;
                text: string;
            }[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            text: string;
            quizId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        moduleId: number;
    }>;
    submitQuiz(req: any, id: number, dto: SubmitQuizDto): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        quizId: number;
        score: number;
        total: number;
    }>;
    getMyResults(req: any): Promise<({
        quiz: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            moduleId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        quizId: number;
        score: number;
        total: number;
    })[]>;
}
