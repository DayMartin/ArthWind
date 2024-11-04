import {
  IsString,
  IsInt,
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
