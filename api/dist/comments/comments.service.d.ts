import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(authorId: number, data: CreateCommentDto): import(".prisma/client").Prisma.Prisma__CommentClient<{
        author: {
            id: number;
            email: string;
            role: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: number;
        postId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAllByPost(postId: number): import(".prisma/client").Prisma.PrismaPromise<({
        author: {
            id: number;
            email: string;
            role: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: number;
        postId: number;
    })[]>;
    update(id: number, authorId: number, data: UpdateCommentDto): Promise<{
        author: {
            id: number;
            email: string;
            role: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: number;
        postId: number;
    }>;
    remove(id: number, authorId: number, userRole: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: number;
        postId: number;
    }>;
}
