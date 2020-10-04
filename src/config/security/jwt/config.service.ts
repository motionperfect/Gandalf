import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import moment from 'moment';

@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService) {}

  get lifetime(): moment.Duration {
    const lifetime = this.configService.get<number>('TOKEN_EXPIRATION');

    return moment.duration(lifetime, 'minutes');
  }

  get issuer() {
    return this.configService.get<string>('TOKEN_ISSUER');
  }

  get audience() {
    return this.configService.get<string>('TOKEN_AUDIENCE');
  }
}
