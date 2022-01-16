import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CriarJogadorDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly telefoneCelular: string;

  @ApiProperty()
  @IsEmail({ message: 'O campo e-mail não é valido' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly nome: string;
}
