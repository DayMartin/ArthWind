// create-musico_instrumento.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateMusicoInstrumentoDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsInt()
  musicoId: number;

  @IsNotEmpty()
  @IsInt()
  instrumentoId: number;

}
