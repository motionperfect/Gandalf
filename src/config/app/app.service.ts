import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('APP_PORT');
  }

  get BcryptRounds(): number {
    return this.configService.get<number>('BCRYPT_ROUNDS');
  }
}
