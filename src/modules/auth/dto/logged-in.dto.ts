import {
  IsJWT,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Expose, plainToClass } from 'class-transformer';

export class LoggedInDto implements Readonly<LoggedInDto> {
  /**
   * Stored in-memory on client side
   */
  @IsJWT()
  @Expose()
  access_token: string;

  /**
   * AT expiration in seconds
   */
  @IsNumber()
  @IsPositive()
  @Expose()
  expires_in: number;

  @IsString()
  @Expose()
  token_type: string;

  /**
   * TODO: Implement rotating refresh token
   * https://auth0.com/docs/tokens/concepts/refresh-token-rotation
   */
  @IsString()
  @IsOptional()
  refresh_token?: string;

  /**
   * https://openid.net/specs/openid-connect-core-1_0.html#IDToken
   */
  @IsJWT()
  @IsOptional()
  id_token?: string;

  public static from(dto: Partial<LoggedInDto>) {
    return plainToClass<LoggedInDto, Partial<LoggedInDto>>(LoggedInDto, dto, {
      excludeExtraneousValues: true,
    });
  }
}
