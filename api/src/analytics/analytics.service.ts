import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackActivityDto } from './dto/track-activity.dto';
import { AchievementsService } from '../achievements/achievements.service';
import { UserActivity } from './entities/user-activity.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(UserActivity) private activityRepository: Repository<UserActivity>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private achievementsService: AchievementsService
  ) {}

  async trackActivity(userId: number, dto: TrackActivityDto): Promise<UserActivity> {
    const activity = this.activityRepository.create({
      userId,
      action: dto.action,
      details: dto.details,
    });
    return this.activityRepository.save(activity);
  }

  async getDashboard(userId: number) {
    // Award FIRST_STEPS achievement if not already awarded when they access dashboard
    await this.achievementsService.grantAchievement(userId, 'FIRST_STEPS');

    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    const enrollmentCount = await this.userRepository.manager.getRepository('Enrollment').count({ where: { studentId: userId } });
    const quizResultCount = await this.userRepository.manager.getRepository('UserQuizResult').count({ where: { userId } });
    const achievementCount = await this.userRepository.manager.getRepository('UserAchievement').count({ where: { userId } });

    const recentActivities = await this.activityRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: 5
    });

    return {
      points: user?.points || 0,
      totalEnrollments: enrollmentCount || 0,
      totalQuizzesTaken: quizResultCount || 0,
      totalAchievements: achievementCount || 0,
      lastLoginAt: user?.lastLoginAt,
      recentActivities
    };
  }
}
