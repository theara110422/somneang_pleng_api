import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Role } from 'src/enums/role';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TeacherService {

    private teacherRepo : Repository<Teacher>
    constructor(
      @InjectDataSource() private datasource : DataSource,
      private userService : UserService
    ){
      this.teacherRepo = this.datasource.getRepository(Teacher)
    }
  async create(createTeacherDto: CreateTeacherDto) {
    // return 'This action adds a new teacher';
    const userDTO = new CreateUserDto()
    userDTO.email = createTeacherDto.email
    userDTO.password = "1234";
    userDTO.phone_number = createTeacherDto.phone_number
    userDTO.role = Role.TEACHER
    const userResult = await this.userService.create(userDTO);
    // console.log("user create success");

    const teacher = new Teacher()
    teacher.name = createTeacherDto.name
    if(userDTO.email){
      teacher.email = userDTO.email
    }
    teacher.user_id = userResult.id
    const result = await this.teacherRepo.save(teacher)
    return result;



    // return this.teacherRepository.save(createTeacherDto);

  }

  findAll() {
    // return `This action returns all teacher`;
    return this.teacherRepo.find();
  }

  async findOne(id: string) {
    // return `This action returns a #${id} teacher`;
    return await this.teacherRepo.findOne({where : {id : id}})
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
