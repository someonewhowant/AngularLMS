import { Repository } from 'typeorm';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';
import { CourseModule } from './entities/course-module.entity';
import { Course } from '../courses/entities/course.entity';
export declare class CourseModulesService {
    private moduleRepository;
    private courseRepository;
    constructor(moduleRepository: Repository<CourseModule>, courseRepository: Repository<Course>);
    create(teacherId: number, userRole: string, data: CreateCourseModuleDto): Promise<CourseModule>;
    findAllByCourse(courseId: number): Promise<CourseModule[]>;
    findOne(id: number): Promise<CourseModule>;
    update(id: number, teacherId: number, userRole: string, data: UpdateCourseModuleDto): Promise<CourseModule>;
    remove(id: number, teacherId: number, userRole: string): Promise<CourseModule>;
}
