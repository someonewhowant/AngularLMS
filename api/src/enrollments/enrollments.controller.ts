import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('enrollments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Enroll in a course' })
  create(@Request() req: any, @Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.enroll(req.user.id, createEnrollmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses I am enrolled in' })
  findAll(@Request() req: any) {
    return this.enrollmentsService.findAllByUser(req.user.id);
  }

  @Delete('course/:courseId')
  @ApiOperation({ summary: 'Unenroll from a course' })
  remove(@Request() req: any, @Param('courseId', ParseIntPipe) courseId: number) {
    return this.enrollmentsService.unenroll(req.user.id, courseId);
  }
}
