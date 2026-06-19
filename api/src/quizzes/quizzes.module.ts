import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { AchievementsModule } from '../achievements/achievements.module';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { QuestionOption } from './entities/question-option.entity';
import { UserQuizResult } from './entities/user-quiz-result.entity';
import { CourseModule as CourseModuleEntity } from '../course-modules/entities/course-module.entity';
import { User } from '../users/entities/user.entity';
import { UserActivity } from '../analytics/entities/user-activity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quiz, Question, QuestionOption, UserQuizResult, CourseModuleEntity, User, UserActivity
    ]),
    AchievementsModule
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
