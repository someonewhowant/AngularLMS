import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
export declare class AssignmentsController {
    private readonly assignmentsService;
    constructor(assignmentsService: AssignmentsService);
    create(req: any, createAssignmentDto: CreateAssignmentDto): Promise<import("./entities/assignment.entity").Assignment>;
    findAllByModule(moduleId: number): Promise<import("./entities/assignment.entity").Assignment[]>;
    findOne(id: number): Promise<import("./entities/assignment.entity").Assignment>;
    update(req: any, id: number, updateAssignmentDto: UpdateAssignmentDto): Promise<import("./entities/assignment.entity").Assignment>;
    remove(req: any, id: number): Promise<import("./entities/assignment.entity").Assignment>;
}
