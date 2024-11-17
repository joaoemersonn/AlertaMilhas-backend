import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocao } from './entities/promocao.entity';
import { PromocaoService } from './promocao.service';
import { PromocaoController } from './promocao.controller';
import { Programa } from '../cotacao/entities/programa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Promocao, Programa])],
  providers: [PromocaoService],
  controllers: [PromocaoController],
})
export class PromocaoModule {}
