import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
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
    getUserProfile(userId: number): Promise<{
        id: number;
        email: string;
        role: string;
        points: number;
        lastLoginAt: Date;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
