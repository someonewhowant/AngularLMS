import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) {}

  async create(data: CreateTagDto): Promise<Tag> {
    const existing = await this.tagRepository.findOne({ where: { name: data.name } });
    if (existing) throw new ConflictException('Tag already exists');
    
    const tag = this.tagRepository.create(data);
    return this.tagRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async findOne(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async update(id: number, data: UpdateTagDto): Promise<Tag> {
    const tag = await this.findOne(id);
    Object.assign(tag, data);
    return this.tagRepository.save(tag);
  }

  async remove(id: number): Promise<Tag> {
    const tag = await this.findOne(id);
    return this.tagRepository.remove(tag);
  }
}
