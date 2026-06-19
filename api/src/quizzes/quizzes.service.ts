import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
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
  ) {}

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
}
