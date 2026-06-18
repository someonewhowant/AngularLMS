import { User } from '../../users/entities/user.entity';
import { Achievement } from './achievement.entity';
export declare class UserAchievement {
    id: number;
    user: User;
    userId: number;
    achievement: Achievement;
    achievementId: number;
    awardedAt: Date;
}
