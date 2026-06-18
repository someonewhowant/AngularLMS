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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
let CommentsService = class CommentsService {
    commentRepository;
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async create(authorId, data) {
        const comment = this.commentRepository.create({
            content: data.content,
            postId: data.postId,
            authorId,
        });
        await this.commentRepository.save(comment);
        const saved = await this.commentRepository.findOne({
            where: { id: comment.id },
            relations: { author: true }
        });
        if (!saved)
            throw new common_1.NotFoundException('Comment not found after creation');
        return saved;
    }
    async findAllByPost(postId) {
        return this.commentRepository.find({
            where: { postId },
            relations: { author: true },
            order: { createdAt: 'DESC' }
        });
    }
    async update(id, authorId, data) {
        const comment = await this.commentRepository.findOne({ where: { id } });
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        if (comment.authorId !== authorId)
            throw new common_1.ForbiddenException('You can only edit your own comments');
        comment.content = data.content;
        await this.commentRepository.save(comment);
        const updated = await this.commentRepository.findOne({
            where: { id },
            relations: { author: true }
        });
        if (!updated)
            throw new common_1.NotFoundException('Comment not found after update');
        return updated;
    }
    async remove(id, authorId, userRole) {
        const comment = await this.commentRepository.findOne({ where: { id } });
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        if (comment.authorId !== authorId && userRole === 'STUDENT') {
            throw new common_1.ForbiddenException('You can only delete your own comments');
        }
        return this.commentRepository.remove(comment);
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map