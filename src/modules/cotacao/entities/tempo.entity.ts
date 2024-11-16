import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tempo')
export class Tempo {
  @PrimaryGeneratedColumn({ comment: 'Identificador único do tempo', type: 'bigint' })
  id: number;

  @Column({ type: 'int', comment: 'Hora da coleta cotação' })
  hora: number;

  @Column({ type: 'int', comment: 'Minutos da coleta cotação' })
  minutos: number;

  @Column({ type: 'int', comment: 'Dia da coleta cotação' })
  dia: number;

  @Column({ type: 'int', comment: 'Mês da coleta cotação' })
  mes: number;

  @Column({ type: 'int', comment: 'Ano da coleta cotação' })
  ano: number;
}
