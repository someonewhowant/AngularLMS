import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseModulesService } from './course-modules.service';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('course-modules')
@Controller('course-modules')
export class CourseModulesController {
  constructor(private readonly courseModulesService: CourseModulesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new module for a course (Teacher/Admin)' })
  create(
    @Request() req: any,
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const courseId = Number(body.courseId);
    const order = body.order ? Number(body.order) : undefined;
    let content = body.content;

    if (file) {
      content = file.buffer.toString('utf-8');
    }

    return this.courseModulesService.create(req.user.id, req.user.role, {
      title: body.title,
      content,
      order,
      courseId,
    });
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all modules for a specific course' })
  findAllByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.courseModulesService.findAllByCourse(courseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a module by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.courseModulesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a module (Teacher/Admin)' })
  update(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const order = body.order ? Number(body.order) : undefined;
    let content = body.content;

    if (file) {
      content = file.buffer.toString('utf-8');
    }

    return this.courseModulesService.update(id, req.user.id, req.user.role, {
      title: body.title,
      content,
      order,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a module (Teacher/Admin)' })
  remove(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.courseModulesService.remove(id, req.user.id, req.user.role);
  }
}
