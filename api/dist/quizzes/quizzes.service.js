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
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const achievements_service_1 = require("../achievements/achievements.service");
let QuizzesService = class QuizzesService {
    prisma;
    achievementsService;
    constructor(prisma, achievementsService) {
        this.prisma = prisma;
        this.achievementsService = achievementsService;
    }
    async create(teacherId, userRole, data) {
        const module = await this.prisma.courseModule.findUnique({
            where: { id: data.moduleId },
            include: { course: true }
        });
        if (!module)
            throw new common_1.NotFoundException('Module not found');
        if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only add quizzes to your own courses');
        }
        return this.prisma.$transaction(async (tx) => {
            const quiz = await tx.quiz.create({
                data: {
                    title: data.title,
                    description: data.description,
                    moduleId: data.moduleId,
                }
            });
            for (const question of data.questions) {
                await tx.question.create({
                    data: {
                        text: question.text,
                        quizId: quiz.id,
                        options: {
                            create: question.options.map(opt => ({
                                text: opt.text,
                                isCorrect: opt.isCorrect,
                            }))
                        }
                    }
                });
            }
            return tx.quiz.findUnique({
                where: { id: quiz.id },
                include: { questions: { include: { options: true } } }
            });
        });
    }
    async findOne(id) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
            include: {
                questions: {
                    include: {
                        options: { select: { id: true, text: true, isCorrect: true } }
                    }
                }
            }
        });
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        return quiz;
    }
    async getQuizForStudent(id) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
            include: {
                questions: {
                    include: {
                        options: { select: { id: true, text: true } }
                    }
                }
            }
        });
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        return quiz;
    }
    async submitQuiz(id, userId, dto) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
            include: { questions: { include: { options: true } } }
        });
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        let score = 0;
        const total = quiz.questions.length;
        for (const question of quiz.questions) {
            const selectedOptionId = dto.answers[question.id];
            if (selectedOptionId) {
                const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
                if (selectedOption && selectedOption.isCorrect) {
                    score++;
                }
            }
        }
        const xpEarned = score * 10;
        const result = await this.prisma.$transaction(async (tx) => {
            const quizResult = await tx.userQuizResult.create({
                data: {
                    userId,
                    quizId: id,
                    score,
                    total,
                }
            });
            if (xpEarned > 0) {
                await tx.user.update({
                    where: { id: userId },
                    data: { points: { increment: xpEarned } }
                });
            }
            await tx.userActivity.create({
                data: {
                    userId,
                    action: 'SUBMIT_QUIZ',
                    details: `Quiz ID: ${id}, Score: ${score}/${total}, XP Earned: ${xpEarned}`,
                }
            });
            return quizResult;
        });
        if (score === total && total > 0) {
            await this.achievementsService.grantAchievement(userId, 'PERFECT_QUIZ');
        }
        return result;
    }
    async getMyResults(userId) {
        return this.prisma.userQuizResult.findMany({
            where: { userId },
            include: { quiz: true },
            orderBy: { createdAt: 'desc' }
        });
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        achievements_service_1.AchievementsService])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map