import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Programa } from './programa.entity';
import { Balcao } from 'src/modules/balcao/entities/balcao.entity';
import { Tempo } from './tempo.entity';

@Entity('cotacao')
export class Cotacao {
  @PrimaryGeneratedColumn({ comment: 'Identificador único da cotação' })
  @ApiProperty({ description: 'Identificador único da cotação', type: 'number', example: 1 })
  id: number;

  @ManyToOne(() => Balcao)
  @JoinColumn({ name: 'id_balcao' })
  @ApiProperty({ description: 'Identificador do balcão', type: () => Balcao, nullable: false })
  balcao: Balcao;

  @ManyToOne(() => Programa, { eager: true })
  @JoinColumn({ name: 'id_programa' })
  @ApiProperty({ description: 'Identificador do programa', type: () => Programa, nullable: false })
  programa: Programa;

  @ManyToOne(() => Tempo)
  @JoinColumn({ name: 'id_tempo' })
  @ApiProperty({ description: 'Identificador do tempo', type: () => Tempo, nullable: false })
  tempo: Tempo;

  @Column({ type: 'bigint', comment: 'Identificador do do prazo de recebimento da cotação', nullable: true })
  @ApiProperty({ description: 'Prazo de recebimento da cotação', required: false })
  prazo: number;

  @Column('numeric', { comment: 'Valor da cotação', precision: 10, scale: 2, nullable: false })
  @ApiProperty({ description: 'Valor da cotação', type: 'number', example: 100.0 })
  valor: number;

  @Column({ type: 'timestamp', comment: 'Data da cotação' })
  @ApiProperty({ description: 'Data da cotação', type: 'string', example: '2021-10-01T00:00:00.000Z' })
  data: Date;
}
