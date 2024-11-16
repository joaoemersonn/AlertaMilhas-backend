import { ApiProperty } from '@nestjs/swagger';
import { Programa } from 'src/modules/cotacao/entities/programa.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('promocao')
export class Promocao {
  @ApiProperty({ description: 'ID único da promoção' })
  @PrimaryGeneratedColumn({ comment: 'ID único da promoção' })
  id: number;

  @ApiProperty({ description: 'ID do programa relacionado' })
  @ManyToOne(() => Programa, (programa) => programa.id, { nullable: false })
  @JoinColumn({ name: 'id_programa' })
  programa: Programa;

  @ApiProperty({ description: 'Título da promoção' })
  @Column({ length: 50, comment: 'Título da promoção' })
  titulo: string;

  @ApiProperty({ description: 'Link da promoção' })
  @Column({ type: 'varchar', comment: 'Link da promoção' })
  link: string;

  @ApiProperty({ description: 'Descrição da promoção' })
  @Column({ length: 250, comment: 'Descrição da promoção' })
  descricao: string;

  @ApiProperty({ description: 'Imagem da promoção (URL ou base64)' })
  @Column({ type: 'text', comment: 'Imagem da promoção (URL ou base64)' })
  imagem: string;

  @ApiProperty({ description: 'Data de início da promoção' })
  @Column({ type: 'timestamp', comment: 'Data de início da promoção' })
  data_inicio: Date;

  @ApiProperty({ description: 'Data de término da promoção' })
  @Column({ type: 'timestamp', comment: 'Data de término da promoção' })
  data_fim: Date;

  @ApiProperty({ description: 'Data de criação da promoção' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: 'Data de criação da promoção' })
  data: Date;

  @ApiProperty({ description: 'Situação da promoção: "CANCELADO", "ATIVO", "EXPIRADO"' })
  @Column({ type: 'int', comment: 'Situação da promoção: "CANCELADO", "ATIVO", "EXPIRADO"' })
  situacao: number;
}
