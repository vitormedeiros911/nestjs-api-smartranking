import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDTO } from './dto/atualizar-categoria.dto';
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

  @Get()
  @ApiOperation({ summary: 'Busca todas as categorias' })
  async consultarCategorias(): Promise<Categoria[]> {
    return await this.categoriasService.consultarTodasCategorias();
  }

  @Get('/:categoria')
  @ApiOperation({ summary: 'Busca uma categoria por ID' })
  async consultarCategoriaPorId(
    @Param('categoria') categoria: string,
  ): Promise<Categoria> {
    return await this.categoriasService.consultarCategoriaPorId(categoria);
  }

  @Put('/:categoria')
  @ApiOperation({ summary: 'Atualiza uma categoria' })
  async atualizarCategoria(
    @Param('categoria') categoria: string,
    @Body() atualizarCategoriaDTO: AtualizarCategoriaDTO,
  ): Promise<Categoria> {
    return await this.categoriasService.atualizarCategoria(
      categoria,
      atualizarCategoriaDTO,
    );
  }

  @Post('/:categoria/jogadores/:idJogador')
  @ApiOperation({ summary: 'Atribui um jogador a uma categoria' })
  async atribuirCategoriaJogador(
    @Param('categoria') categoria: string,
    @Param('idJogador') idJogador: string,
  ): Promise<void> {
    return await this.categoriasService.atribuirCategoriaJogador(
      categoria,
      idJogador,
    );
  }
}
