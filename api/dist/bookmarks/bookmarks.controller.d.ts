import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
export declare class BookmarksController {
    private readonly bookmarksService;
    constructor(bookmarksService: BookmarksService);
    create(req: any, createBookmarkDto: CreateBookmarkDto): Promise<import("./entities/bookmark.entity").Bookmark>;
    findAll(req: any): Promise<import("./entities/bookmark.entity").Bookmark[]>;
    remove(req: any, postId: number): Promise<import("./entities/bookmark.entity").Bookmark>;
}
