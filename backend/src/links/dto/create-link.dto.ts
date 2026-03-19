import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { Category } from '@prisma/client';

export class CreateLinkDto {
  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsEnum(Category)
  category: Category;

  @IsOptional()
  @IsString()
  customLabel?: string;
}