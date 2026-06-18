import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { CourseModule } from '../course-modules/entities/course-module.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(CourseModule)
    private moduleRepository: Repository<CourseModule>
  ) { }

  async create(teacherId: number, userRole: string, data: CreateAssignmentDto): Promise<Assignment> {
    const module = await this.moduleRepository.findOne({
      where: { id: data.moduleId },
      relations: { course: true }
    });

    if (!module) throw new NotFoundException('Module not found');

    if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only add assignments to your own courses');
    }

    const { dueDate, ...assignmentData } = data;

    const assignment = this.assignmentRepository.create({
      ...assignmentData,
      dueDate: dueDate ? new Date(dueDate) : null,
      moduleId: module.id
    }) as Assignment;

    return this.assignmentRepository.save(assignment);
  }

  async findAllByModule(moduleId: number): Promise<Assignment[]> {
    return this.assignmentRepository.find({
      where: { moduleId },
    });
  }

  async findOne(id: number): Promise<Assignment> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
      relations: { module: { course: true } }
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async update(id: number, teacherId: number, userRole: string, data: UpdateAssignmentDto): Promise<Assignment> {
    const assignment = await this.findOne(id);
    if (assignment.module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only update assignments in your own courses');
    }

    const { dueDate, ...assignmentData } = data;
    Object.assign(assignment, assignmentData);
    if (dueDate !== undefined) {
      assignment.dueDate = dueDate ? new Date(dueDate) : null;
    }

    return this.assignmentRepository.save(assignment);
  }

  async remove(id: number, teacherId: number, userRole: string): Promise<Assignment> {
    const assignment = await this.findOne(id);
    if (assignment.module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only delete assignments from your own courses');
    }

    return this.assignmentRepository.remove(assignment);
  }
}
