import { Test, TestingModule } from '@nestjs/testing';
import { CotacaoService } from '../cotacao.service';

describe('CotacaoService', () => {
  let service: CotacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CotacaoService],
    }).compile();

    service = module.get<CotacaoService>(CotacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
