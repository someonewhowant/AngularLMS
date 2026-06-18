import { PrismaService } from '../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
export declare class EnrollmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    enroll(userId: number, data: CreateEnrollmentDto): Promise<{
        course: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            isPublished: boolean;
            teacherId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        courseId: number;
    }>;
    findAllByUser(userId: number): import(".prisma/client").Prisma.PrismaPromise<({
        course: {
            teacher: {
                id: number;
                email: string;
                role: string;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            isPublished: boolean;
            teacherId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        courseId: number;
    })[]>;
    unenroll(userId: number, courseId: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        courseId: number;
    }>;
}
