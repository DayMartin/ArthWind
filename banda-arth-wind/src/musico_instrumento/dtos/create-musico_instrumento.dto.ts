import {
  IsNotEmpty,
  IsInt,
} from 'class-validator';

export class CreateMusicoInstrumentoDto {
  @IsNotEmpty()
  @IsInt()
  musicoId: number;

  @IsNotEmpty()
  @IsInt()
  instrumentoId: number;

}
