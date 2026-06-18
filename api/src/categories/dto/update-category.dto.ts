import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'Web Development' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'All about web tech' })
  @IsString()
  @IsOptional()
  description?: string;
}
