import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';
import { CourseModule } from './entities/course-module.entity';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class CourseModulesService {
  constructor(
    @InjectRepository(CourseModule)
    private moduleRepository: Repository<CourseModule>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>
  ) {}

  async create(teacherId: number, userRole: string, data: CreateCourseModuleDto): Promise<CourseModule> {
    const course = await this.courseRepository.findOne({ where: { id: data.courseId } });
    if (!course) throw new NotFoundException('Course not found');
    if (course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only add modules to your own courses');
    }

    const module = this.moduleRepository.create(data);
    await this.moduleRepository.save(module);

    const saved = await this.moduleRepository.findOne({
      where: { id: module.id },
      relations: { assignments: true },
    });
    if (!saved) throw new NotFoundException('Module not found after creation');
    return saved;
  }

  async findAllByCourse(courseId: number): Promise<CourseModule[]> {
    return this.moduleRepository.find({
      where: { courseId },
      order: { order: 'ASC' },
      relations: { assignments: true }
    });
  }

  async findOne(id: number): Promise<CourseModule> {
    const module = await this.moduleRepository.findOne({
      where: { id },
      relations: { assignments: true, course: true }
    });
    if (!module) throw new NotFoundException('Module not found');
    return module;
  }

  async update(id: number, teacherId: number, userRole: string, data: UpdateCourseModuleDto): Promise<CourseModule> {
    const module = await this.findOne(id);
    if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only update modules in your own courses');
    }

    Object.assign(module, data);
    await this.moduleRepository.save(module);

    const updated = await this.moduleRepository.findOne({
      where: { id },
      relations: { assignments: true }
    });
    if (!updated) throw new NotFoundException('Module not found after update');
    return updated;
  }

  async remove(id: number, teacherId: number, userRole: string): Promise<CourseModule> {
    const module = await this.findOne(id);
    if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only delete modules from your own courses');
    }

    return this.moduleRepository.remove(module);
  }
}
