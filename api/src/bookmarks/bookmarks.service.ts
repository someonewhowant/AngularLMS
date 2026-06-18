import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarksService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, data: CreateBookmarkDto) {
    const existing = await this.prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: data.postId,
        }
      }
    });

    if (existing) {
      throw new ConflictException('Post is already in your bookmarks');
    }

    return this.prisma.bookmark.create({
      data: { userId, postId: data.postId },
      include: { post: true }
    });
  }

  findAllByUser(userId: number) {
    return this.prisma.bookmark.findMany({
      where: { userId },
      include: { 
        post: {
          include: { category: true, tags: true }
        } 
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async remove(userId: number, postId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { userId_postId: { userId, postId } }
    });

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }

    return this.prisma.bookmark.delete({
      where: { userId_postId: { userId, postId } }
    });
  }
}
