import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    create(req: any, createEnrollmentDto: CreateEnrollmentDto): Promise<{
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
    findAll(req: any): import(".prisma/client").Prisma.PrismaPromise<({
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
    remove(req: any, courseId: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        courseId: number;
    }>;
}
