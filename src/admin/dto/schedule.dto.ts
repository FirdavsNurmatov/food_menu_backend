import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ScheduleDto {
  @IsOptional()
  @IsString()
  date: string; // YYYY-MM-DD

  @IsOptional()
  @IsNumber()
  foodId: number;
}
