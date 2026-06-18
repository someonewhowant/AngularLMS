import { UserAchievement } from './user-achievement.entity';
export declare class Achievement {
    id: number;
    name: string;
    description: string;
    iconUrl: string;
    criteria: string;
    points: number;
    users: UserAchievement[];
    createdAt: Date;
    updatedAt: Date;
}
