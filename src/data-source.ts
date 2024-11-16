import { config } from 'dotenv';
config();

import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  dropSchema: process.env.DB_DROP_SCHEMA === 'true',
  keepConnectionAlive: true,
  autoLoadEntities: true,
  logging: false,
  entities: [__dirname + '../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: '/src/migrations/',
    subscribersDir: 'subscriber',
  },
  extra: {
    max: parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) || 100,
    ssl:
      process.env.DATABASE_SSL_ENABLED === 'true'
        ? {
            rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
            ca: process.env.DATABASE_CA,
            key: process.env.DATABASE_KEY,
            cert: process.env.DATABASE_CERT,
          }
        : undefined,
  },
} as DataSourceOptions);

AppDataSource.initialize();

export default AppDataSource;
