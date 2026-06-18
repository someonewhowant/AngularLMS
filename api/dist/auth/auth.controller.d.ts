import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        id: number;
        email: string;
        role: string;
        points: number;
        lastLoginAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): Promise<{
        id: number;
        email: string;
        role: string;
        points: number;
        lastLoginAt: Date;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
