import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookmarkDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  postId!: number;
}
