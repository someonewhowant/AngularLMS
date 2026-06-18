import { User } from '../../users/entities/user.entity';
export declare class UserActivity {
    id: number;
    user: User;
    userId: number;
    action: string;
    details: string;
    createdAt: Date;
}
