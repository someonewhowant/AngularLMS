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
exports.AchievementsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const achievement_entity_1 = require("./entities/achievement.entity");
const user_achievement_entity_1 = require("./entities/user-achievement.entity");
const user_entity_1 = require("../users/entities/user.entity");
let AchievementsService = class AchievementsService {
    achievementRepository;
    userAchievementRepository;
    dataSource;
    constructor(achievementRepository, userAchievementRepository, dataSource) {
        this.achievementRepository = achievementRepository;
        this.userAchievementRepository = userAchievementRepository;
        this.dataSource = dataSource;
    }
    async grantAchievement(userId, achievementName) {
        const achievement = await this.achievementRepository.findOne({
            where: { name: achievementName }
        });
        if (!achievement)
            return null;
        const alreadyAwarded = await this.userAchievementRepository.findOne({
            where: {
                userId,
                achievementId: achievement.id
            }
        });
        if (alreadyAwarded)
            return null;
        return this.dataSource.transaction(async (manager) => {
            const awarded = manager.create(user_achievement_entity_1.UserAchievement, {
                userId,
                achievementId: achievement.id,
            });
            await manager.save(awarded);
            const user = await manager.findOne(user_entity_1.User, { where: { id: userId } });
            if (user) {
                user.points += achievement.points;
                await manager.save(user);
            }
            return manager.findOne(user_achievement_entity_1.UserAchievement, {
                where: { id: awarded.id },
                relations: { achievement: true }
            });
        });
    }
    async getMyAchievements(userId) {
        return this.userAchievementRepository.find({
            where: { userId },
            relations: { achievement: true },
            order: { awardedAt: 'DESC' }
        });
    }
    async create(data) {
        const achievement = this.achievementRepository.create(data);
        return this.achievementRepository.save(achievement);
    }
    async findAll() {
        return this.achievementRepository.find();
    }
    async getLeaderboard() {
        return this.dataSource.getRepository(user_entity_1.User).find({
            order: { points: 'DESC' },
            take: 10,
            select: { id: true, email: true, points: true }
        });
    }
};
exports.AchievementsService = AchievementsService;
exports.AchievementsService = AchievementsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(achievement_entity_1.Achievement)),
    __param(1, (0, typeorm_1.InjectRepository)(user_achievement_entity_1.UserAchievement)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], AchievementsService);
//# sourceMappingURL=achievements.service.js.map