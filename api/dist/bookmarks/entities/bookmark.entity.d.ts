import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';
export declare class Bookmark {
    id: number;
    user: User;
    userId: number;
    post: Post;
    postId: number;
    createdAt: Date;
}
