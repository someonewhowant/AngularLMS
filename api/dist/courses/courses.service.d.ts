import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesService {
    private courseRepository;
    constructor(courseRepository: Repository<Course>);
    create(teacherId: number, data: CreateCourseDto): Promise<Course>;
    findAll(): Promise<Course[]>;
    findOne(id: number): Promise<Course>;
    update(id: number, teacherId: number, userRole: string, data: UpdateCourseDto): Promise<Course>;
    remove(id: number, teacherId: number, userRole: string): Promise<Course>;
}
