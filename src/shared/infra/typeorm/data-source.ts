import 'reflect-metadata';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  database: 'rentalx',
  username: 'docker',
  password: 'admin',
  synchronize: false,
  logging: false,
  entities: ['./src/modules/**/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  subscribers: [],
});

export function createConnection(host = 'database'): Promise<DataSource> {
  const defaultDatabase = AppDataSource.options.database as string;

  return AppDataSource.setOptions({
    host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
    port: process.env.NODE_ENV === 'test' ? 5435 : 5432,
    database:
      process.env.NODE_ENV === 'test' ? 'rentalx_test' : defaultDatabase,
  }).initialize();
}

export default AppDataSource;
