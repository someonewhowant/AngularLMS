import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { Achievement } from './entities/achievement.entity';
import { UserAchievement } from './entities/user-achievement.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(Achievement) private achievementRepository: Repository<Achievement>,
    @InjectRepository(UserAchievement) private userAchievementRepository: Repository<UserAchievement>,
    private dataSource: DataSource
  ) {}

  async grantAchievement(userId: number, achievementName: string) {
    const achievement = await this.achievementRepository.findOne({
      where: { name: achievementName }
    });

    if (!achievement) return null;

    const alreadyAwarded = await this.userAchievementRepository.findOne({
      where: {
        userId,
        achievementId: achievement.id
      }
    });

    if (alreadyAwarded) return null;

    return this.dataSource.transaction(async (manager) => {
      const awarded = manager.create(UserAchievement, {
        userId,
        achievementId: achievement.id,
      });
      await manager.save(awarded);

      const user = await manager.findOne(User, { where: { id: userId } });
      if (user) {
        user.points += achievement.points;
        await manager.save(user);
      }

      return manager.findOne(UserAchievement, {
        where: { id: awarded.id },
        relations: { achievement: true }
      });
    });
  }

  async getMyAchievements(userId: number): Promise<UserAchievement[]> {
    return this.userAchievementRepository.find({
      where: { userId },
      relations: { achievement: true },
      order: { awardedAt: 'DESC' }
    });
  }

  // Admin routes
  async create(data: CreateAchievementDto): Promise<Achievement> {
    const achievement = this.achievementRepository.create(data);
    return this.achievementRepository.save(achievement);
  }

  async findAll(): Promise<Achievement[]> {
    return this.achievementRepository.find();
  }

  async getLeaderboard(): Promise<User[]> {
    return this.dataSource.getRepository(User).find({
      order: { points: 'DESC' },
      take: 10,
      select: { id: true, email: true, firstName: true, lastName: true, points: true, avatar: true }
    });
  }
}
