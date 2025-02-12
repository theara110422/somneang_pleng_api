import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflactor: Reflector){}

  matchRoles(roles: string[],userRole: string) {
    return roles.some((role)=> role === userRole);
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roles = this.reflactor.get<string[]>('roles',context.getHandler())
    
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const role = request.user.role;
    console.log(`ROLE GUARD SHOULD WORK????? ${JSON.stringify(role)}`)
    // const user = await this.authService.getUser(user_id);
    return this.matchRoles(roles,role)
  }



}
