import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, Request, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { ImportQuizDto, ImportQuestionsDto } from './dto/import-quiz.dto';
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

  @Post('import')
  @UseGuards(RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Import a quiz from GIFT or Markdown' })
  async importQuiz(
    @Request() req: any,
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const moduleId = Number(body.moduleId);
    const format = body.format;
    const title = body.title;
    let content = body.content;

    if (file) {
      content = file.buffer.toString('utf-8');
    }

    if (!content) {
      throw new BadRequestException('Content or file is required');
    }

    return this.quizzesService.importQuiz(req.user.id, req.user.role, {
      moduleId,
      format,
      title,
      content,
    });
  }

  @Post(':id/import-questions')
  @UseGuards(RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Import questions into a quiz from GIFT or Markdown' })
  async importQuestions(
    @Request() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File
  ) {
    const format = body.format;
    let content = body.content;

    if (file) {
      content = file.buffer.toString('utf-8');
    }

    if (!content) {
      throw new BadRequestException('Content or file is required');
    }

    return this.quizzesService.importQuestions(req.user.id, req.user.role, id, {
      format,
      content,
    });
  }
}
