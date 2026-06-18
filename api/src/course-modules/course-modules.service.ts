import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';

@Injectable()
export class CourseModulesService {
  constructor(private prisma: PrismaService) {}

  async create(teacherId: number, userRole: string, data: CreateCourseModuleDto) {
    const course = await this.prisma.course.findUnique({ where: { id: data.courseId } });
    if (!course) throw new NotFoundException('Course not found');
    if (course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only add modules to your own courses');
    }

    return this.prisma.courseModule.create({
      data,
      include: { assignments: true }
    });
  }

  findAllByCourse(courseId: number) {
    return this.prisma.courseModule.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
      include: { assignments: true }
    });
  }

  async findOne(id: number) {
    const module = await this.prisma.courseModule.findUnique({
      where: { id },
      include: { assignments: true, course: true }
    });
    if (!module) throw new NotFoundException('Module not found');
    return module;
  }

  async update(id: number, teacherId: number, userRole: string, data: UpdateCourseModuleDto) {
    const module = await this.findOne(id);
    if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only update modules in your own courses');
    }

    return this.prisma.courseModule.update({
      where: { id },
      data,
      include: { assignments: true }
    });
  }

  async remove(id: number, teacherId: number, userRole: string) {
    const module = await this.findOne(id);
    if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only delete modules from your own courses');
    }

    return this.prisma.courseModule.delete({ where: { id } });
  }
}
