// create-musico.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateInstrumentoDto {
  @IsNotEmpty()
  @IsString()
  name: string;

}
