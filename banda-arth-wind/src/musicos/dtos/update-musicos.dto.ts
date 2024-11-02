// update-musico.dto.ts
import {
  IsString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  IsEmail,
  IsOptional,
  IsStrongPassword,
  IsNumber,
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
  @IsString()
  senha?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsInt()
  valorEvento?: number;

}
