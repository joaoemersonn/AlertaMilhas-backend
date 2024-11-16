import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731729557969 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO public.balcao (nome, url_site, url_login, url_cotacao) VALUES
      ('HotMilhas', 'https://cliente.hotmilhas.com.br/app/dashboard', 'https://api.hotmilhas.com.br/api/login', 'https://api.hotmilhas.com.br/api/programs/check/points?program={programa}&points={pontos}')
      ON CONFLICT (nome) DO NOTHING;

      INSERT INTO public.programa (nome) VALUES
      ('LATAM'), ('SMILES'), ('AZUL')
      ON CONFLICT (nome) DO NOTHING;
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM public.balcao WHERE nome = 'HotMilhas';
      DELETE FROM public.programa WHERE nome IN ('LATAM', 'SMILES', 'AZUL');
`);
  }
}
