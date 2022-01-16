import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AtualizarJogadorDTO } from './dto/atualizar-jogador.dto';
import { CriarJogadorDTO } from './dto/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarJogador(criarJogadorDTO: CriarJogadorDTO): Promise<Jogador> {
    const { email } = criarJogadorDTO;

    const jogador = await this.jogadorModel.findOne({ email }).exec();

    if (jogador) {
      throw new ConflictException(`Jogador com e-mail ${email} já cadastrado.`);
    }

    const jogadorCriado = new this.jogadorModel(criarJogadorDTO);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    atualizarJogadorDTO: AtualizarJogadorDTO,
  ): Promise<Jogador> {
    await this.jogadorExistente(_id);

    return await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: atualizarJogadorDTO })
      .exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPorId(_id: string): Promise<Jogador> {
    return await this.jogadorExistente(_id);
  }

  async deletarJogador(_id: string): Promise<any> {
    await this.jogadorExistente(_id);
    return await this.jogadorModel.remove({ _id }).exec();
  }

  private async jogadorExistente(_id: string): Promise<Jogador> {
    const jogador = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogador) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }
    return jogador;
  }
}
