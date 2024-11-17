import { Controller, Get, Post, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PromocaoService } from './promocao.service';
import { Promocao } from './entities/promocao.entity';
import { CriarPromocaoDto } from './dtos/criar-promocao.dto';

@ApiTags('Promoção')
@Controller('promocao')
export class PromocaoController {
  constructor(private readonly promocaoService: PromocaoService) {}

  @ApiOperation({ summary: 'Listar todas as promoções' })
  @ApiResponse({ status: 200, description: 'Lista de promoções retornada com sucesso.' })
  @Get()
  obterTodas(): Promise<Promocao[]> {
    return this.promocaoService.obterTodas();
  }

  @ApiOperation({ summary: 'Obter uma promoção por ID' })
  @ApiResponse({ status: 200, description: 'Promoção retornada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Promoção não encontrada.' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Promocao> {
    return this.promocaoService.obterPorId(id);
  }

  @ApiOperation({ summary: 'Criar uma nova promoção' })
  @ApiResponse({ status: 201, description: 'Promoção criada com sucesso.' })
  @Post()
  create(@Body() criarPromocaoDto: CriarPromocaoDto): Promise<Promocao> {
    return this.promocaoService.criarPromocao(criarPromocaoDto);
  }

  @ApiOperation({ summary: 'Atualizar uma promoção existente' })
  @ApiResponse({ status: 200, description: 'Promoção atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Promoção não encontrada.' })
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<Promocao>): Promise<Promocao> {
    return this.promocaoService.update(id, data);
  }
}
