import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AtualizarJogadorDTO } from './dto/atualizar-jogador.dto';
import { CriarJogadorDTO } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/validacoes-parametros.pipe';

@ApiTags('Jogadores')
@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um jogador' })
  async criarJogador(@Body() criaJogadorDto: CriarJogadorDTO) {
    return await this.jogadoresService.criarJogador(criaJogadorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Busca todos os Jogadores' })
  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  @ApiOperation({ summary: 'Busca um jogador por id' })
  async consultarJogadorPorId(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<Jogador> {
    return await this.jogadoresService.consultarJogadorPorId(_id);
  }

  @Put('/:_id')
  @ApiOperation({ summary: 'Atualiza as informações de um jogador' })
  async atualizarJogador(
    @Body() atualizarJogadorDTO: AtualizarJogadorDTO,
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ) {
    return await this.jogadoresService.atualizarJogador(
      _id,
      atualizarJogadorDTO,
    );
  }

  @Delete('/:_id')
  @ApiOperation({ summary: 'Deleta um jogador' })
  async deletarJogador(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    await this.jogadoresService.deletarJogador(_id);
  }
}
