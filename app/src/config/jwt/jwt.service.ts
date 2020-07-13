import { ConfigService } from "@nestjs/config";
import {
  JwtModuleOptions,
  JwtOptionsFactory,
  JwtSecretRequestType
} from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { SignOptions, VerifyOptions } from "jsonwebtoken";
import { JWK } from "node-jose";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class JWTConfigService implements JwtOptionsFactory {

  private readonly keystore = JWK.createKeyStore();

  private currentKey: JWK.Key = null;

  constructor (
    private readonly configService: ConfigService
  ) {
    this.handleKeyRotation();
  }

  get publicKeys (): Object {
    return this.keystore.toJSON();
  }

  get lifetime (): number {
    return this.configService.get<number>("TOKEN_EXPIRATION");
  }

  @Cron("0 0 1 * *")
  async handleKeyRotation () {
    const removeFromKeyStore = (key) => this.keystore.remove(key);
    const ecdsa = await this.keystore.generate("EC", "P-256", {
      use: "sig",
      alg: "ES256"
    });

    if (this.currentKey !== null) {
      setTimeout(removeFromKeyStore.bind(this), this.lifetime, this.currentKey);
    }
    this.currentKey = ecdsa;
  }

  createJwtOptions (): JwtModuleOptions {
    const JWTOptions = {
      audience: this.configService.get<string>("TOKEN_AUDIENCE"),
      issuer: this.configService.get<string>("TOKEN_ISSUER")
    };

    return {
      secretOrKeyProvider: this.secretOrKeyProvider.bind(this),
      signOptions: {
        expiresIn: this.lifetime,
        ...JWTOptions
      },
      verifyOptions: {
        algorithms: ["ES256", "ES384", "ES512"],
        issuer: JWTOptions.issuer
      }
    };
  }

  // TODO: complete implementation with algorithm selection
  private secretOrKeyProvider (
    requestType: JwtSecretRequestType,
    tokenOrPayload: string | Object | Buffer,
    verifyOrSignOrOptions?: VerifyOptions | SignOptions
  ) {
    switch (requestType) {
      case JwtSecretRequestType.SIGN:
        const signOptions = verifyOrSignOrOptions as SignOptions;

        signOptions.keyid = this.currentKey.kid; // FIXME
        return this.currentKey.toPEM(true);
      case JwtSecretRequestType.VERIFY:
        return this.currentKey.toPEM(false);
    }
  }
}
