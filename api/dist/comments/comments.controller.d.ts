import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(req: any, createCommentDto: CreateCommentDto): import(".prisma/client").Prisma.Prisma__CommentClient<{
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
    update(req: any, id: number, updateCommentDto: UpdateCommentDto): Promise<{
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
    remove(req: any, id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: number;
        postId: number;
    }>;
}
