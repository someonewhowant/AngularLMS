import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Bookmark } from '../../bookmarks/entities/bookmark.entity';
export declare class Post {
    id: number;
    title: string;
    content: string;
    published: boolean;
    author: User;
    authorId: number;
    category: Category;
    categoryId: number;
    tags: Tag[];
    comments: Comment[];
    bookmarks: Bookmark[];
    createdAt: Date;
    updatedAt: Date;
}
