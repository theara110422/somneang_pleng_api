import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.IS_DOCKER == 'true' ? 'mysql_db' : process.env.DB_HOST,
  port: process.env.IS_DOCKER == 'true' ? undefined : parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.PRODUCTION == 'true' ? false : true,
  entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
  logging: false,
  migrations: [path.join(__dirname, '/../migrations/*{.ts,.js}')],
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
  legacySpatialSupport: false,
};
