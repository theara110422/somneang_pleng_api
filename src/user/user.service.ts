import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
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
    // console.log("helo world")
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

  async create(createUserDto: CreateUserDto) {
    // console.log("create user");
    var user = await User.userFormDTO(createUserDto);
    return this.userRepository.save(user);
  }

  async findByEmailOrPhone(email: string, phone: string) {
    return this.userRepository.findOne({
      where :[
        {
          email: email,
        },
        {
          phone_number: phone
        }
      ]
    })
  }
  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async getUser (user: User){
    return User.removePassword(user);
  }

  async register(dto: CreateUserDto) : Promise<any> {
    if (!dto.email || !dto.phone_number) {
      throw new ConflictException('Email and phone number must be provided');
    }
    const existingUser = await this.findByEmailOrPhone(dto.email, dto.phone_number);
    if (existingUser) {
      throw new ConflictException('Email or phone is already existed');
    }

    const user = await User.userFormDTO(dto);
    const result = await this.userRepository.save(user);

    return this.getUser(result);
  }

  async validateUser(username: string,pass: string): Promise<any> {
    const user = await this.findByEmailOrPhone(username,username);
    if(user){
      const isValid = await User.comparePasswords(pass,user.password);
      if(isValid){
        const {password, ...result} = user;
        return user;
      }
    }
    return null;
  }

  
}
