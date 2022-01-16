import { Injectable } from '@nestjs/common';

import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }
}
