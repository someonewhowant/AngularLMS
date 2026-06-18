import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>
  ) {}

  async create(userId: number, data: CreateBookmarkDto): Promise<Bookmark> {
    const existing = await this.bookmarkRepository.findOne({
      where: {
        userId,
        postId: data.postId,
      }
    });

    if (existing) {
      throw new ConflictException('Post is already in your bookmarks');
    }

    const bookmark = this.bookmarkRepository.create({
      userId,
      postId: data.postId
    });

    await this.bookmarkRepository.save(bookmark);

    const saved = await this.bookmarkRepository.findOne({
      where: { id: bookmark.id },
      relations: { post: true }
    });
    
    if (!saved) throw new NotFoundException('Bookmark not found after creation');
    return saved;
  }

  async findAllByUser(userId: number): Promise<Bookmark[]> {
    return this.bookmarkRepository.find({
      where: { userId },
      relations: { 
        post: {
          category: true,
          tags: true
        } 
      },
      order: { createdAt: 'DESC' }
    });
  }

  async remove(userId: number, postId: number): Promise<Bookmark> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { userId, postId }
    });

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }

    return this.bookmarkRepository.remove(bookmark);
  }
}
