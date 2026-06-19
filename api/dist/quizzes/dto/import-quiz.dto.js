"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportQuestionsDto = exports.ImportQuizDto = exports.ImportFormat = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var ImportFormat;
(function (ImportFormat) {
    ImportFormat["MARKDOWN"] = "markdown";
    ImportFormat["GIFT"] = "gift";
})(ImportFormat || (exports.ImportFormat = ImportFormat = {}));
class ImportQuizDto {
    moduleId;
    format;
    title;
    content;
    static _OPENAPI_METADATA_FACTORY() {
        return { moduleId: { required: true, type: () => Number }, format: { required: true, enum: require("./import-quiz.dto").ImportFormat }, title: { required: false, type: () => String }, content: { required: false, type: () => String } };
    }
}
exports.ImportQuizDto = ImportQuizDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID of the course module to add the quiz to' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ImportQuizDto.prototype, "moduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ImportFormat, example: 'gift', description: 'Format of the import content' }),
    (0, class_validator_1.IsEnum)(ImportFormat),
    __metadata("design:type", String)
], ImportQuizDto.prototype, "format", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Quiz Title', required: false, description: 'Optional title to override' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ImportQuizDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '# My Quiz\n\n## Question 1\n- [x] Correct\n- [ ] Incorrect', required: false, description: 'Content of the quiz file to import' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ImportQuizDto.prototype, "content", void 0);
class ImportQuestionsDto {
    format;
    content;
    static _OPENAPI_METADATA_FACTORY() {
        return { format: { required: true, enum: require("./import-quiz.dto").ImportFormat }, content: { required: false, type: () => String } };
    }
}
exports.ImportQuestionsDto = ImportQuestionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ImportFormat, example: 'markdown', description: 'Format of the import content' }),
    (0, class_validator_1.IsEnum)(ImportFormat),
    __metadata("design:type", String)
], ImportQuestionsDto.prototype, "format", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '## Question 1\n- [x] Correct\n- [ ] Incorrect', required: false, description: 'Content of the questions file to import' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ImportQuestionsDto.prototype, "content", void 0);
//# sourceMappingURL=import-quiz.dto.js.map