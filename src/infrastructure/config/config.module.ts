import { Module, DynamicModule } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { LoggerModule } from "../logger/logger.module";
import { Options } from "./options";

@Module({})
export class ConfigModule {
  static register(options?: Options): DynamicModule {
    options = options ? options : { folder: "./env" };
    return {
      module: ConfigModule,
      providers: [
        {
          provide: Options,
          useValue: options,
        },
        ConfigService,
      ],
      imports: [LoggerModule],
      exports: [ConfigService],
    };
  }
}
