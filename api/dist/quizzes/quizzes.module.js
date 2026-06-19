"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizzesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const quizzes_service_1 = require("./quizzes.service");
const quizzes_controller_1 = require("./quizzes.controller");
const achievements_module_1 = require("../achievements/achievements.module");
const quiz_entity_1 = require("./entities/quiz.entity");
const question_entity_1 = require("./entities/question.entity");
const question_option_entity_1 = require("./entities/question-option.entity");
const user_quiz_result_entity_1 = require("./entities/user-quiz-result.entity");
const course_module_entity_1 = require("../course-modules/entities/course-module.entity");
const user_entity_1 = require("../users/entities/user.entity");
const user_activity_entity_1 = require("../analytics/entities/user-activity.entity");
let QuizzesModule = class QuizzesModule {
};
exports.QuizzesModule = QuizzesModule;
exports.QuizzesModule = QuizzesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                quiz_entity_1.Quiz, question_entity_1.Question, question_option_entity_1.QuestionOption, user_quiz_result_entity_1.UserQuizResult, course_module_entity_1.CourseModule, user_entity_1.User, user_activity_entity_1.UserActivity
            ]),
            achievements_module_1.AchievementsModule
        ],
        controllers: [quizzes_controller_1.QuizzesController],
        providers: [quizzes_service_1.QuizzesService],
    })
], QuizzesModule);
//# sourceMappingURL=quizzes.module.js.map