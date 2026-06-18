import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CoursesController {
    private readonly coursesService;
    constructor(coursesService: CoursesService);
    create(req: any, createCourseDto: CreateCourseDto): Promise<import("./entities/course.entity").Course>;
    findAll(): Promise<import("./entities/course.entity").Course[]>;
    findOne(id: number): Promise<import("./entities/course.entity").Course>;
    update(req: any, id: number, updateCourseDto: UpdateCourseDto): Promise<import("./entities/course.entity").Course>;
    remove(req: any, id: number): Promise<import("./entities/course.entity").Course>;
}
