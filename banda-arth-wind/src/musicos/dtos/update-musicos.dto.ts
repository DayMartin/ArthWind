// update-musico.dto.ts
import {
  IsString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UpdateMusicoDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  instruments?: string[];
}
