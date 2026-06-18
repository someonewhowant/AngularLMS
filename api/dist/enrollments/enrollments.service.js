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
exports.EnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enrollment_entity_1 = require("./entities/enrollment.entity");
const course_entity_1 = require("../courses/entities/course.entity");
let EnrollmentsService = class EnrollmentsService {
    enrollmentRepository;
    courseRepository;
    constructor(enrollmentRepository, courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
    }
    async enroll(userId, data) {
        const course = await this.courseRepository.findOne({ where: { id: data.courseId } });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        const existing = await this.enrollmentRepository.findOne({
            where: {
                userId,
                courseId: data.courseId,
            }
        });
        if (existing) {
            throw new common_1.ConflictException('You are already enrolled in this course');
        }
        const enrollment = this.enrollmentRepository.create({
            userId,
            courseId: data.courseId
        });
        await this.enrollmentRepository.save(enrollment);
        const saved = await this.enrollmentRepository.findOne({
            where: { id: enrollment.id },
            relations: { course: true }
        });
        if (!saved)
            throw new common_1.NotFoundException('Enrollment not found after creation');
        return saved;
    }
    async findAllByUser(userId) {
        return this.enrollmentRepository.find({
            where: { userId },
            relations: {
                course: {
                    teacher: true
                }
            },
            order: { createdAt: 'DESC' }
        });
    }
    async unenroll(userId, courseId) {
        const enrollment = await this.enrollmentRepository.findOne({
            where: { userId, courseId }
        });
        if (!enrollment) {
            throw new common_1.NotFoundException('Enrollment not found');
        }
        return this.enrollmentRepository.remove(enrollment);
    }
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(enrollment_entity_1.Enrollment)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EnrollmentsService);
//# sourceMappingURL=enrollments.service.js.map