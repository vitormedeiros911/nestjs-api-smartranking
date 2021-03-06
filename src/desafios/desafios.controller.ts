import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { DesafiosService } from './desafios.service';
import { AtribuirDesafioPartidaDto } from './dto/atribuir-desafio-partida.dto';
import { AtualizarDesafioDto } from './dto/atualizar-desafio.dto';
import { CriarDesafioDto } from './dto/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';
import { DesafioStatusValidacaoPipe } from './pipes/desafio-status-validation.pipe';

@ApiTags('Desafios')
@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(private readonly desafiosService: DesafiosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo desafio' })
  async criarDesafio(
    @Body() criarDesafioDto: CriarDesafioDto,
  ): Promise<Desafio> {
    return await this.desafiosService.criarDesafio(criarDesafioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Busca todos os desafios' })
  async consultarDesafios(
    @Query('idJogador') _id: string,
  ): Promise<Array<Desafio>> {
    return _id
      ? await this.desafiosService.consultarDesafiosDeUmJogador(_id)
      : await this.desafiosService.consultarTodosDesafios();
  }

  @Put('/:desafio')
  @ApiOperation({ summary: 'Atualiza um desafio' })
  async atualizarDesafio(
    @Body(DesafioStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto,
    @Param('desafio') _id: string,
  ): Promise<void> {
    await this.desafiosService.atualizarDesafio(_id, atualizarDesafioDto);
  }

  @Post('/:desafio/partida/')
  @ApiOperation({ summary: 'Atribui uma partida a um desafio' })
  async atribuirDesafioPartida(
    @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
    @Param('desafio') _id: string,
  ): Promise<void> {
    return await this.desafiosService.atribuirDesafioPartida(
      _id,
      atribuirDesafioPartidaDto,
    );
  }

  @Delete('/:_id')
  @ApiOperation({ summary: 'Deleta um desafio' })
  async deletarDesafio(@Param('_id') _id: string): Promise<void> {
    await this.desafiosService.deletarDesafio(_id);
  }
}
