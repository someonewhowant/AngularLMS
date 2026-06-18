import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(req: any, createPostDto: CreatePostDto): Promise<import("./entities/post.entity").Post>;
    findAll(): Promise<import("./entities/post.entity").Post[]>;
    findOne(id: number): Promise<import("./entities/post.entity").Post>;
    update(id: number, updatePostDto: UpdatePostDto): Promise<import("./entities/post.entity").Post>;
    remove(id: number): Promise<import("./entities/post.entity").Post>;
}
