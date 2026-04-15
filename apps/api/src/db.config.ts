import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DEFAULT_DB_PORT } from './constants/ports';

export const DBConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || DEFAULT_DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
};
