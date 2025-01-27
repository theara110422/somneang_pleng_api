import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config()
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.IS_DOCKER == 'true' ? 'mysql_db' :  process.env.DB_HOST,
  port: process.env.IS_DOCKER  == 'true' ? undefined : parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.PRODUCTION == 'true' ? false : true,
  entities: ['**/*.entity{ .ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName:'typeorm_migrations',
  migrationsRun: true,
//   legacySpatialSupport: false,
};
