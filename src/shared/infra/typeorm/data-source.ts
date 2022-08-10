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
  return AppDataSource.setOptions({ host, port: 5432 }).initialize();
}

export default AppDataSource;
