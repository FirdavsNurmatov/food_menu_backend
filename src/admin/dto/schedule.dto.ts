import { IsNumber, IsOptional } from "class-validator";

export class ScheduleDto {
  @IsOptional()
  date: string;  // YYYY-MM-DD

  @IsOptional()
  @IsNumber()
  foodId: number; 
}
