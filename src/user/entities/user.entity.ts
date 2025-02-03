import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Student } from 'src/students/entities/student.entity';
// import { Student } from 'src/students/entities/student.entity';

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
  password: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column({ default: 'user' })
  role: string;

  // @OneToOne(()=> Student, student=> student.user)
  // student?: Student

  // @OneToOne(()=> Student, student => student.user)
  // student: Student
}


