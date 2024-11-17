import { Injectable, NotFoundException } from '@nestjs/common';
import { Balcao } from './entities/balcao.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { CriarBalcaoDto } from './dtos/criar-balcao.dto';

@Injectable()
export class BalcaoService {
  constructor(
    @InjectRepository(Balcao)
    private readonly balcaoRepository: Repository<Balcao>,
  ) {}

  async listarTudo(): Promise<Balcao[]> {
    const listaBalcao = this.balcaoRepository.find();
    if (!listaBalcao) {
      throw new NotFoundException('Nenhum Balcão Encontrado');
    }
    return listaBalcao;
  }

  async getBalcao(id: number): Promise<Balcao> {
    const listaBalcao = this.balcaoRepository.findOneBy({ id: id });
    if (!listaBalcao) {
      throw new NotFoundException('Balcão Encontrado');
    }
    return listaBalcao;
  }
  getBalcaoName(nome: string): Balcao | Promise<Balcao> {
    const listaBalcao = this.balcaoRepository.findOneBy({ nome: nome });
    if (!listaBalcao) {
      throw new NotFoundException('Balcão Encontrado');
    }
    return listaBalcao;
  }

  async criarBalcao(createBalcaoDto: CriarBalcaoDto): Promise<Balcao> {
    // Cria a instância do balcão com os dados recebidos
    const balcao = this.balcaoRepository.create(createBalcaoDto);

    // Salva no banco de dados
    return await this.balcaoRepository.save(balcao);
  }
}
