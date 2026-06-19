import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { TagsModule } from './tags/tags.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { CoursesModule } from './courses/courses.module';
import { CourseModulesModule } from './course-modules/course-modules.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { AchievementsModule } from './achievements/achievements.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { UploadsModule } from './uploads/uploads.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: join(__dirname, '..', 'data', 'lms.sqlite'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    } as any),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    TagsModule,
    PostsModule,
    CommentsModule,
    BookmarksModule,
    CoursesModule,
    CourseModulesModule,
    AssignmentsModule,
    EnrollmentsModule,
    QuizzesModule,
    AchievementsModule,
    AnalyticsModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
