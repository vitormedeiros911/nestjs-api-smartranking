import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AtualizarJogadorDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly telefoneCelular: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly nome: string;
}
