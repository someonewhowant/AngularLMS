import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  async create(authorId: number, data: CreatePostDto): Promise<Post> {
    const { tagIds, ...postData } = data;
    
    const post = this.postRepository.create({
      ...postData,
      authorId,
    });
    
    if (tagIds && tagIds.length > 0) {
      post.tags = tagIds.map(id => ({ id } as any));
    }

    await this.postRepository.save(post);

    const saved = await this.postRepository.findOne({
      where: { id: post.id },
      relations: {
        author: true,
        category: true,
        tags: true,
      }
    });
    if (!saved) throw new NotFoundException('Post not found after creation');
    return saved;
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: {
        author: true,
        category: true,
        tags: true,
      }
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: {
        author: true,
        category: true,
        tags: true,
      }
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: number, data: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    const { tagIds, ...postData } = data;
    
    Object.assign(post, postData);

    if (tagIds !== undefined) {
      post.tags = tagIds.map(tagId => ({ id: tagId } as any));
    }
    
    await this.postRepository.save(post);

    const updated = await this.postRepository.findOne({
      where: { id },
      relations: {
        author: true,
        category: true,
        tags: true,
      }
    });
    if (!updated) throw new NotFoundException('Post not found after update');
    return updated;
  }

  async remove(id: number): Promise<Post> {
    const post = await this.findOne(id);
    return this.postRepository.remove(post);
  }
}
