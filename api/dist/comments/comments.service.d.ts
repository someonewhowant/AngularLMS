import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
export declare class CommentsService {
    private commentRepository;
    constructor(commentRepository: Repository<Comment>);
    create(authorId: number, data: CreateCommentDto): Promise<Comment>;
    findAllByPost(postId: number): Promise<Comment[]>;
    update(id: number, authorId: number, data: UpdateCommentDto): Promise<Comment>;
    remove(id: number, authorId: number, userRole: string): Promise<Comment>;
}
