import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesService } from './quizzes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { UserQuizResult } from './entities/user-quiz-result.entity';
import { CourseModule } from '../course-modules/entities/course-module.entity';
import { AchievementsService } from '../achievements/achievements.service';
import { DataSource } from 'typeorm';

describe('QuizzesService', () => {
  let service: QuizzesService;

  const mockQuizRepository = {};
  const mockUserQuizResultRepository = {};
  const mockCourseModuleRepository = {};
  const mockAchievementsService = {};
  const mockDataSource = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizzesService,
        {
          provide: getRepositoryToken(Quiz),
          useValue: mockQuizRepository,
        },
        {
          provide: getRepositoryToken(UserQuizResult),
          useValue: mockUserQuizResultRepository,
        },
        {
          provide: getRepositoryToken(CourseModule),
          useValue: mockCourseModuleRepository,
        },
        {
          provide: AchievementsService,
          useValue: mockAchievementsService,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<QuizzesService>(QuizzesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('parseMarkdown', () => {
    it('should parse markdown quiz title and questions', () => {
      const content = `
# Quiz on NestJS

## What is NestJS?
- [x] A progressive Node.js framework
- [ ] A database ORM
- [ ] A frontend library

## What language is NestJS built with?
- [ ] Go
- [ ] Python
- [x] TypeScript
      `;
      const result = (service as any).parseMarkdown(content);
      expect(result.title).toBe('Quiz on NestJS');
      expect(result.questions).toHaveLength(2);
      expect(result.questions[0].text).toBe('What is NestJS?');
      expect(result.questions[0].options).toHaveLength(3);
      expect(result.questions[0].options[0].text).toBe('A progressive Node.js framework');
      expect(result.questions[0].options[0].isCorrect).toBe(true);
      expect(result.questions[0].options[1].isCorrect).toBe(false);
    });
  });

  describe('parseGift', () => {
    it('should parse GIFT title and questions', () => {
      const content = `
::TypeORM Basics:: What is TypeORM? {
  =An ORM for TypeScript
  ~A testing framework
  ~A styling framework
}
      `;
      const result = (service as any).parseGift(content);
      expect(result.title).toBe('TypeORM Basics');
      expect(result.questions).toHaveLength(1);
      expect(result.questions[0].text).toBe('What is TypeORM?');
      expect(result.questions[0].options).toHaveLength(3);
      expect(result.questions[0].options[0].text).toBe('An ORM for TypeScript');
      expect(result.questions[0].options[0].isCorrect).toBe(true);
      expect(result.questions[0].options[1].isCorrect).toBe(false);
    });
  });
});
