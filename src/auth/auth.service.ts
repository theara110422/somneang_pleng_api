import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt-payload.interface';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    return this.userService.validateUser(username, password);
  }

  async login(user: any) {
    
    // payload
    const payload = {sub: user.id,username: user.email,role: user.role};
    console.log(`payload ${JSON.stringify(payload)}`)

    const accessToken = this.jwtService.sign(payload,{
      secret : jwtConstants.secret,
      expiresIn : jwtConstants.expire
    })

    return {
      access_token: accessToken
    }

  }

  
  validateRole(user: any ,currentRole: string) {
    console.log('validate role', user, currentRole);
    return user.role === currentRole;
  }

  async getUser(userId: string) {
    const user = this.userService.findOne(userId);
    return user
  }
}
