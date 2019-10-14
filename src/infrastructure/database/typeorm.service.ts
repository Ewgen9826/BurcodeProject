import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "../config/config.service";
import { Injectable } from "@nestjs/common";
import { Product } from "../../domain/entities/product.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.environment.databaseType,
      host: this.configService.environment.databaseHost,
      port: this.configService.environment.databasePort,
      username: this.configService.environment.databaseUsername,
      password: this.configService.environment.databasePassword,
      database: this.configService.environment.databaseName,
      entities: [Product],
      synchronize:
        this.configService.environment.databaseSynchronize === "true",
    };
  }
}
