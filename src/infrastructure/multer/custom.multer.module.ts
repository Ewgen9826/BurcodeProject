import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { MulterConfigService } from "./multer.config.service";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    ConfigModule.register(),
    MulterModule.registerAsync({
      imports: [ConfigModule.register()],
      useClass: MulterConfigService,
    }),
  ],
  providers: [MulterConfigService],
  exports: [MulterModule],
})
export class CustomMulterModule {}
