import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTagDto) {
    const existing = await this.prisma.tag.findUnique({ where: { name: data.name } });
    if (existing) throw new ConflictException('Tag already exists');
    return this.prisma.tag.create({ data });
  }

  findAll() {
    return this.prisma.tag.findMany();
  }

  async findOne(id: number) {
    const tag = await this.prisma.tag.findUnique({ where: { id } });
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async update(id: number, data: UpdateTagDto) {
    await this.findOne(id);
    return this.prisma.tag.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.tag.delete({ where: { id } });
  }
}
