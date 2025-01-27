import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/data-source';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    // TypeOrmModule.forRoot(dataSourceOptions),
    // StudentModule,
    // UserModule,
    // RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
