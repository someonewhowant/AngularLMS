import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCourseModuleDto {
  @ApiPropertyOptional({ example: 'Module 1: Getting Started' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'New content here' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsInt()
  @IsOptional()
  order?: number;
}
