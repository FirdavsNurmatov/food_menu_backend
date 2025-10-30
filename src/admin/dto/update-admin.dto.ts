import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsOptional } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  price?: number;

  @IsOptional()
  description?: string;

  @IsOptional()
  is_active?: boolean | string; // ✅ yangi optional maydon

  @IsOptional()
  image?: string; //
}
