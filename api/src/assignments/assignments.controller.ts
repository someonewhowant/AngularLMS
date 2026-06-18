import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('assignments')
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new assignment (Teacher/Admin)' })
  create(@Request() req: any, @Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(req.user.id, req.user.role, createAssignmentDto);
  }

  @Get('module/:moduleId')
  @ApiOperation({ summary: 'Get all assignments for a module' })
  findAllByModule(@Param('moduleId', ParseIntPipe) moduleId: number) {
    return this.assignmentsService.findAllByModule(moduleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get assignment by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an assignment (Teacher/Admin)' })
  update(@Request() req: any, @Param('id', ParseIntPipe) id: number, @Body() updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentsService.update(id, req.user.id, req.user.role, updateAssignmentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an assignment (Teacher/Admin)' })
  remove(@Request() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.assignmentsService.remove(id, req.user.id, req.user.role);
  }
}
