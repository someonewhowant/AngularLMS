import { Post } from '../../posts/entities/post.entity';
import { User } from '../../users/entities/user.entity';
export declare class Comment {
    id: number;
    content: string;
    post: Post;
    postId: number;
    author: User;
    authorId: number;
    createdAt: Date;
    updatedAt: Date;
}
