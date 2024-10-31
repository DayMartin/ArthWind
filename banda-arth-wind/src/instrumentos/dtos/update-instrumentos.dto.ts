// update-musico.dto.ts
import {
  IsString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UpdateInstrumentoDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;
}
