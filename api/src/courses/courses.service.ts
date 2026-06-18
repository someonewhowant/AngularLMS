import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  create(teacherId: number, data: CreateCourseDto) {
    return this.prisma.course.create({
      data: { ...data, teacherId },
      include: { teacher: { select: { id: true, email: true, role: true } } }
    });
  }

  findAll() {
    return this.prisma.course.findMany({
      include: { teacher: { select: { id: true, email: true, role: true } } }
    });
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { 
        teacher: { select: { id: true, email: true, role: true } },
        modules: {
          include: { assignments: true, quizzes: true },
          orderBy: { order: 'asc' }
        }
      }
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: number, teacherId: number, userRole: string, data: UpdateCourseDto) {
    const course = await this.findOne(id);
    if (course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only update your own courses');
    }
    return this.prisma.course.update({
      where: { id },
      data,
      include: { teacher: { select: { id: true, email: true, role: true } } }
    });
  }

  async remove(id: number, teacherId: number, userRole: string) {
    const course = await this.findOne(id);
    if (course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only delete your own courses');
    }
    return this.prisma.course.delete({ where: { id } });
  }
}
