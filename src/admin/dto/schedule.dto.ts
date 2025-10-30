import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum FoodCategory {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  SALAD = 'SALAD',
}

export class ScheduleDto {
  @IsOptional()
  @IsString()
  date: string; // YYYY-MM-DD

  @IsOptional()
  @IsNumber()
  foodId: number;

  @IsOptional()
  @IsEnum(FoodCategory)
  category: FoodCategory; // 👈 yangi maydon
}
