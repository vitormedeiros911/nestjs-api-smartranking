import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Jogador } from '../../jogadores/interfaces/jogador.interface';
import { Resultado } from '../interfaces/desafio.interface';

export class AtribuirDesafioPartidaDto {
  @IsNotEmpty()
  @ApiProperty()
  def: Jogador;

  @IsNotEmpty()
  @ApiProperty()
  resultado: Array<Resultado>;
}
