import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
export declare class AssignmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(teacherId: number, userRole: string, data: CreateAssignmentDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        maxScore: number;
        dueDate: Date | null;
        moduleId: number;
    }>;
    findAllByModule(moduleId: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        maxScore: number;
        dueDate: Date | null;
        moduleId: number;
    }[]>;
    findOne(id: number): Promise<{
        module: {
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
            updatedAt: Date;
            title: string;
            content: string | null;
            order: number;
            courseId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        maxScore: number;
        dueDate: Date | null;
        moduleId: number;
    }>;
    update(id: number, teacherId: number, userRole: string, data: UpdateAssignmentDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        maxScore: number;
        dueDate: Date | null;
        moduleId: number;
    }>;
    remove(id: number, teacherId: number, userRole: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        maxScore: number;
        dueDate: Date | null;
        moduleId: number;
    }>;
}
