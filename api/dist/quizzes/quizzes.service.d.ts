import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { AchievementsService } from '../achievements/achievements.service';
export declare class QuizzesService {
    private prisma;
    private achievementsService;
    constructor(prisma: PrismaService, achievementsService: AchievementsService);
    create(teacherId: number, userRole: string, data: CreateQuizDto): Promise<({
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
    findOne(id: number): Promise<{
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
    submitQuiz(id: number, userId: number, dto: SubmitQuizDto): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        quizId: number;
        score: number;
        total: number;
    }>;
    getMyResults(userId: number): Promise<({
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
