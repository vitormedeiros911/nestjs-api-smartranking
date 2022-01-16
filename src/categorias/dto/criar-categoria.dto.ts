import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Evento } from '../interfaces/categoria.interface';
export class CriarCategoriaDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoria: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  descricao: string;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty()
  eventos: Array<Evento>;
}
