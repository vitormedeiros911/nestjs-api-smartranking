import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AtualizarCategoriaDTO } from './dto/atualizar-categoria.dto';
import { CriarCategoriaDTO } from './dto/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { JogadoresService } from '../jogadores/jogadores.service';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria')
    private readonly categoriaModel: Model<Categoria>,
    private readonly jogadoresService: JogadoresService,
  ) {}

  async criarCategoria(
    criarCategoriaDTO: CriarCategoriaDTO,
  ): Promise<Categoria> {
    const { categoria } = criarCategoriaDTO;

    const categoriaEncotrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (categoriaEncotrada) {
      throw new ConflictException(`A Categoria ${categoria} já existe.`);
    }

    const novaCategoria = new this.categoriaModel(criarCategoriaDTO);
    return await novaCategoria.save();
  }

  async consultarTodasCategorias(): Promise<Categoria[]> {
    return await this.categoriaModel.find().populate('jogadores').exec();
  }

  async consultarCategoriaPorId(categoria: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (!categoriaEncontrada)
      throw new NotFoundException(`Categoria ${categoria} não encontrada.`);

    return categoriaEncontrada;
  }

  async atualizarCategoria(
    categoria: string,
    atualizarCategoriaDTO: AtualizarCategoriaDTO,
  ): Promise<Categoria> {
    await this.consultarCategoriaPorId(categoria);

    return await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDTO })
      .exec();
  }

  async atribuirCategoriaJogador(
    categoria: string,
    idJogador: string,
  ): Promise<void> {
    const categoriaEncontrada = await this.consultarCategoriaPorId(
      categoria.toUpperCase(),
    );

    await this.jogadoresService.consultarJogadorPorId(idJogador);

    const jogadorCadastradoCategoria = await this.categoriaModel
      .find({ categoria })
      .where('jogadores')
      .in(idJogador as any)
      .exec();

    if (jogadorCadastradoCategoria)
      throw new ConflictException(
        `Jogador ${idJogador} já cadastrado na Categoria ${categoria}`,
      );

    categoriaEncontrada.jogadores.push(idJogador as any);
    await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: categoriaEncontrada })
      .exec();
  }
}
