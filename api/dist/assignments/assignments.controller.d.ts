import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
export declare class AssignmentsController {
    private readonly assignmentsService;
    constructor(assignmentsService: AssignmentsService);
    create(req: any, createAssignmentDto: CreateAssignmentDto): Promise<{
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
    update(req: any, id: number, updateAssignmentDto: UpdateAssignmentDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        maxScore: number;
        dueDate: Date | null;
        moduleId: number;
    }>;
    remove(req: any, id: number): Promise<{
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
