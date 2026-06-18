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
exports.CourseModulesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CourseModulesService = class CourseModulesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(teacherId, userRole, data) {
        const course = await this.prisma.course.findUnique({ where: { id: data.courseId } });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        if (course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only add modules to your own courses');
        }
        return this.prisma.courseModule.create({
            data,
            include: { assignments: true }
        });
    }
    findAllByCourse(courseId) {
        return this.prisma.courseModule.findMany({
            where: { courseId },
            orderBy: { order: 'asc' },
            include: { assignments: true }
        });
    }
    async findOne(id) {
        const module = await this.prisma.courseModule.findUnique({
            where: { id },
            include: { assignments: true, course: true }
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
        return this.prisma.courseModule.update({
            where: { id },
            data,
            include: { assignments: true }
        });
    }
    async remove(id, teacherId, userRole) {
        const module = await this.findOne(id);
        if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only delete modules from your own courses');
        }
        return this.prisma.courseModule.delete({ where: { id } });
    }
};
exports.CourseModulesService = CourseModulesService;
exports.CourseModulesService = CourseModulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CourseModulesService);
//# sourceMappingURL=course-modules.service.js.map