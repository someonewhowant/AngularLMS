import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) {}

  async create(authorId: number, data: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create({
      content: data.content,
      postId: data.postId,
      authorId,
    });
    
    await this.commentRepository.save(comment);

    const saved = await this.commentRepository.findOne({
      where: { id: comment.id },
      relations: { author: true }
    });
    if (!saved) throw new NotFoundException('Comment not found after creation');
    return saved;
  }

  async findAllByPost(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { postId },
      relations: { author: true },
      order: { createdAt: 'DESC' }
    });
  }

  async update(id: number, authorId: number, data: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.authorId !== authorId) throw new ForbiddenException('You can only edit your own comments');
    
    comment.content = data.content;
    await this.commentRepository.save(comment);

    const updated = await this.commentRepository.findOne({
      where: { id },
      relations: { author: true }
    });
    if (!updated) throw new NotFoundException('Comment not found after update');
    return updated;
  }

  async remove(id: number, authorId: number, userRole: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    
    // Admins and teachers can delete any comment, students only their own
    if (comment.authorId !== authorId && userRole === 'STUDENT') {
      throw new ForbiddenException('You can only delete your own comments');
    }

    return this.commentRepository.remove(comment);
  }
}
