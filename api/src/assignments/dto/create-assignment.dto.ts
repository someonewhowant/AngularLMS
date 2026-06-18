import { IsNotEmpty, IsString, IsInt, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAssignmentDto {
  @ApiProperty({ example: 'Homework 1: Variables' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Write a script that declares variables...' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiPropertyOptional({ example: 100 })
  @IsInt()
  @IsOptional()
  maxScore?: number;

  @ApiPropertyOptional({ example: '2025-12-31T23:59:59.000Z' })
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  moduleId!: number;
}
