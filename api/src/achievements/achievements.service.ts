import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';

@Injectable()
export class AchievementsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAchievementDto) {
    const existing = await this.prisma.achievement.findUnique({ where: { name: data.name } });
    if (existing) throw new ConflictException('Achievement with this name already exists');
    return this.prisma.achievement.create({ data });
  }

  findAll() {
    return this.prisma.achievement.findMany();
  }

  // Business Logic for granting an achievement
  async grantAchievement(userId: number, criteria: string) {
    const achievement = await this.prisma.achievement.findFirst({ where: { criteria } });
    if (!achievement) return null; // Achievement doesn't exist for this criteria

    const alreadyAwarded = await this.prisma.userAchievement.findUnique({
      where: {
        userId_achievementId: {
          userId,
          achievementId: achievement.id
        }
      }
    });

    if (alreadyAwarded) return null; // Already has it

    // Transaction to award and add XP
    return this.prisma.$transaction(async (tx) => {
      const awarded = await tx.userAchievement.create({
        data: {
          userId,
          achievementId: achievement.id,
        },
        include: { achievement: true }
      });

      await tx.user.update({
        where: { id: userId },
        data: { points: { increment: achievement.points } }
      });

      return awarded;
    });
  }

  getMyAchievements(userId: number) {
    return this.prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
      orderBy: { awardedAt: 'desc' }
    });
  }

  getLeaderboard() {
    return this.prisma.user.findMany({
      where: { points: { gt: 0 } },
      select: { id: true, email: true, points: true, role: true },
      orderBy: { points: 'desc' },
      take: 10
    });
  }
}
