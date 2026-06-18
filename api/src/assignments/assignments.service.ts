import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  async create(teacherId: number, userRole: string, data: CreateAssignmentDto) {
    const module = await this.prisma.courseModule.findUnique({
      where: { id: data.moduleId },
      include: { course: true }
    });
    if (!module) throw new NotFoundException('Module not found');
    if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only add assignments to your own courses');
    }

    const { dueDate, ...assignmentData } = data;
    return this.prisma.assignment.create({
      data: {
        ...assignmentData,
        dueDate: dueDate ? new Date(dueDate) : null,
      }
    });
  }

  findAllByModule(moduleId: number) {
    return this.prisma.assignment.findMany({
      where: { moduleId },
    });
  }

  async findOne(id: number) {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id },
      include: { module: { include: { course: true } } }
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async update(id: number, teacherId: number, userRole: string, data: UpdateAssignmentDto) {
    const assignment = await this.findOne(id);
    if (assignment.module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only update assignments in your own courses');
    }

    const { dueDate, ...assignmentData } = data;
    const updateData: any = { ...assignmentData };
    if (dueDate !== undefined) {
      updateData.dueDate = dueDate ? new Date(dueDate) : null;
    }

    return this.prisma.assignment.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number, teacherId: number, userRole: string) {
    const assignment = await this.findOne(id);
    if (assignment.module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only delete assignments from your own courses');
    }

    return this.prisma.assignment.delete({ where: { id } });
  }
}
