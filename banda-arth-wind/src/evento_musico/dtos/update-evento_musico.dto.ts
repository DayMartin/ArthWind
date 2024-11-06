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
  @IsInt()
  conjuntoid?: number;

  @IsOptional()
  @IsInt()
  eventoId?: number;


}
