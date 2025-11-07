import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

export enum FoodCategory {
  FOOD = 'FOOD',
  DRINK = 'DRINK',
}

export class CreateAdminDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsEnum(FoodCategory)
  category: FoodCategory; // 👈 yangi maydon
}
