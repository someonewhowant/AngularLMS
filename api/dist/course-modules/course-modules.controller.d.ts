import { CourseModulesService } from './course-modules.service';
export declare class CourseModulesController {
    private readonly courseModulesService;
    constructor(courseModulesService: CourseModulesService);
    create(req: any, body: any, file?: Express.Multer.File): Promise<import("./entities/course-module.entity").CourseModule>;
    findAllByCourse(courseId: number): Promise<import("./entities/course-module.entity").CourseModule[]>;
    findOne(id: number): Promise<import("./entities/course-module.entity").CourseModule>;
    update(req: any, id: number, body: any, file?: Express.Multer.File): Promise<import("./entities/course-module.entity").CourseModule>;
    remove(req: any, id: number): Promise<import("./entities/course-module.entity").CourseModule>;
}
