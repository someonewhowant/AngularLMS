import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitQuizDto {
  @ApiProperty({ 
    example: { 1: 3, 2: 7 },
    description: 'A map of questionId to selectedOptionId'
  })
  @IsNotEmpty()
  answers!: Record<number, number>;
}
