"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModulesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_module_entity_1 = require("./entities/course-module.entity");
const course_entity_1 = require("../courses/entities/course.entity");
let CourseModulesService = class CourseModulesService {
    moduleRepository;
    courseRepository;
    constructor(moduleRepository, courseRepository) {
        this.moduleRepository = moduleRepository;
        this.courseRepository = courseRepository;
    }
    async create(teacherId, userRole, data) {
        const course = await this.courseRepository.findOne({ where: { id: data.courseId } });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        if (course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only add modules to your own courses');
        }
        const module = this.moduleRepository.create(data);
        await this.moduleRepository.save(module);
        const saved = await this.moduleRepository.findOne({
            where: { id: module.id },
            relations: { assignments: true },
        });
        if (!saved)
            throw new common_1.NotFoundException('Module not found after creation');
        return saved;
    }
    async findAllByCourse(courseId) {
        return this.moduleRepository.find({
            where: { courseId },
            order: { order: 'ASC' },
            relations: { assignments: true }
        });
    }
    async findOne(id) {
        const module = await this.moduleRepository.findOne({
            where: { id },
            relations: { assignments: true, course: true }
        });
        if (!module)
            throw new common_1.NotFoundException('Module not found');
        return module;
    }
    async update(id, teacherId, userRole, data) {
        const module = await this.findOne(id);
        if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only update modules in your own courses');
        }
        Object.assign(module, data);
        await this.moduleRepository.save(module);
        const updated = await this.moduleRepository.findOne({
            where: { id },
            relations: { assignments: true }
        });
        if (!updated)
            throw new common_1.NotFoundException('Module not found after update');
        return updated;
    }
    async remove(id, teacherId, userRole) {
        const module = await this.findOne(id);
        if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only delete modules from your own courses');
        }
        return this.moduleRepository.remove(module);
    }
};
exports.CourseModulesService = CourseModulesService;
exports.CourseModulesService = CourseModulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_module_entity_1.CourseModule)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CourseModulesService);
//# sourceMappingURL=course-modules.service.js.map