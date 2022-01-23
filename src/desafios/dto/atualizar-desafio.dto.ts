import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';

import { DesafioStatus } from '../interfaces/desafio-status.enum';

export class AtualizarDesafioDto {
  @IsOptional()
  @IsDate()
  @ApiProperty()
  dataHoraDesafio: Date;

  @IsOptional()
  @ApiProperty()
  status: DesafioStatus;
}
