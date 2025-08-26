import { IsEmail, MaxLength, IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { Role } from '../../../prisma/__generated__';

export class RegisterUserDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password!: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
