import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDto {
  @IsEmail(
    {},
    { message: 'O e-mail precisa ser um endereço de e-mail válido.' },
  )
  email: string;

  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsString({ message: 'O CPF deve ser um texto.' })
  @IsNotEmpty({ message: 'O CPF é obrigatório.' })
  @Length(11, 11, { message: 'O CPF deve ter exatamente 11 caracteres.' })
  cpf: string;

  @IsString({ message: 'O telefone deve ser um texto.' })
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  phone: string;

  @IsString({ message: 'A senha deve ser um texto.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;
}
