import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class APIConfigService {
  constructor (private readonly configService: ConfigService) {}

  get prefix (): string {
    return this.configService.get<string>("API_PREFIX");
  }

  get version (): number {
    return this.configService.get<number>("API_VERSION");
  }
}
