import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import {typeOrmConfig} from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { ClassModule } from './class/class.module';
import { TeacherModule } from './teacher/teacher.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { StudentModule } from './student/student.module';




@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    ClassModule,
    TeacherModule,
    EnrollmentModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
