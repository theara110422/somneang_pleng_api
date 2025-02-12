import { Controller, Post, Body, UseGuards, Request, Param, UnauthorizedException, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('register')
  // async register(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.register(createUserDto);
  // }
  @UseGuards(LocalAuthGuard)
  @Post('login/:role')
  async login(@Request() req, @Param('role') role: string) {
    try{
      if(role != null){
        const canLogin = this.authService.validateRole(req.user, role);
        console.log(`can login ${canLogin} with role ${role} and ${JSON.stringify(req.user)}`);
        if(canLogin == false){
          throw new UnauthorizedException('You are not allowed to login');
        }
      }
      const data = await this.authService.login(req.user)
      console.log(data,'user')
      return data;
    }catch(error){
      console.log(error);
      throw error;
    }
  }
  // @Post('login')
  // async login(@Body() loginDto: CreateUserDto) {
  //   return this.authService.login(loginDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
