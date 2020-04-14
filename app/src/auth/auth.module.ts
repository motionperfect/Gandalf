import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { UsersModule } from '../users/users.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    UsersModule,
    PassportModule,

    // TODO: https://github.com/auth0/node-jsonwebtoken#usage
    JwtModule.register({
      secret: 'azertyuiop',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
