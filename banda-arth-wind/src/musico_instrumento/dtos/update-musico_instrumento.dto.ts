// update-musico_instrumento.dto.ts
import {
  IsString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UpdateMusicoInstrumentoDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  musicoId?: number;

  @IsOptional()
  @IsString()
  instrumentoId?: number;

}
