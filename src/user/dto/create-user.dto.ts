import { Type } from "class-transformer";
import { IsEmail, IsEmpty, IsNotEmpty, MinLength, Validate } from "class-validator";
import { CreateStudentDto } from "src/students/dto/create-student.dto";


export class CreateUserDto {
  first_name?: string;
  last_name?: string;
  password: string;
  email : string;
  role: string; // 'user' or 'admin'
  
  @Type(() => CreateStudentDto)
  student : CreateStudentDto;
}
