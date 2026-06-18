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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesService = class CoursesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(teacherId, data) {
        return this.prisma.course.create({
            data: { ...data, teacherId },
            include: { teacher: { select: { id: true, email: true, role: true } } }
        });
    }
    findAll() {
        return this.prisma.course.findMany({
            include: { teacher: { select: { id: true, email: true, role: true } } }
        });
    }
    async findOne(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: {
                teacher: { select: { id: true, email: true, role: true } },
                modules: {
                    include: { assignments: true, quizzes: true },
                    orderBy: { order: 'asc' }
                }
            }
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return course;
    }
    async update(id, teacherId, userRole, data) {
        const course = await this.findOne(id);
        if (course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only update your own courses');
        }
        return this.prisma.course.update({
            where: { id },
            data,
            include: { teacher: { select: { id: true, email: true, role: true } } }
        });
    }
    async remove(id, teacherId, userRole) {
        const course = await this.findOne(id);
        if (course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only delete your own courses');
        }
        return this.prisma.course.delete({ where: { id } });
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesService);
//# sourceMappingURL=courses.service.js.map