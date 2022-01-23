import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

export class CriarDesafioDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  dataHoraDesafio: Date;

  @IsNotEmpty()
  @ApiProperty()
  solicitante: Jogador;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ApiProperty()
  jogadores: Array<Jogador>;
}
