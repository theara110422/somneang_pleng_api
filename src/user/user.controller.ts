import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/role/role.guard';
import { Role } from 'src/enums/role';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Post('register')

  async create(@Body() createUserDto: CreateUserDto) : Promise<User> {
    const existingUser = await this.userService.findByField('email', createUserDto.email);
    const existingPassword = await this.userService.findByField('password', createUserDto.password);

    if (existingUser && existingPassword) {
      throw new BadRequestException('Email and password already exist.');
    }
    
    return await this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  findAll() {
    console.log('this is the find all method');
    return this.userService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(){
    return { message: 'You are accessing a protected route' };
  }

  @Get('admin')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  getAdmin(){
    return { message: 'this is an admin-only rote' };
  }
}
