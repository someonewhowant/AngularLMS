import { Repository } from 'typeorm';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { CourseModule } from '../course-modules/entities/course-module.entity';
export declare class AssignmentsService {
    private assignmentRepository;
    private moduleRepository;
    constructor(assignmentRepository: Repository<Assignment>, moduleRepository: Repository<CourseModule>);
    create(teacherId: number, userRole: string, data: CreateAssignmentDto): Promise<Assignment>;
    findAllByModule(moduleId: number): Promise<Assignment[]>;
    findOne(id: number): Promise<Assignment>;
    update(id: number, teacherId: number, userRole: string, data: UpdateAssignmentDto): Promise<Assignment>;
    remove(id: number, teacherId: number, userRole: string): Promise<Assignment>;
}
