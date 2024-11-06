// update-eventos.dto.ts
import {
  IsString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  IsEmail,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UpdateEventosDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  data_de?: string;

  @IsOptional()
  @IsString()
  data_ate?: string;

  @IsOptional()
  @IsString()
  hora_de?: string;

  @IsOptional()
  @IsString()
  hora_ate?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  valor_total?: number;
}
