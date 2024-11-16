import { Controller, Get } from '@nestjs/common';
import { CotacaoService } from './cotacao.service';

@Controller('cotacao')
export class CotacaoController {
  constructor(private readonly integracaoService: CotacaoService) {}

  @Get('hotmilhas')
  getQuoteLatam(): Promise<any> {
    return this.integracaoService.obterCotacoesHotMilhas();
  }
}
