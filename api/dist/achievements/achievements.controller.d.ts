import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
export declare class AchievementsController {
    private readonly achievementsService;
    constructor(achievementsService: AchievementsService);
    create(createAchievementDto: CreateAchievementDto): Promise<import("./entities/achievement.entity").Achievement>;
    findAll(): Promise<import("./entities/achievement.entity").Achievement[]>;
    getMyAchievements(req: any): Promise<import("./entities/user-achievement.entity").UserAchievement[]>;
    getLeaderboard(): Promise<import("../users/entities/user.entity").User[]>;
}
