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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const achievements_service_1 = require("../achievements/achievements.service");
const user_activity_entity_1 = require("./entities/user-activity.entity");
const user_entity_1 = require("../users/entities/user.entity");
let AnalyticsService = class AnalyticsService {
    activityRepository;
    userRepository;
    achievementsService;
    constructor(activityRepository, userRepository, achievementsService) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
        this.achievementsService = achievementsService;
    }
    async trackActivity(userId, dto) {
        const activity = this.activityRepository.create({
            userId,
            action: dto.action,
            details: dto.details,
        });
        return this.activityRepository.save(activity);
    }
    async getDashboard(userId) {
        await this.achievementsService.grantAchievement(userId, 'FIRST_STEPS');
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const enrollmentCount = await this.userRepository.manager.getRepository('Enrollment').count({ where: { studentId: userId } });
        const quizResultCount = await this.userRepository.manager.getRepository('UserQuizResult').count({ where: { userId } });
        const achievementCount = await this.userRepository.manager.getRepository('UserAchievement').count({ where: { userId } });
        const recentActivities = await this.activityRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
            take: 5
        });
        return {
            points: user?.points || 0,
            totalEnrollments: enrollmentCount || 0,
            totalQuizzesTaken: quizResultCount || 0,
            totalAchievements: achievementCount || 0,
            lastLoginAt: user?.lastLoginAt,
            recentActivities
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_activity_entity_1.UserActivity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        achievements_service_1.AchievementsService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map