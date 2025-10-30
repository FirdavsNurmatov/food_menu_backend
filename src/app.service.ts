import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getFoods(date: string) {
    try {
      return await this.prisma.schedule.findMany({
        where: {
          date: new Date(date),
        },
        include: { food: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Taomlar ro‘yxatini olishda xatolik',
      );
    }
  }
}
