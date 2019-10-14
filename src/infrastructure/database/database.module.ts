import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { TypeOrmConfigService } from "./typeorm.service";
@Module({
  imports: [ConfigModule.register({ folder: "./env" })],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService],
})
export class DatabaseModule {}
