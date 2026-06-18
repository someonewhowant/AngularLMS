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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AssignmentsService = class AssignmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(teacherId, userRole, data) {
        const module = await this.prisma.courseModule.findUnique({
            where: { id: data.moduleId },
            include: { course: true }
        });
        if (!module)
            throw new common_1.NotFoundException('Module not found');
        if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only add assignments to your own courses');
        }
        const { dueDate, ...assignmentData } = data;
        return this.prisma.assignment.create({
            data: {
                ...assignmentData,
                dueDate: dueDate ? new Date(dueDate) : null,
            }
        });
    }
    findAllByModule(moduleId) {
        return this.prisma.assignment.findMany({
            where: { moduleId },
        });
    }
    async findOne(id) {
        const assignment = await this.prisma.assignment.findUnique({
            where: { id },
            include: { module: { include: { course: true } } }
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
        const updateData = { ...assignmentData };
        if (dueDate !== undefined) {
            updateData.dueDate = dueDate ? new Date(dueDate) : null;
        }
        return this.prisma.assignment.update({
            where: { id },
            data: updateData,
        });
    }
    async remove(id, teacherId, userRole) {
        const assignment = await this.findOne(id);
        if (assignment.module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only delete assignments from your own courses');
        }
        return this.prisma.assignment.delete({ where: { id } });
    }
};
exports.AssignmentsService = AssignmentsService;
exports.AssignmentsService = AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssignmentsService);
//# sourceMappingURL=assignments.service.js.map