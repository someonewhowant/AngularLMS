import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
export declare class AchievementsController {
    private readonly achievementsService;
    constructor(achievementsService: AchievementsService);
    create(createAchievementDto: CreateAchievementDto): Promise<{
        id: number;
        points: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        iconUrl: string | null;
        criteria: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        points: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        iconUrl: string | null;
        criteria: string;
    }[]>;
    getMyAchievements(req: any): import(".prisma/client").Prisma.PrismaPromise<({
        achievement: {
            id: number;
            points: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            iconUrl: string | null;
            criteria: string;
        };
    } & {
        id: number;
        userId: number;
        awardedAt: Date;
        achievementId: number;
    })[]>;
    getLeaderboard(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        email: string;
        role: string;
        points: number;
    }[]>;
}
