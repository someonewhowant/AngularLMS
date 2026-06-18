import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
export declare class TagsService {
    private tagRepository;
    constructor(tagRepository: Repository<Tag>);
    create(data: CreateTagDto): Promise<Tag>;
    findAll(): Promise<Tag[]>;
    findOne(id: number): Promise<Tag>;
    update(id: number, data: UpdateTagDto): Promise<Tag>;
    remove(id: number): Promise<Tag>;
}
