import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { MulterConfigService } from "./multer.config.service";

@Module({
  imports: [ConfigModule.register({ folder: "./env" })],
  providers: [MulterConfigService],
  exports: [MulterConfigService],
})
export class CustomMulterModule {}
