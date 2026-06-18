import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    create(req: any, createEnrollmentDto: CreateEnrollmentDto): Promise<import("./entities/enrollment.entity").Enrollment>;
    findAll(req: any): Promise<import("./entities/enrollment.entity").Enrollment[]>;
    remove(req: any, courseId: number): Promise<import("./entities/enrollment.entity").Enrollment>;
}
