import { IsString, IsBoolean, IsOptional, IsInt, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiPropertyOptional({ example: 'Updated Title' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated content...' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @ApiPropertyOptional({ example: 2 })
  @IsInt()
  @IsOptional()
  categoryId?: number;

  @ApiPropertyOptional({ type: [Number], example: [3, 4] })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  tagIds?: number[];
}
