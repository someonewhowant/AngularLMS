import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { ImportQuizDto, ImportQuestionsDto } from './dto/import-quiz.dto';
import { AchievementsService } from '../achievements/achievements.service';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { QuestionOption } from './entities/question-option.entity';
import { UserQuizResult } from './entities/user-quiz-result.entity';
import { CourseModule } from '../course-modules/entities/course-module.entity';
import { User } from '../users/entities/user.entity';
import { UserActivity } from '../analytics/entities/user-activity.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
    @InjectRepository(UserQuizResult) private userQuizResultRepository: Repository<UserQuizResult>,
    @InjectRepository(CourseModule) private moduleRepository: Repository<CourseModule>,
    private achievementsService: AchievementsService,
    private dataSource: DataSource
  ) { }

  async create(teacherId: number, userRole: string, data: CreateQuizDto): Promise<Quiz> {
    const module = await this.moduleRepository.findOne({
      where: { id: data.moduleId },
      relations: { course: true }
    });

    if (!module) throw new NotFoundException('Module not found');

    if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only add quizzes to your own courses');
    }

    return this.dataSource.transaction(async (manager) => {
      const quiz = manager.create(Quiz, {
        title: data.title,
        description: data.description,
        moduleId: data.moduleId,
      });
      await manager.save(quiz);

      for (const q of data.questions) {
        const question = manager.create(Question, {
          text: q.text,
          quizId: quiz.id,
        });
        await manager.save(question);

        const options = q.options.map(opt => manager.create(QuestionOption, {
          text: opt.text,
          isCorrect: opt.isCorrect,
          questionId: question.id,
        }));
        await manager.save(options);
      }

      const savedQuiz = await manager.findOne(Quiz, {
        where: { id: quiz.id },
        relations: { questions: { options: true } }
      });

      if (!savedQuiz) throw new NotFoundException('Quiz not found after creation');
      return savedQuiz;
    });
  }

  async findOne(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: {
        questions: {
          options: true
        }
      }
    });
    if (!quiz) throw new NotFoundException('Quiz not found');

    // TypeORM doesn't have an easy way to just select specific relation columns like Prisma.
    // We fetch them all and can map them if necessary, but returning as is should be fine.
    return quiz;
  }

  async getQuizForStudent(id: number): Promise<any> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: {
        questions: {
          options: true
        }
      }
    });
    if (!quiz) throw new NotFoundException('Quiz not found');

    // Strip out `isCorrect` for students
    return {
      ...quiz,
      questions: quiz.questions.map(q => ({
        ...q,
        options: q.options.map(opt => ({
          id: opt.id,
          text: opt.text
        }))
      }))
    };
  }

  async submitQuiz(id: number, userId: number, dto: SubmitQuizDto): Promise<UserQuizResult> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: { questions: { options: true } }
    });

    if (!quiz) throw new NotFoundException('Quiz not found');

    let score = 0;
    const total = quiz.questions.length;

    for (const question of quiz.questions) {
      const selectedOptionId = dto.answers[question.id];
      if (selectedOptionId) {
        const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
        if (selectedOption && selectedOption.isCorrect) {
          score++;
        }
      }
    }

    // Calculate XP (10 points per correct answer)
    const xpEarned = score * 10;

    // Use transaction to update user points, log activity and create result
    const result = await this.dataSource.transaction(async (manager) => {
      const quizResult = manager.create(UserQuizResult, {
        userId,
        quizId: id,
        score,
        total,
      });
      await manager.save(quizResult);

      if (xpEarned > 0) {
        const user = await manager.findOne(User, { where: { id: userId } });
        if (user) {
          user.points += xpEarned;
          await manager.save(user);
        }
      }

      const activity = manager.create(UserActivity, {
        userId,
        action: 'SUBMIT_QUIZ',
        details: `Quiz ID: ${id}, Score: ${score}/${total}, XP Earned: ${xpEarned}`,
      });
      await manager.save(activity);

      return quizResult;
    });

    // Check and grant perfect score achievement if applicable
    if (score === total && total > 0) {
      await this.achievementsService.grantAchievement(userId, 'PERFECT_QUIZ');
    }

    return result;
  }

  async getMyResults(userId: number): Promise<UserQuizResult[]> {
    return this.userQuizResultRepository.find({
      where: { userId },
      relations: { quiz: true },
      order: { createdAt: 'DESC' }
    });
  }

  async importQuiz(teacherId: number, userRole: string, dto: ImportQuizDto): Promise<Quiz> {
    const module = await this.moduleRepository.findOne({
      where: { id: dto.moduleId },
      relations: { course: true }
    });

    if (!module) throw new NotFoundException('Module not found');
    if (module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only add quizzes to your own courses');
    }

    const { content, format, title: titleOverride } = dto;
    if (!content) {
      throw new NotFoundException('Content is required');
    }

    const parsed = format === 'markdown' ? this.parseMarkdown(content) : this.parseGift(content);
    const title = titleOverride || parsed.title || 'Imported Quiz';

    return this.dataSource.transaction(async (manager) => {
      const quiz = manager.create(Quiz, {
        title,
        description: `Imported from ${format}`,
        moduleId: dto.moduleId,
      });
      await manager.save(quiz);

      for (const q of parsed.questions) {
        const question = manager.create(Question, {
          text: q.text,
          quizId: quiz.id,
        });
        await manager.save(question);

        const options = q.options.map(opt => manager.create(QuestionOption, {
          text: opt.text,
          isCorrect: opt.isCorrect,
          questionId: question.id,
        }));
        await manager.save(options);
      }

      const savedQuiz = await manager.findOne(Quiz, {
        where: { id: quiz.id },
        relations: { questions: { options: true } }
      });

      if (!savedQuiz) throw new NotFoundException('Quiz not found after creation');
      return savedQuiz;
    });
  }

  async importQuestions(teacherId: number, userRole: string, quizId: number, dto: ImportQuestionsDto): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id: quizId },
      relations: { module: { course: true } }
    });

    if (!quiz) throw new NotFoundException('Quiz not found');
    if (quiz.module.course.teacherId !== teacherId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only add questions to quizzes in your own courses');
    }

    const { content, format } = dto;
    if (!content) {
      throw new NotFoundException('Content is required');
    }

    const parsed = format === 'markdown' ? this.parseMarkdown(content) : this.parseGift(content);

    return this.dataSource.transaction(async (manager) => {
      for (const q of parsed.questions) {
        const question = manager.create(Question, {
          text: q.text,
          quizId: quiz.id,
        });
        await manager.save(question);

        const options = q.options.map(opt => manager.create(QuestionOption, {
          text: opt.text,
          isCorrect: opt.isCorrect,
          questionId: question.id,
        }));
        await manager.save(options);
      }

      const savedQuiz = await manager.findOne(Quiz, {
        where: { id: quiz.id },
        relations: { questions: { options: true } }
      });

      if (!savedQuiz) throw new NotFoundException('Quiz not found');
      return savedQuiz;
    });
  }

  private parseMarkdown(content: string): { title?: string; questions: { text: string; options: { text: string; isCorrect: boolean }[] }[] } {
    const lines = content.split('\n');
    let title: string | undefined = undefined;
    const questions: { text: string; options: { text: string; isCorrect: boolean }[] }[] = [];
    let currentQuestion: { text: string; options: { text: string; isCorrect: boolean }[] } | null = null;

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      if (trimmedLine.startsWith('# ')) {
        title = trimmedLine.substring(2).trim();
      } else if (trimmedLine.startsWith('## ')) {
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = {
          text: trimmedLine.substring(3).trim(),
          options: [],
        };
      } else if (
        trimmedLine.startsWith('- [ ] ') ||
        trimmedLine.startsWith('- [x] ') ||
        trimmedLine.startsWith('- [] ')
      ) {
        if (currentQuestion) {
          const isCorrect = trimmedLine.startsWith('- [x] ');
          const bracketIndex = trimmedLine.indexOf(']');
          const optionText = bracketIndex !== -1 ? trimmedLine.substring(bracketIndex + 1).trim() : trimmedLine.substring(6).trim();
          currentQuestion.options.push({
            text: optionText,
            isCorrect,
          });
        }
      }
    }

    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    return { title, questions };
  }

  private parseGift(content: string): { title?: string; questions: { text: string; options: { text: string; isCorrect: boolean }[] }[] } {
    let title: string | undefined = undefined;
    if (content.includes('::')) {
      const firstColons = content.indexOf('::');
      const secondColons = content.indexOf('::', firstColons + 2);
      if (firstColons !== -1 && secondColons !== -1) {
        title = content.substring(firstColons + 2, secondColons).trim();
      }
    }

    const blocks = content.split(/\n\s*\n/);
    const questions: { text: string; options: { text: string; isCorrect: boolean }[] }[] = [];

    for (const block of blocks) {
      const trimmedBlock = block.trim();
      if (!trimmedBlock || trimmedBlock.startsWith('//')) continue;

      const openBrace = trimmedBlock.indexOf('{');
      const closeBrace = trimmedBlock.lastIndexOf('}');

      if (openBrace !== -1 && closeBrace !== -1) {
        let header = trimmedBlock.substring(0, openBrace).trim();

        if (header.startsWith('::')) {
          const secondColons = header.indexOf('::', 2);
          if (secondColons !== -1) {
            header = header.substring(secondColons + 2).trim();
          }
        }

        const optionsPart = trimmedBlock.substring(openBrace + 1, closeBrace).trim();
        const optionsArray = optionsPart.split('\n');
        const options: { text: string; isCorrect: boolean }[] = [];

        for (const opt of optionsArray) {
          const trimmedOpt = opt.trim();
          if (!trimmedOpt) continue;

          let isCorrect = false;
          let optionText = '';

          if (trimmedOpt.startsWith('=')) {
            isCorrect = true;
            optionText = trimmedOpt.substring(1).trim();
          } else if (trimmedOpt.startsWith('~')) {
            isCorrect = false;
            optionText = trimmedOpt.substring(1).trim();
          } else {
            continue;
          }

          options.push({ text: optionText, isCorrect });
        }

        if (options.length > 0) {
          questions.push({
            text: header,
            options,
          });
        }
      }
    }

    return { title, questions };
  }
}
