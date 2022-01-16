import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CriarJogadorDTO } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@ApiTags('Jogadores')
@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criaJogadorDto: CriarJogadorDTO) {
    await this.jogadoresService.criarAtualizarJogador(criaJogadorDto);
  }

  @Get()
  async consultarJogadores(
    @Query('email') email: string,
  ): Promise<Jogador[] | Jogador> {
    if (email) {
      return await this.jogadoresService.consultarJogadorPeloEmail(email);
    } else {
      return await this.jogadoresService.consultarTodosJogadores();
    }
  }

  @Delete()
  async deletarJogador(@Query('email') email: string): Promise<void> {
    await this.jogadoresService.deletarJogador(email);
  }
}
