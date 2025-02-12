import { Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Student)

    private readonly userRepository: Repository<Student>,
    @InjectRepository(Teacher)

    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Class)

    private readonly classRepository: Repository<Class>
  ){}
  async create(createEnrollmentDto: CreateEnrollmentDto) {
     const { studentId , teacherId, classId,dateRegister,empressBy,time,startDate,endDate,classDay} = createEnrollmentDto;

     
      const student = await this.userRepository.findOne({where : {id : studentId}});
      const teacher = await this.teacherRepository.findOne({where : {id : teacherId}});
      const class_ = await this.classRepository.findOne({where : {id : classId}});

      if(!student || !teacher || !class_){
        throw new Error('User or teacher or class not found');
      }

      const enrollment = this.enrollmentRepository.create({
        student,
        teacher,
        class: class_,
        dateRegister,
        empressBy,
        time,
        startDate,
        endDate,
        classDay
      });
      console.log(`enrollment data ${JSON.stringify(enrollment)}`);
      return this.enrollmentRepository.save(enrollment);
  }

  findAll() {
    // return `This action returns all enrollment`;
    return this.enrollmentRepository.find({relations : ["student", "student.user", "teacher", "class"]});
  }

  findOne(id: number) {
    return `This action returns a #${id} enrollment`;
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return `This action removes a #${id} enrollment`;
  }
}
