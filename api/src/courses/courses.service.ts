import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>
  ) {}

  async create(teacherId: number, data: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create({ ...data, teacherId });
    await this.courseRepository.save(course);
    const saved = await this.courseRepository.findOne({
      where: { id: course.id },
      relations: { teacher: true },
    });
    if (!saved) throw new NotFoundException('Course not found after creation');
    return saved;
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find({
      relations: { teacher: true },
    });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: {
        teacher: true,
        modules: {
          assignments: true,
          quizzes: true,
        }
      },
      order: {
        modules: {
          order: 'ASC'
        }
      }
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async update(id: number, teacherId: number, userRole: string, data: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id);
    if (course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only update your own courses');
    }
    
    Object.assign(course, data);
    await this.courseRepository.save(course);
    
    const updated = await this.courseRepository.findOne({
      where: { id },
      relations: { teacher: true },
    });
    if (!updated) throw new NotFoundException('Course not found after update');
    return updated;
  }

  async remove(id: number, teacherId: number, userRole: string): Promise<Course> {
    const course = await this.findOne(id);
    if (course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only delete your own courses');
    }
    return this.courseRepository.remove(course);
  }
}
