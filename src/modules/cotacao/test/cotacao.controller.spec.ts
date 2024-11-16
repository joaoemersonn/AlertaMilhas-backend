import { Test, TestingModule } from '@nestjs/testing';
import { CotacaoController } from '../cotacao.controller';

describe('CotacaoController', () => {
  let controller: CotacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CotacaoController],
    }).compile();

    controller = module.get<CotacaoController>(CotacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
