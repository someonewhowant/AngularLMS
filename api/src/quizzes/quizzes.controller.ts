import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('quizzes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  @ApiOperation({ summary: 'Create a new quiz with questions and options (Transaction)' })
  create(@Request() req: any, @Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(req.user.id, req.user.role, createQuizDto);
  }

  @Get(':id/edit')
  @UseGuards(RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  @ApiOperation({ summary: 'Get full quiz data for editing (includes correct answers)' })
  findOneForEdit(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.findOne(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quiz data for students (hides correct answers)' })
  getQuizForStudent(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.getQuizForStudent(id);
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Submit answers and calculate score' })
  submitQuiz(@Request() req: any, @Param('id', ParseIntPipe) id: number, @Body() dto: SubmitQuizDto) {
    return this.quizzesService.submitQuiz(id, req.user.id, dto);
  }

  @Get('my/results')
  @ApiOperation({ summary: 'Get all my quiz results' })
  getMyResults(@Request() req: any) {
    return this.quizzesService.getMyResults(req.user.id);
  }
}
