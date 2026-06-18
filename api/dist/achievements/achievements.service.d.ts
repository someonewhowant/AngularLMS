import { PrismaService } from '../prisma/prisma.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
export declare class AchievementsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateAchievementDto): Promise<{
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
    grantAchievement(userId: number, criteria: string): Promise<({
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
        achievementId: number;
        awardedAt: Date;
    }) | null>;
    getMyAchievements(userId: number): import(".prisma/client").Prisma.PrismaPromise<({
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
        achievementId: number;
        awardedAt: Date;
    })[]>;
    getLeaderboard(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        email: string;
        role: string;
        points: number;
    }[]>;
}
