import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './role/role.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { WsJwtStrategy } from './ws-jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    WsJwtStrategy,
    RolesGuard
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // }
    // RolesGuard,
  ],
  

  exports: [AuthService],
})
export class AuthModule {}
