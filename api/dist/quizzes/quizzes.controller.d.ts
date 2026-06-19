import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
export declare class QuizzesController {
    private readonly quizzesService;
    constructor(quizzesService: QuizzesService);
    create(req: any, createQuizDto: CreateQuizDto): Promise<import("./entities/quiz.entity").Quiz>;
    findOneForEdit(id: number): Promise<import("./entities/quiz.entity").Quiz>;
    getQuizForStudent(id: number): Promise<any>;
    submitQuiz(req: any, id: number, dto: SubmitQuizDto): Promise<import("./entities/user-quiz-result.entity").UserQuizResult>;
    getMyResults(req: any): Promise<import("./entities/user-quiz-result.entity").UserQuizResult[]>;
    importQuiz(req: any, body: any, file?: Express.Multer.File): Promise<import("./entities/quiz.entity").Quiz>;
    importQuestions(req: any, id: number, body: any, file?: Express.Multer.File): Promise<import("./entities/quiz.entity").Quiz>;
}
