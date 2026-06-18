import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(teacherId: number, data: CreateCourseDto): import(".prisma/client").Prisma.Prisma__CourseClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
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
    })[]>;
    findOne(id: number): Promise<{
        teacher: {
            id: number;
            email: string;
            role: string;
        };
        modules: ({
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
            quizzes: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                description: string | null;
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
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        isPublished: boolean;
        teacherId: number;
    }>;
    update(id: number, teacherId: number, userRole: string, data: UpdateCourseDto): Promise<{
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
    }>;
    remove(id: number, teacherId: number, userRole: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        isPublished: boolean;
        teacherId: number;
    }>;
}
