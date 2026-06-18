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
exports.AchievementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AchievementsService = class AchievementsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const existing = await this.prisma.achievement.findUnique({ where: { name: data.name } });
        if (existing)
            throw new common_1.ConflictException('Achievement with this name already exists');
        return this.prisma.achievement.create({ data });
    }
    findAll() {
        return this.prisma.achievement.findMany();
    }
    async grantAchievement(userId, criteria) {
        const achievement = await this.prisma.achievement.findFirst({ where: { criteria } });
        if (!achievement)
            return null;
        const alreadyAwarded = await this.prisma.userAchievement.findUnique({
            where: {
                userId_achievementId: {
                    userId,
                    achievementId: achievement.id
                }
            }
        });
        if (alreadyAwarded)
            return null;
        return this.prisma.$transaction(async (tx) => {
            const awarded = await tx.userAchievement.create({
                data: {
                    userId,
                    achievementId: achievement.id,
                },
                include: { achievement: true }
            });
            await tx.user.update({
                where: { id: userId },
                data: { points: { increment: achievement.points } }
            });
            return awarded;
        });
    }
    getMyAchievements(userId) {
        return this.prisma.userAchievement.findMany({
            where: { userId },
            include: { achievement: true },
            orderBy: { awardedAt: 'desc' }
        });
    }
    getLeaderboard() {
        return this.prisma.user.findMany({
            where: { points: { gt: 0 } },
            select: { id: true, email: true, points: true, role: true },
            orderBy: { points: 'desc' },
            take: 10
        });
    }
};
exports.AchievementsService = AchievementsService;
exports.AchievementsService = AchievementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AchievementsService);
//# sourceMappingURL=achievements.service.js.map