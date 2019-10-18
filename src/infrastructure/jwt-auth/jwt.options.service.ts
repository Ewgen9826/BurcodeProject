import { Injectable } from "@nestjs/common";
import { JwtOptionsFactory, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigService } from "../config/config.service";

@Injectable()
export class JwtOptionsService implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}
  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      secret: this.configService.environment.jwtSecret,
      signOptions: {
        expiresIn: this.configService.environment.jwtExpiresIn,
      },
    };
  }
}
