import { ApiProperty } from '@nestjs/swagger';

export class CriarJogadorDTO {
  @ApiProperty()
  readonly telefoneCelular: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly nome: string;
}
