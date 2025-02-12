import { IsEmail, IsEmpty, IsNotEmpty, MinLength, Validate } from "class-validator";
import { Role } from "src/enums/role";

export class CreateUserDto {
  first_name?: string;
  last_name?: string;
  password?: string;
  email ?: string;
  gender ?: string;
  age ?: number;
  role ?: Role; // 'user' or 'admin'
  phone_number ?: string;

}
