import { GoneException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { UserHotmilhaInterface } from './interfaces/user-hotmilha.interface';
import { HotProgramEnum as HotmilhasProgramaEnum } from './enums/hot-program.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Cotacao } from './entities/cotacao.entity';
import { Repository } from 'typeorm';
import { Programa } from './entities/programa.entity';
import { Balcao } from '../balcao/entities/balcao.entity';
import { Tempo } from './entities/tempo.entity';
import { Credenciais } from './entities/credenciais.entity';

@Injectable()
export class CotacaoService {
  constructor(
    @InjectRepository(Cotacao)
    private readonly cotacaoRepository: Repository<Cotacao>,
    @InjectRepository(Programa)
    private readonly programaRepository: Repository<Programa>,
    @InjectRepository(Balcao)
    private readonly balcaoRepository: Repository<Balcao>,
    @InjectRepository(Tempo)
    private readonly tempoRepository: Repository<Tempo>,
    @InjectRepository(Credenciais)
    private readonly credencialRepository: Repository<Credenciais>,
  ) {}

  private accessToken: string;
  private tokenExpiry: number;
  private pontos = 100;

  private headers = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=UTF-8',
    Dnt: '1',
    Referer: 'https://cliente.hotmilhas.com.br/',
    'Sec-Ch-Ua': '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  };

  private logger = new Logger(CotacaoService.name);

  async obterCotacoesHotMilhas(): Promise<any> {
    const id_balcao = await this.balcaoRepository.findOne({ where: { nome: 'HotMilhas' } });
    const data = new Date();
    const id_tempo = await this.obterIdTempo(data);
    await this.getAccessToken();
    const cotacoes = await Promise.all(
      Object.keys(HotmilhasProgramaEnum).map(async (programa) => {
        const id_programa = await this.programaRepository.findOne({ where: { nome: programa } });
        const cotacao = await this.obterCotacaoHotMilhas(HotmilhasProgramaEnum[programa]);

        if (cotacao) {
          return Object.keys(cotacao.receipts).map((key) => {
            cotacao.receipts[key] = cotacao.receipts[key] / this.pontos;
            this.logger.log(`Cotação para programa ${programa} ${key} dias é: R$ ${cotacao.receipts[key]}`);
            const cot = this.cotacaoRepository.create({
              prazo: parseInt(key, 10),
              valor: cotacao.receipts[key],
              programa: id_programa,
              data: data,
              balcao: id_balcao,
              tempo: id_tempo,
            });
            this.cotacaoRepository.save(cot);
            return { prazo: key, valor: cotacao.receipts[key], programa: programa };
          });
        }
      }),
    );

    return cotacoes.flat();
  }

  async obterCotacaoHotMilhas(program: HotmilhasProgramaEnum): Promise<any> {
    const accessToken = await this.getAccessToken();
    const url = `https://api.hotmilhas.com.br/api/programs/check/points?program=${program}&points=${this.pontos}`;
    this.logger.log(`Consultando cotação do programa ${url}`);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      ...this.headers,
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      this.logger.error(`Falha ao autenticar usuário: ${error.message}`);
      return null;
    }
  }
  async getAccessToken(): Promise<string> {
    if (!this.accessToken || this.isTokenExpired()) {
      await this.refreshToken();
    }
    return this.accessToken;
  }

  private isTokenExpired(): boolean {
    return !this.tokenExpiry || Date.now() >= this.tokenExpiry;
  }

  private async refreshToken(): Promise<void> {
    let data;
    this.logger.log('Atualizando token de acesso');
    const url = `https://api.hotmilhas.com.br/api/login`;
    this.logger.log(`Autenticando usuário ${process.env.EMAIL}`);
    try {
      const response = await axios.post(
        url,
        { email: process.env.EMAIL, password: process.env.PASSWORD },
        {
          headers: { ...this.headers },
        },
      );
      data = response.data as UserHotmilhaInterface;
    } catch (error) {
      this.logger.error(`Falha ao autenticar usuário: ${error.message}`);
      throw new Error('Falha ao autenticar usuário');
    }

    if (!data.auth_token) {
      throw new Error('Token de acesso não encontrado');
    }
    this.accessToken = data.auth_token;
    this.tokenExpiry = this.getExpiresDate(data.auth_token);
    this.logger.log(`Data de expiração do token: ${new Date(this.tokenExpiry).toLocaleString()}`);
  }

  private getExpiresDate(jwtToken: string): number {
    const jwt = jwtToken.split('.')[1];
    const jwtObject = JSON.parse(Buffer.from(jwt, 'base64').toString());
    return jwtObject.exp * 1000;
  }

  async obterIdTempo(data: Date) {
    let tempo: Tempo;
    tempo = await this.tempoRepository.findOne({
      where: { minutos: data.getMinutes(), hora: data.getHours(), dia: data.getDate(), mes: data.getMonth() + 1, ano: data.getFullYear() },
    });

    if (tempo) {
      this.logger.error('Já possui um cotação cadastrada para este tempo');
      throw new GoneException('Já possui um cotação cadastrada para este tempo');
    }
    tempo = this.tempoRepository.create({
      minutos: data.getMinutes(),
      hora: data.getHours(),
      dia: data.getDate(),
      mes: data.getMonth() + 1,
      ano: data.getFullYear(),
    });

    await this.tempoRepository.save(tempo);
    return tempo;
  }
}
