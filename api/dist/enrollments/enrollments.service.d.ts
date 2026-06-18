import { Repository } from 'typeorm';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { Enrollment } from './entities/enrollment.entity';
import { Course } from '../courses/entities/course.entity';
export declare class EnrollmentsService {
    private enrollmentRepository;
    private courseRepository;
    constructor(enrollmentRepository: Repository<Enrollment>, courseRepository: Repository<Course>);
    enroll(userId: number, data: CreateEnrollmentDto): Promise<Enrollment>;
    findAllByUser(userId: number): Promise<Enrollment[]>;
    unenroll(userId: number, courseId: number): Promise<Enrollment>;
}
