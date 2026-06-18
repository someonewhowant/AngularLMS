import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TrackActivityDto } from './dto/track-activity.dto';
import { AchievementsService } from '../achievements/achievements.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private prisma: PrismaService,
    private achievementsService: AchievementsService
  ) {}

  async trackActivity(userId: number, dto: TrackActivityDto) {
    return this.prisma.userActivity.create({
      data: {
        userId,
        action: dto.action,
        details: dto.details,
      }
    });
  }

  async getDashboard(userId: number) {
    // Award FIRST_STEPS achievement if not already awarded when they access dashboard
    await this.achievementsService.grantAchievement(userId, 'FIRST_STEPS');

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            enrollments: true,
            quizResults: true,
            achievements: true,
          }
        }
      }
    });

    const recentActivities = await this.prisma.userActivity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    return {
      points: user?.points || 0,
      totalEnrollments: user?._count.enrollments || 0,
      totalQuizzesTaken: user?._count.quizResults || 0,
      totalAchievements: user?._count.achievements || 0,
      lastLoginAt: user?.lastLoginAt,
      recentActivities
    };
  }
}
