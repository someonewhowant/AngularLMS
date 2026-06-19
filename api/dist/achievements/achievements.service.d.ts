import { Repository, DataSource } from 'typeorm';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { Achievement } from './entities/achievement.entity';
import { UserAchievement } from './entities/user-achievement.entity';
import { User } from '../users/entities/user.entity';
export declare class AchievementsService {
    private achievementRepository;
    private userAchievementRepository;
    private dataSource;
    constructor(achievementRepository: Repository<Achievement>, userAchievementRepository: Repository<UserAchievement>, dataSource: DataSource);
    grantAchievement(userId: number, achievementName: string): Promise<UserAchievement | null>;
    getMyAchievements(userId: number): Promise<UserAchievement[]>;
    create(data: CreateAchievementDto): Promise<Achievement>;
    findAll(): Promise<Achievement[]>;
    getLeaderboard(): Promise<User[]>;
}
