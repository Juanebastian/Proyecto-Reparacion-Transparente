import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;  // Agregar esta propiedad

  @IsString()
  rol: string;

  @IsString()
  estado: string;
}
