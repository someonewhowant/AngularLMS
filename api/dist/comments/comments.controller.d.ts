import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(req: any, createCommentDto: CreateCommentDto): Promise<import("./entities/comment.entity").Comment>;
    findAllByPost(postId: number): Promise<import("./entities/comment.entity").Comment[]>;
    update(req: any, id: number, updateCommentDto: UpdateCommentDto): Promise<import("./entities/comment.entity").Comment>;
    remove(req: any, id: number): Promise<import("./entities/comment.entity").Comment>;
}
