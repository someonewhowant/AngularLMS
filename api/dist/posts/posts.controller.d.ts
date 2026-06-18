import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(req: any, createPostDto: CreatePostDto): Promise<{
        category: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        };
        author: {
            id: number;
            email: string;
            role: string;
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
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        category: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        };
        author: {
            id: number;
            email: string;
            role: string;
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
    })[]>;
    findOne(id: number): Promise<{
        category: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        };
        author: {
            id: number;
            email: string;
            role: string;
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
    }>;
    update(id: number, updatePostDto: UpdatePostDto): Promise<{
        category: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        };
        author: {
            id: number;
            email: string;
            role: string;
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
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        published: boolean;
        authorId: number;
        categoryId: number;
    }>;
}
