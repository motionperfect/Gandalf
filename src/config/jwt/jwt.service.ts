import { ConfigService } from '@nestjs/config';
import {
  JwtModuleOptions,
  JwtOptionsFactory,
  JwtSecretRequestType,
} from '@nestjs/jwt';

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { JWK } from 'node-jose';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import moment from 'moment';

@Injectable()
export class JWTConfigService implements JwtOptionsFactory, OnModuleInit {

  private readonly keyStore = JWK.createKeyStore();
  private readonly logger = new Logger(JWTConfigService.name);
  private readonly keyMap = [];

  constructor (
    private readonly configService: ConfigService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  async onModuleInit (): Promise<void> {
    const minutes = this.lifetime.asMinutes();
    const job = new CronJob(`${minutes} * * JAN *`, () => {
      const key = this.keyMap.shift();

      this.keyStore.remove(key);
    });

    this.schedulerRegistry.addCronJob('removeSigningKey', job);
    job.start();

    await this.createSigningKey();
  }

  async createJwtOptions (): Promise<JwtModuleOptions> {
    const JWTOptions = {
      audience: this.configService.get<string>('TOKEN_AUDIENCE'),
      issuer: this.configService.get<string>('TOKEN_ISSUER'),
    };

    return {
      secretOrKeyProvider: this.secretOrKeyProvider.bind(this),
      signOptions: {
        expiresIn: this.lifetime.asSeconds(),
        ...JWTOptions,
      },
      verifyOptions: {
        algorithms: ['ES256', 'ES384', 'ES512'],
        issuer: JWTOptions.issuer,
      },
    };
  }

  @Cron('0 0 * JAN *')
  private async createSigningKey () {
    const signingKey = await this.keyStore.generate('EC', 'P-256', {
      use: 'sig',
      alg: 'ES256',
    });

    this.logger.log('Successfully generated new key pair');
    this.keyMap.push(signingKey);
  }

  // TODO: complete implementation with algorithm selection
  private secretOrKeyProvider (requestType: JwtSecretRequestType) {
    switch (requestType) {
      case JwtSecretRequestType.SIGN:
        const [key] = this.keyMap.slice(-1);

        return key.toPEM(true);
      default:
        this.logger.error(`Unknown JWT request type (${requestType})`);
    }
  }

  get publicKeys (): object {
    return this.keyStore.toJSON();
  }

  get lifetime (): moment.Duration {
    const lifetime = this.configService.get<number>('TOKEN_EXPIRATION');

    return moment.duration(lifetime, 'minutes');
  }

  get kid (): string {
    const [key] = this.keyMap.slice(-1);

    return key.kid;
  }
}
