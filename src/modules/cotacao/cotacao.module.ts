import { Module } from '@nestjs/common';
import { CotacaoController } from './cotacao.controller';
import { CotacaoService } from './cotacao.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cotacao } from './entities/cotacao.entity';
import { Programa } from './entities/programa.entity';
import { Balcao } from '../balcao/entities/balcao.entity';
import { Tempo } from './entities/tempo.entity';
import { Credenciais } from './entities/credenciais.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cotacao, Programa, Balcao, Tempo])],
  controllers: [CotacaoController],
  providers: [CotacaoService],
})
export class CotacaoModule {}
