import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

import { APIConfigService } from "../api/api.service";

@Injectable()
export class AppConfigService {
  constructor (
    private configService: ConfigService,
    private apiConfigService: APIConfigService
  ) {}

  get port (): number {
    return this.configService.get<number>("APP_PORT");
  }

  get globalPrefix (): string {
    return `${this.apiConfigService.prefix}/v${this.apiConfigService.version}`;
  }

  get BcryptRounds (): number {
    return this.configService.get<number>("BCRYPT_ROUNDS");
  }
}
