import { Post } from '../../posts/entities/post.entity';
export declare class Category {
    id: number;
    name: string;
    description: string;
    posts: Post[];
    createdAt: Date;
    updatedAt: Date;
}
