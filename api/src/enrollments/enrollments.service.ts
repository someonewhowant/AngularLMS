import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async enroll(userId: number, data: CreateEnrollmentDto) {
    const course = await this.prisma.course.findUnique({ where: { id: data.courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const existing = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: data.courseId,
        }
      }
    });

    if (existing) {
      throw new ConflictException('You are already enrolled in this course');
    }

    return this.prisma.enrollment.create({
      data: { userId, courseId: data.courseId },
      include: { course: true }
    });
  }

  findAllByUser(userId: number) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: { 
        course: {
          include: { teacher: { select: { id: true, email: true, role: true } } }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async unenroll(userId: number, courseId: number) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } }
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    return this.prisma.enrollment.delete({
      where: { userId_courseId: { userId, courseId } }
    });
  }
}
