import { IsNotEmpty, IsString, IsInt, IsOptional, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuestionOptionDto {
  @ApiProperty({ example: 'Paris' })
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  isCorrect!: boolean;
}

export class CreateQuestionDto {
  @ApiProperty({ example: 'What is the capital of France?' })
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiProperty({ type: [CreateQuestionOptionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionOptionDto)
  options!: CreateQuestionOptionDto[];
}

export class CreateQuizDto {
  @ApiProperty({ example: 'Module 1 Quiz' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ example: 'Test your knowledge on Module 1' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  moduleId!: number;

  @ApiProperty({ type: [CreateQuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions!: CreateQuestionDto[];
}
