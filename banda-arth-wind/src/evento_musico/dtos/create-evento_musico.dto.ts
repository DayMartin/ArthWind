import {
  IsNotEmpty,
  IsInt,

} from 'class-validator';

export class CreateEventoMusicoDto {
  @IsNotEmpty()
  @IsInt()
  conjuntoid: number;

  @IsNotEmpty()
  @IsInt()
  eventoId: number;
  
}
