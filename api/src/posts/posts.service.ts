import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: number, data: CreatePostDto) {
    const { tagIds, ...postData } = data;
    return this.prisma.post.create({
      data: {
        ...postData,
        authorId,
        tags: tagIds ? {
          connect: tagIds.map(id => ({ id }))
        } : undefined,
      },
      include: {
        author: { select: { id: true, email: true, role: true } },
        category: true,
        tags: true,
      }
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: {
        author: { select: { id: true, email: true, role: true } },
        category: true,
        tags: true,
      }
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, email: true, role: true } },
        category: true,
        tags: true,
      }
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: number, data: UpdatePostDto) {
    await this.findOne(id); // checks existence
    const { tagIds, ...postData } = data;
    
    return this.prisma.post.update({
      where: { id },
      data: {
        ...postData,
        tags: tagIds ? {
          set: tagIds.map(tagId => ({ id: tagId })) // Replaces all existing tags with this array
        } : undefined,
      },
      include: {
        author: { select: { id: true, email: true, role: true } },
        category: true,
        tags: true,
      }
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.post.delete({ where: { id } });
  }
}
