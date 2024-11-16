import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('programa')
export class Programa {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identificador único do programa' })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true, comment: 'Nome do programa áereo' })
  @ApiProperty({ description: 'Nome do programa áereo', maxLength: 50, required: true, example: 'LATAM' })
  nome: string;
}
