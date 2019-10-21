import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { LoggerModule } from "../logger/logger.module";

@Module({
  imports: [ConfigModule.register(), LoggerModule],
  controllers: [],
  providers: [],
  exports: [ConfigModule, LoggerModule],
})
export class CommonModule {}
