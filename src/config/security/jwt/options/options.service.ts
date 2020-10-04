import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { JwkStoreService } from '../../../../security/jwk-store';
import { JwtConfigService } from '../config.service';

@Injectable()
export class JwtOptionsService implements JwtOptionsFactory {
  constructor(
    private readonly jwkStoreService: JwkStoreService,
    private readonly jwtConfigService: JwtConfigService,
  ) {}

  async createJwtOptions(): Promise<JwtModuleOptions> {
    const JWTOptions = {
      audience: this.jwtConfigService.audience,
      issuer: this.jwtConfigService.issuer,
    };

    return {
      secretOrKeyProvider: this.jwkStoreService.secretOrKeyProvider,
      signOptions: {
        expiresIn: this.jwtConfigService.lifetime.asSeconds(),
        ...JWTOptions,
      },
      verifyOptions: {
        algorithms: ['ES256', 'ES384', 'ES512'],
        issuer: JWTOptions.issuer,
      },
    };
  }
}
