"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const categories_module_1 = require("./categories/categories.module");
const tags_module_1 = require("./tags/tags.module");
const posts_module_1 = require("./posts/posts.module");
const comments_module_1 = require("./comments/comments.module");
const bookmarks_module_1 = require("./bookmarks/bookmarks.module");
const courses_module_1 = require("./courses/courses.module");
const course_modules_module_1 = require("./course-modules/course-modules.module");
const assignments_module_1 = require("./assignments/assignments.module");
const enrollments_module_1 = require("./enrollments/enrollments.module");
const quizzes_module_1 = require("./quizzes/quizzes.module");
const achievements_module_1 = require("./achievements/achievements.module");
const analytics_module_1 = require("./analytics/analytics.module");
const uploads_module_1 = require("./uploads/uploads.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'better-sqlite3',
                database: (0, path_1.join)(__dirname, '..', 'data', 'lms.sqlite'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                logging: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            categories_module_1.CategoriesModule,
            tags_module_1.TagsModule,
            posts_module_1.PostsModule,
            comments_module_1.CommentsModule,
            bookmarks_module_1.BookmarksModule,
            courses_module_1.CoursesModule,
            course_modules_module_1.CourseModulesModule,
            assignments_module_1.AssignmentsModule,
            enrollments_module_1.EnrollmentsModule,
            quizzes_module_1.QuizzesModule,
            achievements_module_1.AchievementsModule,
            analytics_module_1.AnalyticsModule,
            uploads_module_1.UploadsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map