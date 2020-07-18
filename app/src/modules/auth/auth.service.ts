import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { LoggedInDto, SignInDto, SignUpDto } from "./dto";
import { LocalAccountEntity } from "./entities";

import { UserEntity } from "../user/entities";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto";

import { JWTConfigService } from "../../config/jwt/jwt.service";
import { AppConfigService } from "../../config/app/app.service";

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(LocalAccountEntity)
    private readonly repository: Repository<LocalAccountEntity>,
    private readonly userService: UserService,
    private readonly jwtConfigService: JWTConfigService,
    private readonly appConfigService: AppConfigService,
    private readonly jwtService: JwtService
  ) {}

  // TODO: incomplete implementation
  async validateUser ({ password, email }: SignInDto): Promise<UserEntity> {
    const account = await this.repository.createQueryBuilder("account").
      innerJoinAndSelect("account.user", "user").
      where("user.email = :email", { email }).
      getOne();

    if (account && await bcrypt.compare(password, account.password) === true) {
      return account.user;
    }
    return null;
  }

  async signIn (loggedUser: UserEntity): Promise<LoggedInDto> {
    const expiresIn = this.jwtConfigService.lifetime;

    return LoggedInDto.from({
      token_type: "Bearer",
      access_token: await this.jwtService.signAsync({
        sub: loggedUser.id
      }, { algorithm: "ES256", keyid: this.jwtConfigService.signingKeyId }),
      expires_in: Math.floor(Date.now() / 1000) + expiresIn
    });
  }

  async signUp (signUpDto: SignUpDto): Promise<void> {
    const createUserDto = CreateUserDto.from(signUpDto.user);
    const createdUser = await this.userService.create(createUserDto);

    await this.repository.save({
      user: createdUser,
      password: await bcrypt.hash(
        signUpDto.password,
        this.appConfigService.BcryptRounds
      )
    });
  }
}
