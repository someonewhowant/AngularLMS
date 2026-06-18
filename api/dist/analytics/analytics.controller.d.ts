import { AnalyticsService } from './analytics.service';
import { TrackActivityDto } from './dto/track-activity.dto';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    track(req: any, dto: TrackActivityDto): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        action: string;
        details: string | null;
    }>;
    getDashboard(req: any): Promise<{
        points: number;
        totalEnrollments: number;
        totalQuizzesTaken: number;
        totalAchievements: number;
        lastLoginAt: Date | null | undefined;
        recentActivities: {
            id: number;
            createdAt: Date;
            userId: number;
            action: string;
            details: string | null;
        }[];
    }>;
}
