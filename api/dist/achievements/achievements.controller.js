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
exports.AchievementsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const achievements_service_1 = require("./achievements.service");
const create_achievement_dto_1 = require("./dto/create-achievement.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
let AchievementsController = class AchievementsController {
    achievementsService;
    constructor(achievementsService) {
        this.achievementsService = achievementsService;
    }
    create(createAchievementDto) {
        return this.achievementsService.create(createAchievementDto);
    }
    findAll() {
        return this.achievementsService.findAll();
    }
    getMyAchievements(req) {
        return this.achievementsService.getMyAchievements(req.user.id);
    }
    getLeaderboard() {
        return this.achievementsService.getLeaderboard();
    }
};
exports.AchievementsController = AchievementsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new achievement (Admin only)' }),
    openapi.ApiResponse({ status: 201, type: require("./entities/achievement.entity").Achievement }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_achievement_dto_1.CreateAchievementDto]),
    __metadata("design:returntype", void 0)
], AchievementsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all available achievements' }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/achievement.entity").Achievement] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AchievementsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get my unlocked achievements' }),
    openapi.ApiResponse({ status: 200, type: [require("./entities/user-achievement.entity").UserAchievement] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AchievementsController.prototype, "getMyAchievements", null);
__decorate([
    (0, common_1.Get)('leaderboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Top 10 users by XP' }),
    openapi.ApiResponse({ status: 200, type: [require("../users/entities/user.entity").User] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AchievementsController.prototype, "getLeaderboard", null);
exports.AchievementsController = AchievementsController = __decorate([
    (0, swagger_1.ApiTags)('achievements'),
    (0, common_1.Controller)('achievements'),
    __metadata("design:paramtypes", [achievements_service_1.AchievementsService])
], AchievementsController);
//# sourceMappingURL=achievements.controller.js.map