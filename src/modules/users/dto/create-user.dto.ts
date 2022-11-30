import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @Length(0, 30)
  email: string;

  @IsNotEmpty()
  password: string;
}
