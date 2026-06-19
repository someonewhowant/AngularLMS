import { Repository } from 'typeorm';
import { TrackActivityDto } from './dto/track-activity.dto';
import { AchievementsService } from '../achievements/achievements.service';
import { UserActivity } from './entities/user-activity.entity';
import { User } from '../users/entities/user.entity';
export declare class AnalyticsService {
    private activityRepository;
    private userRepository;
    private achievementsService;
    constructor(activityRepository: Repository<UserActivity>, userRepository: Repository<User>, achievementsService: AchievementsService);
    trackActivity(userId: number, dto: TrackActivityDto): Promise<UserActivity>;
    getDashboard(userId: number): Promise<{
        points: number;
        totalEnrollments: number;
        totalQuizzesTaken: number;
        totalAchievements: number;
        lastLoginAt: Date | undefined;
        recentActivities: UserActivity[];
    }>;
}
