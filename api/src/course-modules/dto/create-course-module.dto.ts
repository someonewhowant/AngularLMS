import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseModuleDto {
  @ApiProperty({ example: 'Module 1: Introduction' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'Welcome to the course!' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  order?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  courseId!: number;
}
