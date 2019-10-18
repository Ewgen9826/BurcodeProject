import { Module, DynamicModule } from "@nestjs/common";
import { PassportOptionsService } from "./passport.options.service";
import { JwtOptionsService } from "./jwt.options.service";
import { ConfigModule } from "../config/config.module";
import { JwtStrategy } from "./jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtAuthModuleAsyncOptions } from "./jwt.module.options";

@Module({})
export class JwtAuthModule {
  static registerAsync(options: JwtAuthModuleAsyncOptions): DynamicModule {
    return {
      module: JwtAuthModule,
      imports: [
        ConfigModule.register(),
        JwtModule.registerAsync({
          imports: [ConfigModule.register()],
          useClass: JwtOptionsService,
        }),
        PassportModule.registerAsync({
          useClass: PassportOptionsService,
        }),
      ],
      providers: [
        {
          provide: "UserSearch",
          useClass: options.useClass,
        },
        PassportOptionsService,
        JwtOptionsService,
        JwtStrategy,
      ],
      exports: [JwtStrategy, JwtModule, PassportModule],
    };
  }
}
