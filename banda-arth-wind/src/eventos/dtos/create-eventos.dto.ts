// create-eventos.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class CreateEventosDto {
  @IsNotEmpty()
  @IsString()
  descricao: string;


  @IsNotEmpty()
  @IsString()
  data_de: string;

  @IsNotEmpty()
  @IsString()
  data_ate: string;

  @IsNotEmpty()
  @IsString()
  hora_de: string;

  @IsNotEmpty()
  @IsString()
  hora_ate: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsNumber()
  valor_total: number;

  // @IsNotEmpty()
  // @IsString()
  // valor_multa_cancelamento: string;

  // @IsNotEmpty()
  // @IsString()
  // valor_multa_atualizacao: string;

}
