import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CriarCategoriaDTO } from './dto/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria')
    private readonly categoriaModel: Model<Categoria>,
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
}
