import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { Assignment } from './entities/assignment.entity';
import { CourseModule as CourseModuleEntity } from '../course-modules/entities/course-module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, CourseModuleEntity])],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
})
export class AssignmentsModule {}
