import { AnalyticsService } from './analytics.service';
import { TrackActivityDto } from './dto/track-activity.dto';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    track(req: any, dto: TrackActivityDto): Promise<import("./entities/user-activity.entity").UserActivity>;
    getDashboard(req: any): Promise<{
        points: number;
        totalEnrollments: number;
        totalQuizzesTaken: number;
        totalAchievements: number;
        lastLoginAt: Date | undefined;
        recentActivities: import("./entities/user-activity.entity").UserActivity[];
    }>;
}
