import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
export declare class BookmarksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, data: CreateBookmarkDto): Promise<{
        post: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            content: string;
            published: boolean;
            authorId: number;
            categoryId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        postId: number;
        userId: number;
    }>;
    findAllByUser(userId: number): import(".prisma/client").Prisma.PrismaPromise<({
        post: {
            category: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
            };
            tags: {
                id: number;
                createdAt: Date;
                name: string;
            }[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            content: string;
            published: boolean;
            authorId: number;
            categoryId: number;
        };
    } & {
        id: number;
        createdAt: Date;
        postId: number;
        userId: number;
    })[]>;
    remove(userId: number, postId: number): Promise<{
        id: number;
        createdAt: Date;
        postId: number;
        userId: number;
    }>;
}
