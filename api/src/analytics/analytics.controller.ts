import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { TrackActivityDto } from './dto/track-activity.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  @ApiOperation({ summary: 'Track user activity (e.g., viewed a module)' })
  track(@Request() req: any, @Body() dto: TrackActivityDto) {
    return this.analyticsService.trackActivity(req.user.id, dto);
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Get aggregated stats for the user dashboard' })
  getDashboard(@Request() req: any) {
    return this.analyticsService.getDashboard(req.user.id);
  }
}
