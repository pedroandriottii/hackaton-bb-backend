import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class UserDto {
  @IsUUID(undefined, { message: 'O ID precisa ser um UUID válido.' })
  id: string;

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

  @IsInt({ message: 'Os pontos devem ser um número inteiro.' })
  @Min(0, { message: 'Os pontos não podem ser negativos.' })
  points: number;

  @IsOptional()
  @IsString({ message: 'O CEP deve ser um texto.' })
  cep?: string;

  @IsString({ message: 'O role deve ser um texto.' })
  @IsNotEmpty({ message: 'O role é obrigatório.' })
  role: string;
}