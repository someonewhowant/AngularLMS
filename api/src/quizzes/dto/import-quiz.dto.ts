import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum ImportFormat {
  MARKDOWN = 'markdown',
  GIFT = 'gift',
}

export class ImportQuizDto {
  @ApiProperty({ example: 1, description: 'ID of the course module to add the quiz to' })
  @IsNumber()
  moduleId: number;

  @ApiProperty({ enum: ImportFormat, example: 'gift', description: 'Format of the import content' })
  @IsEnum(ImportFormat)
  format: ImportFormat;

  @ApiProperty({ example: 'Quiz Title', required: false, description: 'Optional title to override' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: '# My Quiz\n\n## Question 1\n- [x] Correct\n- [ ] Incorrect', required: false, description: 'Content of the quiz file to import' })
  @IsString()
  @IsOptional()
  content?: string;
}

export class ImportQuestionsDto {
  @ApiProperty({ enum: ImportFormat, example: 'markdown', description: 'Format of the import content' })
  @IsEnum(ImportFormat)
  format: ImportFormat;

  @ApiProperty({ example: '## Question 1\n- [x] Correct\n- [ ] Incorrect', required: false, description: 'Content of the questions file to import' })
  @IsString()
  @IsOptional()
  content?: string;
}
