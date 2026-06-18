import { CourseModule } from '../../course-modules/entities/course-module.entity';
export declare class Assignment {
    id: number;
    title: string;
    description: string;
    maxScore: number;
    dueDate: Date | null;
    module: CourseModule;
    moduleId: number;
    createdAt: Date;
    updatedAt: Date;
}
