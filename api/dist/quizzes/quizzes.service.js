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
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const achievements_service_1 = require("../achievements/achievements.service");
const quiz_entity_1 = require("./entities/quiz.entity");
const question_entity_1 = require("./entities/question.entity");
const question_option_entity_1 = require("./entities/question-option.entity");
const user_quiz_result_entity_1 = require("./entities/user-quiz-result.entity");
const course_module_entity_1 = require("../course-modules/entities/course-module.entity");
const user_entity_1 = require("../users/entities/user.entity");
const user_activity_entity_1 = require("../analytics/entities/user-activity.entity");
let QuizzesService = class QuizzesService {
    quizRepository;
    userQuizResultRepository;
    moduleRepository;
    achievementsService;
    dataSource;
    constructor(quizRepository, userQuizResultRepository, moduleRepository, achievementsService, dataSource) {
        this.quizRepository = quizRepository;
        this.userQuizResultRepository = userQuizResultRepository;
        this.moduleRepository = moduleRepository;
        this.achievementsService = achievementsService;
        this.dataSource = dataSource;
    }
    async create(teacherId, userRole, data) {
        const module = await this.moduleRepository.findOne({
            where: { id: data.moduleId },
            relations: { course: true }
        });
        if (!module)
            throw new common_1.NotFoundException('Module not found');
        if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only add quizzes to your own courses');
        }
        return this.dataSource.transaction(async (manager) => {
            const quiz = manager.create(quiz_entity_1.Quiz, {
                title: data.title,
                description: data.description,
                moduleId: data.moduleId,
            });
            await manager.save(quiz);
            for (const q of data.questions) {
                const question = manager.create(question_entity_1.Question, {
                    text: q.text,
                    quizId: quiz.id,
                });
                await manager.save(question);
                const options = q.options.map(opt => manager.create(question_option_entity_1.QuestionOption, {
                    text: opt.text,
                    isCorrect: opt.isCorrect,
                    questionId: question.id,
                }));
                await manager.save(options);
            }
            const savedQuiz = await manager.findOne(quiz_entity_1.Quiz, {
                where: { id: quiz.id },
                relations: { questions: { options: true } }
            });
            if (!savedQuiz)
                throw new common_1.NotFoundException('Quiz not found after creation');
            return savedQuiz;
        });
    }
    async findOne(id) {
        const quiz = await this.quizRepository.findOne({
            where: { id },
            relations: {
                questions: {
                    options: true
                }
            }
        });
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        return quiz;
    }
    async getQuizForStudent(id) {
        const quiz = await this.quizRepository.findOne({
            where: { id },
            relations: {
                questions: {
                    options: true
                }
            }
        });
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        return {
            ...quiz,
            questions: quiz.questions.map(q => ({
                ...q,
                options: q.options.map(opt => ({
                    id: opt.id,
                    text: opt.text
                }))
            }))
        };
    }
    async submitQuiz(id, userId, dto) {
        const quiz = await this.quizRepository.findOne({
            where: { id },
            relations: { questions: { options: true } }
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
        const result = await this.dataSource.transaction(async (manager) => {
            const quizResult = manager.create(user_quiz_result_entity_1.UserQuizResult, {
                userId,
                quizId: id,
                score,
                total,
            });
            await manager.save(quizResult);
            if (xpEarned > 0) {
                const user = await manager.findOne(user_entity_1.User, { where: { id: userId } });
                if (user) {
                    user.points += xpEarned;
                    await manager.save(user);
                }
            }
            const activity = manager.create(user_activity_entity_1.UserActivity, {
                userId,
                action: 'SUBMIT_QUIZ',
                details: `Quiz ID: ${id}, Score: ${score}/${total}, XP Earned: ${xpEarned}`,
            });
            await manager.save(activity);
            return quizResult;
        });
        if (score === total && total > 0) {
            await this.achievementsService.grantAchievement(userId, 'PERFECT_QUIZ');
        }
        return result;
    }
    async getMyResults(userId) {
        return this.userQuizResultRepository.find({
            where: { userId },
            relations: { quiz: true },
            order: { createdAt: 'DESC' }
        });
    }
    async importQuiz(teacherId, userRole, dto) {
        const module = await this.moduleRepository.findOne({
            where: { id: dto.moduleId },
            relations: { course: true }
        });
        if (!module)
            throw new common_1.NotFoundException('Module not found');
        if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only add quizzes to your own courses');
        }
        const { content, format, title: titleOverride } = dto;
        if (!content) {
            throw new common_1.NotFoundException('Content is required');
        }
        const parsed = format === 'markdown' ? this.parseMarkdown(content) : this.parseGift(content);
        const title = titleOverride || parsed.title || 'Imported Quiz';
        return this.dataSource.transaction(async (manager) => {
            const quiz = manager.create(quiz_entity_1.Quiz, {
                title,
                description: `Imported from ${format}`,
                moduleId: dto.moduleId,
            });
            await manager.save(quiz);
            for (const q of parsed.questions) {
                const question = manager.create(question_entity_1.Question, {
                    text: q.text,
                    quizId: quiz.id,
                });
                await manager.save(question);
                const options = q.options.map(opt => manager.create(question_option_entity_1.QuestionOption, {
                    text: opt.text,
                    isCorrect: opt.isCorrect,
                    questionId: question.id,
                }));
                await manager.save(options);
            }
            const savedQuiz = await manager.findOne(quiz_entity_1.Quiz, {
                where: { id: quiz.id },
                relations: { questions: { options: true } }
            });
            if (!savedQuiz)
                throw new common_1.NotFoundException('Quiz not found after creation');
            return savedQuiz;
        });
    }
    async importQuestions(teacherId, userRole, quizId, dto) {
        const quiz = await this.quizRepository.findOne({
            where: { id: quizId },
            relations: { module: { course: true } }
        });
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        if (quiz.module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only add questions to quizzes in your own courses');
        }
        const { content, format } = dto;
        if (!content) {
            throw new common_1.NotFoundException('Content is required');
        }
        const parsed = format === 'markdown' ? this.parseMarkdown(content) : this.parseGift(content);
        return this.dataSource.transaction(async (manager) => {
            for (const q of parsed.questions) {
                const question = manager.create(question_entity_1.Question, {
                    text: q.text,
                    quizId: quiz.id,
                });
                await manager.save(question);
                const options = q.options.map(opt => manager.create(question_option_entity_1.QuestionOption, {
                    text: opt.text,
                    isCorrect: opt.isCorrect,
                    questionId: question.id,
                }));
                await manager.save(options);
            }
            const savedQuiz = await manager.findOne(quiz_entity_1.Quiz, {
                where: { id: quiz.id },
                relations: { questions: { options: true } }
            });
            if (!savedQuiz)
                throw new common_1.NotFoundException('Quiz not found');
            return savedQuiz;
        });
    }
    parseMarkdown(content) {
        const lines = content.split('\n');
        let title = undefined;
        const questions = [];
        let currentQuestion = null;
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine)
                continue;
            if (trimmedLine.startsWith('# ')) {
                title = trimmedLine.substring(2).trim();
            }
            else if (trimmedLine.startsWith('## ')) {
                if (currentQuestion) {
                    questions.push(currentQuestion);
                }
                currentQuestion = {
                    text: trimmedLine.substring(3).trim(),
                    options: [],
                };
            }
            else if (trimmedLine.startsWith('- [ ] ') ||
                trimmedLine.startsWith('- [x] ') ||
                trimmedLine.startsWith('- [] ')) {
                if (currentQuestion) {
                    const isCorrect = trimmedLine.startsWith('- [x] ');
                    const bracketIndex = trimmedLine.indexOf(']');
                    const optionText = bracketIndex !== -1 ? trimmedLine.substring(bracketIndex + 1).trim() : trimmedLine.substring(6).trim();
                    currentQuestion.options.push({
                        text: optionText,
                        isCorrect,
                    });
                }
            }
        }
        if (currentQuestion) {
            questions.push(currentQuestion);
        }
        return { title, questions };
    }
    parseGift(content) {
        let title = undefined;
        if (content.includes('::')) {
            const firstColons = content.indexOf('::');
            const secondColons = content.indexOf('::', firstColons + 2);
            if (firstColons !== -1 && secondColons !== -1) {
                title = content.substring(firstColons + 2, secondColons).trim();
            }
        }
        const blocks = content.split(/\n\s*\n/);
        const questions = [];
        for (const block of blocks) {
            const trimmedBlock = block.trim();
            if (!trimmedBlock || trimmedBlock.startsWith('//'))
                continue;
            const openBrace = trimmedBlock.indexOf('{');
            const closeBrace = trimmedBlock.lastIndexOf('}');
            if (openBrace !== -1 && closeBrace !== -1) {
                let header = trimmedBlock.substring(0, openBrace).trim();
                if (header.startsWith('::')) {
                    const secondColons = header.indexOf('::', 2);
                    if (secondColons !== -1) {
                        header = header.substring(secondColons + 2).trim();
                    }
                }
                const optionsPart = trimmedBlock.substring(openBrace + 1, closeBrace).trim();
                const optionsArray = optionsPart.split('\n');
                const options = [];
                for (const opt of optionsArray) {
                    const trimmedOpt = opt.trim();
                    if (!trimmedOpt)
                        continue;
                    let isCorrect = false;
                    let optionText = '';
                    if (trimmedOpt.startsWith('=')) {
                        isCorrect = true;
                        optionText = trimmedOpt.substring(1).trim();
                    }
                    else if (trimmedOpt.startsWith('~')) {
                        isCorrect = false;
                        optionText = trimmedOpt.substring(1).trim();
                    }
                    else {
                        continue;
                    }
                    options.push({ text: optionText, isCorrect });
                }
                if (options.length > 0) {
                    questions.push({
                        text: header,
                        options,
                    });
                }
            }
        }
        return { title, questions };
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_entity_1.Quiz)),
    __param(1, (0, typeorm_1.InjectRepository)(user_quiz_result_entity_1.UserQuizResult)),
    __param(2, (0, typeorm_1.InjectRepository)(course_module_entity_1.CourseModule)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        achievements_service_1.AchievementsService,
        typeorm_2.DataSource])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map