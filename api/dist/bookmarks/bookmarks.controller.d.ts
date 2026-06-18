import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
export declare class BookmarksController {
    private readonly bookmarksService;
    constructor(bookmarksService: BookmarksService);
    create(req: any, createBookmarkDto: CreateBookmarkDto): Promise<{
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
    findAll(req: any): import(".prisma/client").Prisma.PrismaPromise<({
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
    remove(req: any, postId: number): Promise<{
        id: number;
        createdAt: Date;
        postId: number;
        userId: number;
    }>;
}
