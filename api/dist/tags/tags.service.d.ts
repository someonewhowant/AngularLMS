import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
export declare class TagsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateTagDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        name: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
    }>;
    update(id: number, data: UpdateTagDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
    }>;
}
