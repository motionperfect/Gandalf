import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabaseConfigService {
  constructor (private readonly configService: ConfigService) {}

  get provider (): any {
    return this.configService.get<string>("DB_PROVIDER");
  }

  get host (): string {
    return this.configService.get<string>("DB_HOST");
  }

  get port (): number {
    return this.configService.get<number>("DB_PORT");
  }

  get user (): string {
    return this.configService.get<string>("DB_USER");
  }

  get password (): string {
    return this.configService.get<string>("DB_PASSWORD");
  }

  get database (): string {
    return this.configService.get<string>("DB_SCHEMA");
  }

  get sync (): boolean {
    return this.configService.get<boolean>("TYPEORM_SYNCHRONIZE");
  }
}
