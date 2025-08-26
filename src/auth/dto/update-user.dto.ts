import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDTO {
  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password?: string;
}
