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
exports.Quiz = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const course_module_entity_1 = require("../../course-modules/entities/course-module.entity");
const question_entity_1 = require("./question.entity");
const user_quiz_result_entity_1 = require("./user-quiz-result.entity");
let Quiz = class Quiz {
    id;
    title;
    description;
    module;
    moduleId;
    questions;
    results;
    createdAt;
    updatedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, module: { required: true, type: () => require("../../course-modules/entities/course-module.entity").CourseModule }, moduleId: { required: true, type: () => Number }, questions: { required: true, type: () => [require("./question.entity").Question] }, results: { required: true, type: () => [require("./user-quiz-result.entity").UserQuizResult] }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date } };
    }
};
exports.Quiz = Quiz;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Quiz.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Quiz.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Quiz.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => course_module_entity_1.CourseModule, module => module.quizzes, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'moduleId' }),
    __metadata("design:type", course_module_entity_1.CourseModule)
], Quiz.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Quiz.prototype, "moduleId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_entity_1.Question, question => question.quiz),
    __metadata("design:type", Array)
], Quiz.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_quiz_result_entity_1.UserQuizResult, result => result.quiz),
    __metadata("design:type", Array)
], Quiz.prototype, "results", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Quiz.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Quiz.prototype, "updatedAt", void 0);
exports.Quiz = Quiz = __decorate([
    (0, typeorm_1.Entity)('quizzes')
], Quiz);
//# sourceMappingURL=quiz.entity.js.map