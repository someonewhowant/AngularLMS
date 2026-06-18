import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
export declare class PostsService {
    private postRepository;
    constructor(postRepository: Repository<Post>);
    create(authorId: number, data: CreatePostDto): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    update(id: number, data: UpdatePostDto): Promise<Post>;
    remove(id: number): Promise<Post>;
}
