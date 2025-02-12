import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Role } from 'src/enums/role';
import { dot } from 'node:test/reporters';
import * as bcrypt from 'bcrypt';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { Student } from 'src/student/entities/student.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default: null})
  first_name: string;

  @Column({default: null})
  last_name: string;

  @Column({ default: true, name: 'is_active' })
  is_active: boolean;

  @Column()
  password : string;

  @Column()
  email?: string;

  @Column()
  phone_number?: string;

  @Column({default: null})
  gender: string;

  @Column({default: null})
  age: number;


  @Column({ default: Role.USER })
  role: Role;
  
  @OneToOne(()=> Teacher, teacher => teacher.user)
  teacher : Teacher




  static async userFormDTO(dto: UpdateUserDto): Promise<User> {
    const user = new User();

    if(dto.email != null){
      user.email = dto.email;
    }
    if(dto.phone_number != null){
      user.phone_number = dto.phone_number;
    }
    if(dto.password != null){
      user.password = await this.hashPassword(dto.password);
    }
    if(dto.first_name != null){
      user.first_name = dto.first_name;
    }
    if(dto.gender != null){
      user.gender = dto.gender;
    }
    if(dto.age != null){
      user.age = dto.age
    }
    if(dto.last_name != null){
      user.last_name = dto.last_name;
    }
    if(dto.role != null){
      user.role = dto.role;
    }
    return user
  }

  static removePassword(userObj: User) {
    return Object.fromEntries(
      Object.entries(userObj).filter(([key, val]) => key !== 'password')
    );
}
  static hashPassword(password: string) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);

  }
  static async comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}


