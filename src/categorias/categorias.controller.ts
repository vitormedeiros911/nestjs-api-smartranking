import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoriasService } from './categorias.service';
import { CriarCategoriaDTO } from './dto/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@ApiTags('Categorias')
@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova categoria' })
  async criarCategoria(
    @Body() criarCategoriaDTO: CriarCategoriaDTO,
  ): Promise<Categoria> {
    return await this.categoriasService.criarCategoria(criarCategoriaDTO);
  }
}
