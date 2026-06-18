import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as crypto from 'crypto';
import * as fs from 'fs';

@ApiTags('uploads')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('uploads')
export class UploadsController {

  @Post()
  @ApiOperation({ summary: 'Upload a single file (avatar, cover, etc.)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const dir = './uploads';
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = crypto.randomBytes(16).toString('hex');
        const ext = extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      }
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter: (req, file, cb) => {
      // allow images and text/pdf documents
      const allowedMimeTypes = /\/(jpg|jpeg|png|gif|webp|pdf|markdown|md|plain)$/;
      const allowedExtensions = /\.(md|markdown|pdf|jpg|jpeg|png|gif|webp)$/i;
      
      if (!file.mimetype.match(allowedMimeTypes) && !file.originalname.match(allowedExtensions)) {
        return cb(new BadRequestException('Only images and documents (PDF, MD, TXT) are allowed'), false);
      }
      cb(null, true);
    }
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');
    return {
      url: `/uploads/${file.filename}`,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    };
  }
}
