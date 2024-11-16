import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional, IsUrl, IsDate, IsEnum } from 'class-validator';
import { SituacaoPromocao } from '../enums/situacao-programa.enum';

export class CriarPromocaoDto {
  @ApiProperty({ description: 'ID do programa relacionado', example: 1 })
  @IsInt({ message: 'O campo id_programa deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'O campo id_programa é obrigatório.' })
  id_programa: number;

  @ApiProperty({ description: 'Título da promoção', example: 'Super Oferta' })
  @IsString({ message: 'O campo titulo deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo titulo é obrigatório.' })
  titulo: string;

  @ApiProperty({ description: 'Link da promoção', example: 'https://www.promocao.com/oferta' })
  @IsString({ message: 'O campo link deve ser uma string.' })
  @IsUrl({}, { message: 'O campo link deve ser uma URL válida.' })
  @IsOptional()
  link?: string;

  @ApiProperty({ description: 'Descrição da promoção', example: 'Desconto exclusivo em produtos selecionados.' })
  @IsString({ message: 'O campo descricao deve ser uma string.' })
  @IsOptional()
  descricao?: string;

  @ApiProperty({ description: 'Imagem da promoção (URL ou base64)', example: 'https://www.promocao.com/imagem.png' })
  @IsString({ message: 'O campo imagem deve ser uma string.' })
  @IsOptional()
  imagem?: string;

  @ApiProperty({ description: 'Data de início da promoção', example: '2024-11-20T10:00:00Z' })
  @IsDate({ message: 'O campo data_inicio deve ser uma data válida.' })
  @IsNotEmpty({ message: 'O campo data_inicio é obrigatório.' })
  data_inicio: Date;

  @ApiProperty({ description: 'Data de término da promoção', example: '2024-11-30T18:00:00Z' })
  @IsDate({ message: 'O campo data_fim deve ser uma data válida.' })
  @IsNotEmpty({ message: 'O campo data_fim é obrigatório.' })
  data_fim: Date;

  @ApiProperty({ description: 'Situação da promoção', enum: SituacaoPromocao, example: SituacaoPromocao.ATIVO })
  @IsEnum(SituacaoPromocao, { message: 'O campo situacao deve ser um valor válido: 0, 1 ou 2.' })
  @IsNotEmpty({ message: 'O campo situacao é obrigatório.' })
  situacao: SituacaoPromocao;
}
