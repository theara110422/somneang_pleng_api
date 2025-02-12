import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { Student } from './entities/student.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Role } from 'src/enums/role';

@Injectable()
export class StudentService {
  private studentRepo : Repository<Student>
  constructor(
    @InjectDataSource() private datasource : DataSource,
    private userService : UserService
  ){
    this.studentRepo = this.datasource.getRepository(Student);
  }
  async create(createStudentDto: CreateStudentDto) {
    // return 'This action adds a new student';
    const userDto = new CreateUserDto();
    userDto.first_name = createStudentDto.first_name;
    userDto.last_name = createStudentDto.last_name;
    userDto.age = createStudentDto.age;
    userDto.gender = createStudentDto.gender;
    userDto.email = "student@gmail.com";
    userDto.password = "1111";
    userDto.phone_number = createStudentDto.phone_number;
    userDto.role = Role.STUDENT;
    const userResult = await this.userService.create(userDto);
    // console.log(`gender ${createStudentDto.gender} , age ${createStudentDto.age} user ${JSON.stringify(userResult)}`);

    const student = new Student();
    student.user_id = userResult.id;
    const result = await this.studentRepo.save(student);
    // console.log(`new student ${JSON.stringify(result)}`);
    // console.log(`new student ${JSON.stringify(result)}`);
    return result;
  }

  findAll() {
    // return `This action returns all student`;
    return this.studentRepo.find({relations : ["user"]});
    
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  // async getStudentWithUSer () : Promise<Student[]>{
  //   return this.studentRepo.find({relations : ["user"]});
  // }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
