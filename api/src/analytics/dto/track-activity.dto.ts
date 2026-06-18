import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TrackActivityDto {
  @ApiProperty({ example: 'MODULE_VIEW' })
  @IsString()
  @IsNotEmpty()
  action!: string;

  @ApiPropertyOptional({ example: '{"moduleId": 42}' })
  @IsString()
  @IsOptional()
  details?: string;
}
