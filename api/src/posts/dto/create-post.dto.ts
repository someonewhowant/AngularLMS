import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsInt, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'My First Blog Post' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'This is the content of the post...' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  categoryId!: number;

  @ApiPropertyOptional({ type: [Number], example: [1, 2] })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  tagIds?: number[];
}
