import { CourseModulesService } from './course-modules.service';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';
export declare class CourseModulesController {
    private readonly courseModulesService;
    constructor(courseModulesService: CourseModulesService);
    create(req: any, createCourseModuleDto: CreateCourseModuleDto): Promise<import("./entities/course-module.entity").CourseModule>;
    findAllByCourse(courseId: number): Promise<import("./entities/course-module.entity").CourseModule[]>;
    findOne(id: number): Promise<import("./entities/course-module.entity").CourseModule>;
    update(req: any, id: number, updateCourseModuleDto: UpdateCourseModuleDto): Promise<import("./entities/course-module.entity").CourseModule>;
    remove(req: any, id: number): Promise<import("./entities/course-module.entity").CourseModule>;
}
