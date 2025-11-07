import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto, FoodCategory } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as fs from 'fs';
import * as path from 'path';
import { ScheduleDto } from './dto/schedule.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE — yangi taom qo‘shish (rasm bilan)
  async create(createAdminDto: CreateAdminDto, file?: Express.Multer.File) {
    try {
      if (file) {
        createAdminDto.image = file.filename;
      }

      return await this.prisma.food.create({
        data: {
          name: createAdminDto.name,
          description: createAdminDto.description,
          price: createAdminDto.price,
          image: createAdminDto.image,
          category: createAdminDto.category,
        },
      });
    } catch (error) {
      console.error('❌ Create error:', error);
      throw new InternalServerErrorException(
        'Taom qo‘shishda xatolik yuz berdi',
      );
    }
  }

  // READ — barcha taomlarni olish
  async findAll(category: string) {
    try {
      if (!category) {
        return await this.prisma.food.findMany({});
      }
      return await this.prisma.food.findMany({
        where: { category: 'FOOD' },
      });
    } catch (error) {
      console.error('❌ FindAll error:', error);
      throw new InternalServerErrorException(
        'Taomlar ro‘yxatini olishda xatolik',
      );
    }
  }

  // READ ONE — bitta taom
  async findOne(id: number | string) {
    try {
      const food = await this.prisma.food.findUnique({
        where: { id: Number(id) },
      });

      if (!food) throw new NotFoundException(`ID ${id} bilan taom topilmadi`);
      return food;
    } catch (error) {
      console.error('❌ FindOne error:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Taomni olishda xatolik');
    }
  }

  // UPDATE — taomni o‘zgartirish
  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const existingFood = await this.findOne(id);

      const dataToUpdate: any = {};

      if (updateAdminDto.name !== undefined)
        dataToUpdate.name = updateAdminDto.name;
      if (updateAdminDto.price !== undefined)
        dataToUpdate.price = updateAdminDto.price;
      if (updateAdminDto.description !== undefined)
        dataToUpdate.description = updateAdminDto.description;
      if (updateAdminDto.is_active !== undefined)
        dataToUpdate.is_active =
          updateAdminDto.is_active === 'true' ||
          updateAdminDto.is_active === true;
      if (updateAdminDto.image !== undefined)
        dataToUpdate.image = updateAdminDto.image;

      return await this.prisma.food.update({
        where: { id },
        data: dataToUpdate,
      });
    } catch (error) {
      console.error('❌ Update error:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Taomni o‘zgartirishda xatolik');
    }
  }

  // DELETE — taomni o‘chirish
  async remove(id: number) {
    try {
      const data = await this.findOne(id);

      if (data.image) {
        const imagePath = path.join(
          process.cwd(),
          'uploads',
          'foods',
          data.image,
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      return await this.prisma.food.delete({ where: { id } });
    } catch (error) {
      console.error('❌ Remove error:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Taomni o‘chirishda xatolik');
    }
  }

  // 🟢 ADD TO SCHEDULE — jadvalga ovqat qo‘shish
  async addToSchedule(dto: ScheduleDto) {
    try {
      const { date, foodId } = dto;

      return await this.prisma.schedule.create({
        data: {
          date: new Date(date),
          foodId,
        },
      });
    } catch (error) {
      console.error("❌ Schedule qo'shishda xatolik:", error);
      throw new InternalServerErrorException(
        "Schedule qo'shishda xatolik yuz berdi",
      );
    }
  }

  // 🟢 GET — sana bo‘yicha jadval
  async getScheduleByDate(date: string) {
    try {
      return await this.prisma.schedule.findMany({
        where: {
          date: new Date(date),
        },
        include: { food: true },
      });
    } catch (error) {
      console.error('❌ Schedule olishda xatolik:', error);
      throw new InternalServerErrorException(
        'Schedule olishda xatolik yuz berdi',
      );
    }
  }

  // 🟢 DELETE — jadvaldan ovqatni o‘chirish
  async removeFromSchedule(id: number) {
    try {
      return await this.prisma.schedule.delete({
        where: { id },
      });
    } catch (error) {
      console.error("❌ Schedule o'chirishda xatolik:", error);
      throw new InternalServerErrorException(
        "Schedule o'chirishda xatolik yuz berdi",
      );
    }
  }
}
