import { IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @MinLength(2, { message: 'Пароль должен содержать как минимум 6 символов' })
  name: string;

  @IsString()
  @MinLength(6, { message: 'Пароль должен содержать как минимум 6 символов' })
  password: string;
}
