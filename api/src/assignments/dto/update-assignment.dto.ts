import { IsString, IsInt, IsOptional, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAssignmentDto {
  @ApiPropertyOptional({ example: 'Homework 1: Variables and Functions' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated description...' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 100 })
  @IsInt()
  @IsOptional()
  maxScore?: number;

  @ApiPropertyOptional({ example: '2025-12-31T23:59:59.000Z' })
  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
