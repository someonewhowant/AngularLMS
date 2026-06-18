import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAchievementDto {
  @ApiProperty({ example: 'First Blood' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Complete your first course' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiPropertyOptional({ example: 'https://example.com/icon.png' })
  @IsString()
  @IsOptional()
  iconUrl?: string;

  @ApiProperty({ example: 'COMPLETE_FIRST_COURSE' })
  @IsString()
  @IsNotEmpty()
  criteria!: string;

  @ApiPropertyOptional({ example: 10 })
  @IsInt()
  @IsOptional()
  points?: number;
}
