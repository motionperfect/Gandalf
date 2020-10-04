import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection, EntityManager } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import moment from 'moment';

import { JwtConfigService } from '../../config/security/jwt';
import { UserService } from '../../user';
import { AppConfigService } from '../../config/app';
import { JwkStoreService } from '../../security/jwk-store';

import { LocalAccountRepository } from './repository';
import { UserEntity } from '../../user/repository';

import { LoggedInDto, SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly localAccountRepository: LocalAccountRepository,

    private readonly jwtConfigService: JwtConfigService,
    private readonly appConfigService: AppConfigService,

    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly jwkStoreService: JwkStoreService,
  ) {}

  public async validateUser({ password, email }: SignInDto): Promise<UserEntity> {
    const account = await this.localAccountRepository
      .createQueryBuilder('account')
      .innerJoinAndSelect('account.user', 'user')
      .where('user.email = :email', { email })
      .leftJoinAndSelect('user.roles', 'role')
      .getOne();

    if (
      account &&
      (await bcrypt.compare(password, account.password)) === true
    ) {
      return account.user;
    }
    return null;
  }

  public async signIn({ uuid, roles }: UserEntity): Promise<LoggedInDto> {
    const expiresIn = this.jwtConfigService.lifetime.asMinutes();

    return LoggedInDto.from({
      token_type: 'Bearer',
      access_token: await this.jwtService.signAsync(
        {
          sub: uuid,
          roles: roles.map(role => role.name),
        },
        { algorithm: 'ES256', keyid: this.jwkStoreService.kid },
      ),
      expires_in: moment()
        .add(expiresIn, 'minutes')
        .unix(),
    });
  }

  public async signUp(signUpDto: SignUpDto): Promise<void> {
    const runInTransaction = async (manager: EntityManager) => {
      const newUser = await this.userService.create(signUpDto.user, manager);
      const accountRepository = manager.getCustomRepository(
        LocalAccountRepository,
      );

      await accountRepository.insert({
        user: newUser,
        password: await bcrypt.hash(
          signUpDto.password,
          this.appConfigService.BcryptRounds,
        ),
      });
    };

    await this.connection.transaction(runInTransaction);
  }
}
