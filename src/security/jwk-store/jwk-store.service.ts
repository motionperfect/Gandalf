import { JwtSecretRequestType } from '@nestjs/jwt';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { JWK } from 'node-jose';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

import { JwtConfigService } from '../../config/security/jwt';

@Injectable()
export class JwkStoreService implements OnModuleInit {
  private readonly logger = new Logger(JwkStoreService.name);

  private readonly keyStore = JWK.createKeyStore();
  private readonly keyMap = [];

  constructor(
    private readonly jwtConfigService: JwtConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  public async onModuleInit(): Promise<void> {
    const minutes = this.jwtConfigService.lifetime.asMinutes();
    const job = new CronJob(`${minutes} 0 * JAN *`, () => {
      const key = this.keyMap.shift();

      this.keyStore.remove(key);
    });

    this.schedulerRegistry.addCronJob('removeSigningKey', job);
    job.start();

    await this.createSigningKey();
  }

  @Cron('0 0 * JAN *')
  private async createSigningKey() {
    const signingKey = await this.keyStore.generate('EC', 'P-256', {
      use: 'sig',
      alg: 'ES256',
    });

    this.logger.log('Successfully generated new key pair');
    this.keyMap.push(signingKey);
  }

  // TODO: complete implementation with algorithm selection
  public secretOrKeyProvider = (requestType: JwtSecretRequestType) => {
    switch (requestType) {
      case JwtSecretRequestType.SIGN:
        const [key] = this.keyMap.slice(-1);

        return key.toPEM(true);
      default:
        this.logger.error(`Unknown JWT request type (${requestType})`);
    }
  };

  public get publicKeys(): object {
    return this.keyStore.toJSON();
  }

  public get kid(): string {
    const [key] = this.keyMap.slice(-1);

    return key.kid;
  }
}
