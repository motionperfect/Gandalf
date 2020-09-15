import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

const secondsToMilliseconds = seconds => seconds * 1000;
const toTitleCase = str =>
  str
    .split('')
    .map((char, idx) => (!idx ? char.toUpperCase() : char))
    .join('');

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      type: this.configService.get<any>('DB_PROVIDER'),
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.database,
      entities: ['dist/**/**.entity{.ts,.js}'],
      retryDelay: secondsToMilliseconds(10),
      synchronize: this.sync,
      logging: ['query'],
    };
  }

  get sync(): boolean {
    return this.configService.get<string>('TYPEORM_SYNCHRONIZE') === 'true';
  }

  get database(): string {
    const schema = this.configService.get<string>('DB_SCHEMA');

    return toTitleCase(schema);
  }
}
