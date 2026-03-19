import { IsEnum, IsOptional, IsBoolean, IsInt } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { Category } from '@prisma/client';

export class FilterLinksDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  week?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  year?: number;

  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  revisited?: boolean;
}