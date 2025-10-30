import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { extname, join } from 'path';
import { AuthGuard } from 'src/guards/auth.guard';
import { ScheduleDto } from './dto/schedule.dto';

@UseGuards(AuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'foods'), // ✅ to‘liq path, __dirname emas
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `food-${uniqueSuffix}${ext}`); // ✅ fayl nomi aniqroq
        },
      }),
    }),
  )
  create(
    @Body() createAdminDto: CreateAdminDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createAdminDto.image = file.filename;
    }

    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'foods'),
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `food-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
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
    if (file) dataToUpdate.image = file.filename;

    return this.adminService.update(+id, dataToUpdate);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  // ---------- Schedule endpoints ----------
  @Post('schedule')
  addToSchedule(@Body() dto: ScheduleDto) {
    // dto: { date: string, foodId: number }
    return this.adminService.addToSchedule(dto);
  }

  @Get('schedule/:date')
  getScheduleByDate(@Param('date') date: string) {
    return this.adminService.getScheduleByDate(date);
  }

  @Delete('schedule/:id')
  removeFromSchedule(@Param('id') id: string) {
    return this.adminService.removeFromSchedule(+id);
  }
}
