import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Student } from 'src/students/entities/student.entity';
@Injectable()
export class UserService {
  

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    // @InjectRepository(Student)
    // private readonly studentRepository: Repository<Student>
  ){}

  async findByField(field: string, value: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { [field]: value } });
  }

  findAll() {
    // return `This action returns all user`;
    console.log("helo world")
    return this.userRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log("create user");

    const existingUser = await this.findEmailAndPassword(createUserDto.email,createUserDto.password);
    if (existingUser) {
      throw new ConflictException('Email or password is already existed');
    }

    // const newStudent = await this.studentRepository.create(createUserDto.student);
    // await this.studentRepository.save(newStudent);

    const { email, password } = createUserDto;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      // student: newStudent
      
    });
    console.log(email, password);
    return this.userRepository.save(user);
  }

  async findEmailAndPassword(email: string, password: string) {
    return this.userRepository.findOne({
      where :[
        {
          email: email,
        },
        {
          password: password
        }
      ]
    })
  }
  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email: username } });
  }

  
}
