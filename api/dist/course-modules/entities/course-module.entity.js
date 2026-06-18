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
exports.CourseModule = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const course_entity_1 = require("../../courses/entities/course.entity");
const assignment_entity_1 = require("../../assignments/entities/assignment.entity");
const quiz_entity_1 = require("../../quizzes/entities/quiz.entity");
let CourseModule = class CourseModule {
    id;
    title;
    content;
    order;
    course;
    courseId;
    assignments;
    quizzes;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, title: { required: true, type: () => String }, content: { required: true, type: () => String }, order: { required: true, type: () => Number }, course: { required: true, type: () => require("../../courses/entities/course.entity").Course }, courseId: { required: true, type: () => Number }, assignments: { required: true, type: () => [require("../../assignments/entities/assignment.entity").Assignment] }, quizzes: { required: true, type: () => [require("../../quizzes/entities/quiz.entity").Quiz] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.CourseModule = CourseModule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CourseModule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CourseModule.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CourseModule.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CourseModule.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_entity_1.Course, course => course.modules, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'courseId' }),
    __metadata("design:type", course_entity_1.Course)
], CourseModule.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CourseModule.prototype, "courseId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => assignment_entity_1.Assignment, assignment => assignment.module),
    __metadata("design:type", Array)
], CourseModule.prototype, "assignments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_entity_1.Quiz, quiz => quiz.module),
    __metadata("design:type", Array)
], CourseModule.prototype, "quizzes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CourseModule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CourseModule.prototype, "updatedAt", void 0);
exports.CourseModule = CourseModule = __decorate([
    (0, typeorm_1.Entity)('course_modules')
], CourseModule);
//# sourceMappingURL=course-module.entity.js.map