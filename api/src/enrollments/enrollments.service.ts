import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { Enrollment } from './entities/enrollment.entity';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>
  ) {}

  async enroll(userId: number, data: CreateEnrollmentDto): Promise<Enrollment> {
    const course = await this.courseRepository.findOne({ where: { id: data.courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const existing = await this.enrollmentRepository.findOne({
      where: {
        userId,
        courseId: data.courseId,
      }
    });

    if (existing) {
      throw new ConflictException('You are already enrolled in this course');
    }

    const enrollment = this.enrollmentRepository.create({
      userId,
      courseId: data.courseId
    });

    await this.enrollmentRepository.save(enrollment);

    const saved = await this.enrollmentRepository.findOne({
      where: { id: enrollment.id },
      relations: { course: true }
    });
    if (!saved) throw new NotFoundException('Enrollment not found after creation');
    return saved;
  }

  async findAllByUser(userId: number): Promise<Enrollment[]> {
    return this.enrollmentRepository.find({
      where: { userId },
      relations: { 
        course: {
          teacher: true
        }
      },
      order: { createdAt: 'DESC' }
    });
  }

  async unenroll(userId: number, courseId: number): Promise<Enrollment> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { userId, courseId }
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    return this.enrollmentRepository.remove(enrollment);
  }
}
