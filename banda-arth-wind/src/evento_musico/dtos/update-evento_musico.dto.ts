// update-eventos.dto.ts
import {
  IsString,
  IsInt,
  IsOptional,
} from 'class-validator';

export class UpdateEventoMusicoDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  musicoId?: string;

  @IsOptional()
  @IsString()
  eventoId?: string;


}
