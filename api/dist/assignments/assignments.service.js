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
exports.AssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const assignment_entity_1 = require("./entities/assignment.entity");
const course_module_entity_1 = require("../course-modules/entities/course-module.entity");
let AssignmentsService = class AssignmentsService {
    assignmentRepository;
    moduleRepository;
    constructor(assignmentRepository, moduleRepository) {
        this.assignmentRepository = assignmentRepository;
        this.moduleRepository = moduleRepository;
    }
    async create(teacherId, userRole, data) {
        const module = await this.moduleRepository.findOne({
            where: { id: data.moduleId },
            relations: { course: true }
        });
        if (!module)
            throw new common_1.NotFoundException('Module not found');
        if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only add assignments to your own courses');
        }
        const { dueDate, ...assignmentData } = data;
        const assignment = this.assignmentRepository.create({
            ...assignmentData,
            dueDate: dueDate ? new Date(dueDate) : null,
            moduleId: module.id
        });
        return this.assignmentRepository.save(assignment);
    }
    async findAllByModule(moduleId) {
        return this.assignmentRepository.find({
            where: { moduleId },
        });
    }
    async findOne(id) {
        const assignment = await this.assignmentRepository.findOne({
            where: { id },
            relations: { module: { course: true } }
        });
        if (!assignment)
            throw new common_1.NotFoundException('Assignment not found');
        return assignment;
    }
    async update(id, teacherId, userRole, data) {
        const assignment = await this.findOne(id);
        if (assignment.module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only update assignments in your own courses');
        }
        const { dueDate, ...assignmentData } = data;
        Object.assign(assignment, assignmentData);
        if (dueDate !== undefined) {
            assignment.dueDate = dueDate ? new Date(dueDate) : null;
        }
        return this.assignmentRepository.save(assignment);
    }
    async remove(id, teacherId, userRole) {
        const assignment = await this.findOne(id);
        if (assignment.module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only delete assignments from your own courses');
        }
        return this.assignmentRepository.remove(assignment);
    }
};
exports.AssignmentsService = AssignmentsService;
exports.AssignmentsService = AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assignment_entity_1.Assignment)),
    __param(1, (0, typeorm_1.InjectRepository)(course_module_entity_1.CourseModule)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AssignmentsService);
//# sourceMappingURL=assignments.service.js.map