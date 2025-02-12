import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Enrollment,Student,Teacher,Class])
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentModule {}
