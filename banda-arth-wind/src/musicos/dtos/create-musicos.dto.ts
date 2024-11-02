import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsInt,
} from 'class-validator';

export class CreateMusicoDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  senha: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsInt()
  valorEvento: number;

}
