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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const achievements_service_1 = require("../achievements/achievements.service");
let AnalyticsService = class AnalyticsService {
    prisma;
    achievementsService;
    constructor(prisma, achievementsService) {
        this.prisma = prisma;
        this.achievementsService = achievementsService;
    }
    async trackActivity(userId, dto) {
        return this.prisma.userActivity.create({
            data: {
                userId,
                action: dto.action,
                details: dto.details,
            }
        });
    }
    async getDashboard(userId) {
        await this.achievementsService.grantAchievement(userId, 'FIRST_STEPS');
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                _count: {
                    select: {
                        enrollments: true,
                        quizResults: true,
                        achievements: true,
                    }
                }
            }
        });
        const recentActivities = await this.prisma.userActivity.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 5
        });
        return {
            points: user?.points || 0,
            totalEnrollments: user?._count.enrollments || 0,
            totalQuizzesTaken: user?._count.quizResults || 0,
            totalAchievements: user?._count.achievements || 0,
            lastLoginAt: user?.lastLoginAt,
            recentActivities
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        achievements_service_1.AchievementsService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map