// create-evento_musico.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateEventoMusicoDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsInt()
  musicoId: number;

  @IsNotEmpty()
  @IsInt()
  eventoId: number;
}
