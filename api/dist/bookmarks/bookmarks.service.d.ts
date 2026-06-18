import { Repository } from 'typeorm';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmark } from './entities/bookmark.entity';
export declare class BookmarksService {
    private bookmarkRepository;
    constructor(bookmarkRepository: Repository<Bookmark>);
    create(userId: number, data: CreateBookmarkDto): Promise<Bookmark>;
    findAllByUser(userId: number): Promise<Bookmark[]>;
    remove(userId: number, postId: number): Promise<Bookmark>;
}
