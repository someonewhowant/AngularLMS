import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  create(authorId: number, data: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        content: data.content,
        postId: data.postId,
        authorId,
      },
      include: { author: { select: { id: true, email: true, role: true } } }
    });
  }

  findAllByPost(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: { author: { select: { id: true, email: true, role: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  async update(id: number, authorId: number, data: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.authorId !== authorId) throw new ForbiddenException('You can only edit your own comments');
    
    return this.prisma.comment.update({
      where: { id },
      data: { content: data.content },
      include: { author: { select: { id: true, email: true, role: true } } }
    });
  }

  async remove(id: number, authorId: number, userRole: string) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    
    // Admins and teachers can delete any comment, students only their own
    if (comment.authorId !== authorId && userRole === 'STUDENT') {
      throw new ForbiddenException('You can only delete your own comments');
    }

    return this.prisma.comment.delete({ where: { id } });
  }
}
