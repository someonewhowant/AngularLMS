import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';
export declare class CourseModulesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(teacherId: number, userRole: string, data: CreateCourseModuleDto): Promise<{
        assignments: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            maxScore: number;
            dueDate: Date | null;
            moduleId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string | null;
        order: number;
        courseId: number;
    }>;
    findAllByCourse(courseId: number): import(".prisma/client").Prisma.PrismaPromise<({
        assignments: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            maxScore: number;
            dueDate: Date | null;
            moduleId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string | null;
        order: number;
        courseId: number;
    })[]>;
    findOne(id: number): Promise<{
        course: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            isPublished: boolean;
            teacherId: number;
        };
        assignments: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            maxScore: number;
            dueDate: Date | null;
            moduleId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string | null;
        order: number;
        courseId: number;
    }>;
    update(id: number, teacherId: number, userRole: string, data: UpdateCourseModuleDto): Promise<{
        assignments: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            maxScore: number;
            dueDate: Date | null;
            moduleId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string | null;
        order: number;
        courseId: number;
    }>;
    remove(id: number, teacherId: number, userRole: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string | null;
        order: number;
        courseId: number;
    }>;
}
