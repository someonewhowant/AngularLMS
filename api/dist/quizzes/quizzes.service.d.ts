import { Repository, DataSource } from 'typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { ImportQuizDto, ImportQuestionsDto } from './dto/import-quiz.dto';
import { AchievementsService } from '../achievements/achievements.service';
import { Quiz } from './entities/quiz.entity';
import { UserQuizResult } from './entities/user-quiz-result.entity';
import { CourseModule } from '../course-modules/entities/course-module.entity';
export declare class QuizzesService {
    private quizRepository;
    private userQuizResultRepository;
    private moduleRepository;
    private achievementsService;
    private dataSource;
    constructor(quizRepository: Repository<Quiz>, userQuizResultRepository: Repository<UserQuizResult>, moduleRepository: Repository<CourseModule>, achievementsService: AchievementsService, dataSource: DataSource);
    create(teacherId: number, userRole: string, data: CreateQuizDto): Promise<Quiz>;
    findOne(id: number): Promise<Quiz>;
    getQuizForStudent(id: number): Promise<any>;
    submitQuiz(id: number, userId: number, dto: SubmitQuizDto): Promise<UserQuizResult>;
    getMyResults(userId: number): Promise<UserQuizResult[]>;
    importQuiz(teacherId: number, userRole: string, dto: ImportQuizDto): Promise<Quiz>;
    importQuestions(teacherId: number, userRole: string, quizId: number, dto: ImportQuestionsDto): Promise<Quiz>;
    private parseMarkdown;
    private parseGift;
}
