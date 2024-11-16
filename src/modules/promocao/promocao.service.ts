import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promocao } from './entities/promocao.entity';
import { CriarPromocaoDto } from './dtos/criar-promocao.dto';
import { Programa } from '../cotacao/entities/programa.entity';

@Injectable()
export class PromocaoService {
  constructor(
    @InjectRepository(Promocao)
    private readonly promocaoRepository: Repository<Promocao>,
    @InjectRepository(Programa)
    private readonly programaRepository: Repository<Programa>,
  ) {}

  async obterTodas(): Promise<Promocao[]> {
    return this.promocaoRepository.find({ relations: ['id_programa'] });
  }

  async obterPorId(id: number): Promise<Promocao> {
    const promocao = await this.promocaoRepository.findOne({
      where: { id },
      relations: ['id_programa'],
    });

    if (!promocao) {
      throw new NotFoundException(`Promoção com ID ${id} não encontrada`);
    }

    return promocao;
  }
  async obterTodasPromocaoAtiva(): Promise<Promocao[]> {
    return this.promocaoRepository.find({
      where: { situacao: 1 },
      relations: ['id_programa'],
    });
  }
  async obterTodasPromocaoAtivaPorPrograma(id_programa: number): Promise<Promocao[]> {
    const programa = await this.obterProgramaPorId(id_programa);
    if (!programa) {
      throw new NotFoundException(`Programa com ID ${id_programa} não encontrado`);
    }
    return this.promocaoRepository.find({
      where: { situacao: 1, programa: programa },
      relations: ['id_programa'],
    });
  }

  /******  6903df48-314a-40f1-a008-eaff26336077  *******/
  async criarPromocao(criarPromocao: CriarPromocaoDto): Promise<Promocao> {
    const programa = await this.obterProgramaPorId(criarPromocao.id_programa);
    if (!programa) {
      throw new NotFoundException(`Programa com ID ${criarPromocao.id_programa} não encontrado`);
    }
    const promocao = this.promocaoRepository.create({ ...criarPromocao, programa: programa });
    return this.promocaoRepository.save(promocao);
  }

  async update(id: number, data: Partial<Promocao>): Promise<Promocao> {
    await this.promocaoRepository.update(id, data);
    return this.obterPorId(id);
  }
  async obterProgramaPorId(programaId: number): Promise<Programa> {
    const programa = await this.programaRepository.findOne({ where: { id: programaId } });
    return programa;
  }
}
