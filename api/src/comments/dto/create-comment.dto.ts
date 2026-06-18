import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Great post!' })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  postId!: number;
}
